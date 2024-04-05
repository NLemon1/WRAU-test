using System.Drawing;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using Umbraco.Cms.Core.Models;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Core.PublishedCache;
using Umbraco.Cms.Core.Scoping;
using Umbraco.Cms.Core.Security;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Core.Web;
using Umbraco.Cms.Web.Website.Models;
using Umbraco.Commerce.Core.Api;
using Umbraco.Commerce.Core.Models;
using WRA.Umbraco.Dtos;
using WRA.Umbraco.Models;

namespace WRA.Umbraco.Services;

public class WRAMemberManagementService
{
    private readonly IMemberService _memberService;
    private readonly IMemberManager _memberManager;
    private readonly ICoreScopeProvider _coreScopeProvider;
    private readonly IUmbracoCommerceApi _commerceApi;
    private readonly IUmbracoContextAccessor _umbracoContextAccessor;
    private readonly IContentService _contentService;
    private readonly IUmbracoContextFactory _umbracoContextFactory;
    private readonly ILogger<WRAMemberManagementService> _logger;


    public WRAMemberManagementService(
        IMemberService memberService,
        IMemberManager memberManager,
        ICoreScopeProvider coreScopeProvider,
        IUmbracoCommerceApi commerceApi,
        IUmbracoContextAccessor umbracoContextAccessor,
        IContentService contentService,
        IUmbracoContextFactory umbracoContextFactory,
        ILogger<WRAMemberManagementService> logger
    )
    {
        _memberService = memberService;
        _memberManager = memberManager;
        _coreScopeProvider = coreScopeProvider;
        _commerceApi = commerceApi;
        _umbracoContextAccessor = umbracoContextAccessor;
        _contentService = contentService;
        _umbracoContextFactory = umbracoContextFactory;
        _logger = logger;
    }


    /// <summary>
    /// CRUD Operations for Webhooks
    /// </summary>
    /// <param name="member"></param>
    public IMember? Create(MemberDto member)
    {
        try
        {
            // first check if the member already exists in the database
            var existingMember = _memberService.GetByEmail(member.Email);
            // if one exists, send to update method
            if (existingMember != null) { return Update(member); }
            // spin up an Imember rather than memberIdentity to avoid db locks.
            var memberName = $"{member.FirstName} {member?.LastName}";
            if (string.IsNullOrWhiteSpace(memberName))
            {
                memberName = member.Email;
            }
            var newMember = _memberService.CreateMember(
                member.Email,
                member.Email,
                memberName,
                "Member");

            // updates all the fields on the user
            newMember.UpdateWRAMemberProperties(member);
            if (!string.IsNullOrEmpty(member?.CompanyId) && member.CompanyId != Guid.Empty.ToString())
            {
                // set the complex properties such as company and subscriptions
                var matchingCompany = GetCompany(member.CompanyId);
                newMember.SetValue("company", matchingCompany.GetUdi());
            }
            // newMember.SetValue("subscriptions", member.Subscriptions.Select(s => s.Id).ToArray());
            // since a new member could potentially not exist in WRA's 
            newMember.IsApproved = false;

            // Must save here so an ID is assigned to the new member.
            // We need the memberId to create a link to member and memberGroups (roles).
            _memberService.Save(newMember);
            _logger.LogInformation($"Created member: {newMember.Email} - {newMember.Id}");

            // assign to relvevant memberGroup...
            AssignMemberToMemberGroup(newMember, member);
            return newMember;
        }
        catch (System.Exception ex)
        {
            _logger.LogError($"Error creating member ({member.Email}) -> {ex.Message}");
            throw;
        }
    }

    public IMember? Update(MemberDto member)
    {
        // // crate a scope
        // using ICoreScope scope = _coreScopeProvider.CreateCoreScope(autoComplete: true);
        // // supress any notification to prevent our listener from firing an "updated member" webhook back at the queue
        // using var _ = scope.Notifications.Suppress();

        // Query by email as they are unique in this site and in WRA's records.
        var existingMember = _memberService.GetByEmail(member.Email);
        if (existingMember == null) { return null; }


        existingMember.UpdateWRAMemberProperties(member);
        if (!string.IsNullOrEmpty(member?.CompanyId) && member.CompanyId != Guid.Empty.ToString())
        {
            var matchingCompany = GetCompany(member.CompanyId);
            if (matchingCompany != null)
            {
                existingMember.SetValue("company", matchingCompany.GetUdi());
            }
        }
        AssignMemberToMemberGroup(existingMember, member);

        _memberService.Save(existingMember);
        return existingMember;
    }

    public async Task Delete(MemberDto reqMember)
    {
        // crate a scope
        using ICoreScope scope = _coreScopeProvider.CreateCoreScope(autoComplete: true);
        // supress any notification to prevent our listener from firing an "updated member" webhook back at the queue

        using var _ = scope.Notifications.Suppress();

        var existingMember = _memberService.GetByEmail(reqMember.Email);
        if (existingMember == null) { return; }
        _memberService.Delete(existingMember);
    }

    /// <summary>
    /// Assigned a given member to a member group. 
    /// This does not SAVE the changes. Saving must be done outise of this method.
    /// </summary>
    /// <param name="member"></param>
    /// <param name="mdto"></param>

    private void AssignMemberToMemberGroup(IMember member, MemberDto mdto)
    {

        // TODO: make membergroups an array for one to many relationship.
        var memberGroup = mdto.MemberTypeCode switch
        {
            "MDR" => "DesignatedRealtor",
            "ST" => "WRA Member",
            "A" => "Affiliate",
            _ => "Visitor"
        };

        // get current member roles
        var memberRoles = _memberService.GetAllRoles(member.Id);
        // if current member role is not part of the incoming update/create, remove them from said role.
        var unmatchedRoles = memberRoles.Where(mr => memberGroup != mr);
        if (unmatchedRoles.Any())
        {
            var identityUser = new MemberIdentityUser(member.Id);
            _memberService.DissociateRoles([member.Id], unmatchedRoles.ToArray());
        }
        _memberService.AssignRole(member.Id, memberGroup);
    }

    /// <summary>
    /// 
    /// </summary>
    /// <param name="model"></param>
    /// <param name="memberGroup"></param>
    /// <returns></returns>
    /// <exception cref="InvalidOperationException"></exception>
    public async Task<(IdentityResult, MemberIdentityUser)> AddMember(RegisterModel model, string memberGroup = "Visitor")
    {
        using ICoreScope scope = _coreScopeProvider.CreateCoreScope(autoComplete: true);


        if (string.IsNullOrEmpty(model.Name) && string.IsNullOrEmpty(model.Email) == false)
        {
            model.Name = model.Email;
        }

        model.Username = model.UsernameIsEmail || model.Username == null ? model.Email : model.Username;

        var identityUser =
            MemberIdentityUser.CreateNew(model.Username, model.Email, model.MemberTypeAlias, true, model.Name);

        IdentityResult identityResult = await _memberManager.CreateAsync(
            identityUser, model.Password);

        if (identityResult.Succeeded)
        {

            IMember? member = _memberService.GetByKey(identityUser.Key);
            if (member == null)
            {

                throw new InvalidOperationException($"Could not find a member with key: {member?.Key}.");
            }

            SetMemberProperties(model.MemberProperties, member);

            //Before we save the member we make sure to assign the group, for this the "Group" must exist in the backoffice.
            _memberService.AssignRole(model.Email, memberGroup);

            _memberService.Save(member);
        }

        return (identityResult, identityUser);
    }





    public async Task UpdateMemberInfo(RegisterModel model, string memberGroup = "")
    {
        using ICoreScope scope = _coreScopeProvider.CreateCoreScope(autoComplete: true);
        // var existingMember = _memberService.GetByEmail(model.Email);

        // generate an "identity user" with the information we have from the request
        var identityUser =
            MemberIdentityUser.CreateNew(model.Username, model.Email, model.MemberTypeAlias, true, model.Name);

        // get get the member based on the identity user we have generated for this session
        IMember? existingMember = _memberService.GetByKey(identityUser.Key);

        // Now set the properties from the request on the matching user...
        SetMemberProperties(model.MemberProperties, existingMember);

        // now update the role on the user...
        var currentMemberRoles = await _memberManager.GetRolesAsync(identityUser);

        // if a membergroup has been passed to the api AND it does not match a group the current member is a part of...
        if (!string.IsNullOrEmpty(memberGroup) && !currentMemberRoles.Contains(memberGroup))
        {
            // remove them from any current roles so a single member does not belong to many member groups
            await _memberManager.RemoveFromRolesAsync(identityUser, currentMemberRoles);
            // assign to new group!
            _memberService.AssignRole(model.Email, memberGroup);
        }

        _memberService.Save(existingMember);


    }

    private void SetMemberProperties(List<MemberPropertyModel> properties, IMember member)
    {

        foreach (MemberPropertyModel property in properties.Where(p => p.Value != null).Where(property => member.Properties.Contains(property.Alias)))
        {
            member.Properties[property.Alias]?.SetValue(property.Value);
        }
    }

    public bool AttachOrderToMember(Order currentOrder)
    {
        if (_umbracoContextAccessor.TryGetUmbracoContext(out IUmbracoContext? context) == false)
        {
            return false;
        }
        var currentMember = _memberManager.GetCurrentMemberAsync();
        if (currentMember != null)
        {
            var memberKey = currentMember?.Result?.Key.ToString();
            _commerceApi.Uow.Execute(uow =>
            {
                var order = _commerceApi.GetOrCreateCurrentOrder(currentOrder.StoreId)
                    .AsWritable(uow)
                    .AssignToCustomer(memberKey);
                _commerceApi.SaveOrder(order);

                uow.Complete();
            });
            // member sucessfully attached to customer
            return true;
        }
        // no member attached
        return false;
    }

    #region Member Content Items

    public async Task<IContent> CreateBoard(MemberBoardDto mb)
    {
        var contentCache = GetContentCache();
        var siteRoot = contentCache?.GetAtRoot().FirstOrDefault();

        // first get the board page that all indivial boards will be under.
        var BoardsContainer = siteRoot?.Children
            .FirstOrDefault(x => x.ContentType.Alias == Boards.ModelTypeAlias);
        // var BoardsContainer = _searchService.Search(Boards.ModelTypeAlias)?
        //     .FirstOrDefault()?
        //     .Content as Boards;

        var existingBoard = siteRoot?.Children
            .Where(x => x.ContentType.Alias == Board.ModelTypeAlias)
            .FirstOrDefault(x => x.Value("externalId") == mb.Id);

        // var existingBoard = _searchService.Search(Board.ModelTypeAlias)?
        //     .FirstOrDefault(x => x.Content.Value("externalId") == mb.Id);
        bool boardExists = existingBoard != null;

        var board = boardExists ?
            existingBoard as IContent :
            _contentService.Create(mb.Name, BoardsContainer.Id, Board.ModelTypeAlias);

        board.SetValue("externalId", mb.Id);
        board.SetValue("chapterId", mb.Chapter);
        board.SetValue("rosterOptIn", mb.RosterOptIn);
        board.SetValue("rosterOptInDate", mb.RosterOptInDate);

        _contentService.SaveAndPublish(board);

        return board;
    }

    public IContent CreateActiveCompanySubscription(WraCompanySubscriptionDto request)
    {
        var contentCache = GetContentCache();
        var siteRoot = contentCache?.GetAtRoot().FirstOrDefault();

        var ActiveSubscriptionsContainer = siteRoot?.Children
            .FirstOrDefault(x => x.ContentType.Alias == ActiveSubscriptions.ModelTypeAlias);

        var existingSubscription = siteRoot?.Children
            .Where(x => x.ContentType.Alias == CompanySubscription.ModelTypeAlias)?
            .FirstOrDefault(x => x.Value("externalId") == request.Id);

        bool subscriptionExists = existingSubscription != null;

        var subscription = subscriptionExists ?
            existingSubscription as IContent :
            _contentService.Create(
                request.ProductName,
                ActiveSubscriptionsContainer.Id,
                CompanySubscription.ModelTypeAlias);

        var subscriptionCompany = GetCompany(request.CompanyId);
        if (subscriptionCompany == null) { throw new InvalidOperationException("Company does not exist in Umbraco."); }

        var subscriptionProduct = siteRoot.Children.Where(x => x.ContentType.Alias == ProductPage.ModelTypeAlias)?
            .FirstOrDefault(x => x.Value("productId").Equals(request.ProductId));
        if (subscriptionProduct == null) { throw new InvalidOperationException("Product does not exist in Umbraco."); }

        subscription.SetValue("externalId", request.Id);
        subscription.SetValue("company", subscriptionCompany.GetUdi());
        subscription.SetValue("subscriptionProduct", subscriptionProduct.GetUdi());
        subscription.SetValue("beginDate", request.BeginDate);
        subscription.SetValue("paidThrough", request.PaidThru);
        subscription.SetValue("status", request.Status);

        _contentService.SaveAndPublish(subscription);

        return subscription;
    }

    public async Task<IContent> CreateMemberSubscription(WraMemberSubscriptionDto request)
    {
        var contentCache = GetContentCache();
        var siteRoot = contentCache?.GetAtRoot().FirstOrDefault();

        var ActiveSubscriptionsContainer = siteRoot.Children
            .FirstOrDefault(x => x.ContentType.Alias == ActiveSubscriptions.ModelTypeAlias);

        var existingSubscription = siteRoot.Children
            .Where(x => x.ContentType.Alias == MemberSubscription.ModelTypeAlias)?
            .FirstOrDefault(x => x.Value("externalId") == request.Id);

        bool subscriptionExists = existingSubscription != null;

        var subscription = subscriptionExists ?
            existingSubscription as IContent :
            _contentService.Create(
                request.ProductName,
                ActiveSubscriptionsContainer.Id,
                MemberSubscription.ModelTypeAlias);

        var subscriptionMember = _memberService.GetAllMembers().FirstOrDefault(m => m.GetValue("externalId").Equals(request.MemberId));
        if (subscriptionMember == null) { throw new InvalidOperationException("Member does not exist in Umbraco."); }

        var subscriptionProduct = siteRoot.Children.Where(x => x.ContentType.Alias == ProductPage.ModelTypeAlias)?
            .FirstOrDefault(x => x.Value("productId").Equals(request.ProductId));
        // var subscriptionProduct = _searchService.Search(ProductPage.ModelTypeAlias)?
        //     .FirstOrDefault(x => x.Content.Value("productId").Equals(request.ProductId));
        if (subscriptionProduct == null) { throw new InvalidOperationException("Product does not exist in Umbraco."); }

        subscription.SetValue("externalId", request.Id);
        subscription.SetValue("member", subscriptionMember.GetUdi());
        subscription.SetValue("subscriptionProduct", subscriptionProduct.GetUdi());
        subscription.SetValue("beginDate", request.BeginDate);
        subscription.SetValue("paidThrough", request.PaidThru);
        subscription.SetValue("status", request.Status);

        _contentService.SaveAndPublish(subscription);

        return subscription;
    }

    #region  companies
    // private async Task<IContent> TieCompanyToSubscription(string companyId)
    // {
    //     var company = _searchService.Search(Company.ModelTypeAlias)?
    //         .FirstOrDefault(x => x.Content.Value("externalId") == companyId);

    //     company.Content.va("subscriptions", companyId);

    //     return company?.Content as IContent;
    // }
    public IPublishedContent? GetCompany(string companyId, IPublishedContent? contentCache = null)
    {
        IPublishedContent siteRoot;
        if (contentCache == null)
        {
            siteRoot = GetContentCache()?.GetAtRoot().FirstOrDefault();
        }
        else
        {
            siteRoot = contentCache;
        }
        var companies = siteRoot?.Children?
            .FirstOrDefault(x => x.ContentType.Alias == Companies.ModelTypeAlias)?
            .Children
            .Where(x => x.ContentType.Alias == Company.ModelTypeAlias);

        var company = companies?.FirstOrDefault(x => x.Value("externalId").Equals(companyId));
        // var company = _searchService.Search(Company.ModelTypeAlias)?
        //     .FirstOrDefault(x => x.Content.Value("externalId").Equals(companyId));

        return company;
    }

    public async Task<IContent> CreateCompany(CompanyDto companyDto)
    {
        try
        {
            var contentCache = GetContentCache();
            var siteRoot = contentCache?.GetAtRoot().FirstOrDefault();
            var companiesContainer = siteRoot?.Children
                .FirstOrDefault(x => x.ContentType.Alias == Companies.ModelTypeAlias);

            var existingCompany = GetCompany(companyDto.ExternalId, siteRoot);
            if (existingCompany != null)
            {
                // update the company
                var existingCompanyContent = _contentService.GetById(existingCompany.Id);
                SetCompanyProperties(existingCompanyContent!, companyDto);
                _contentService.SaveAndPublish(existingCompanyContent);
                return existingCompanyContent;
                // _contentService.SaveAndPublish(existingCompany);

            }
            _logger.LogInformation($"Creating company: {companyDto.name} - {companyDto.ExternalId}");
            if (string.IsNullOrEmpty(companyDto?.name) || string.IsNullOrEmpty(companyDto?.ExternalId))
            {
                _logger.LogError("Company name or externalId is null. Cannot create company.");
                return null;
            }

            var newCompany = _contentService.Create(companyDto.name, companiesContainer.Id, Company.ModelTypeAlias);

            SetCompanyProperties(newCompany, companyDto);
            _contentService.SaveAndPublish(newCompany);
            return newCompany;
        }
        catch (System.Exception ex)
        {
            _logger.LogError($"Error creating company ({companyDto.name} - {companyDto.ExternalId}) -> {ex.Message}");
            throw;
        }
    }

    public IContent SetCompanyProperties(IContent company, CompanyDto companyDto)
    {
        company.SetValue("externalId", companyDto.ExternalId);
        company.SetValue("organizationCode", companyDto.organizationCode);
        company.SetValue("memberTypeId", companyDto.memberTypeId.ToString());
        company.SetValue("companyCategory", companyDto.category);
        company.SetValue("status", companyDto.status);
        company.SetValue("address", companyDto.address);
        company.SetValue("city", companyDto.city);
        company.SetValue("state", companyDto.state);
        company.SetValue("zip", companyDto.zip);
        company.SetValue("email", companyDto.email);
        company.SetValue("websiteUrl", companyDto.websiteUrl);

        return company;

        // public async Task<IMember> GetMember(string email)
        // {
        //     return _searchService.get(email);
        // }
    }

    #endregion

    #endregion

    private IPublishedContentCache GetContentCache()
    {
        using var umbracoContextReference = _umbracoContextFactory.EnsureUmbracoContext();
        var contentQuery = umbracoContextReference.UmbracoContext.Content;
        return contentQuery;
    }
}