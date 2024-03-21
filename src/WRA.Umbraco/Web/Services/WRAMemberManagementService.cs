
using System.Drawing;
using System.Runtime.CompilerServices;
using GlobalPayments.Api.Entities;
using Microsoft.AspNetCore.Identity;
using Umbraco.Cms.Core.Models;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Core.Scoping;
using Umbraco.Cms.Core.Security;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Core.Web;
using Umbraco.Cms.Web.Website.Models;
using Umbraco.Commerce.Core.Api;
using Umbraco.Commerce.Core.Models;
using Umbraco.Commerce.Core.Services;
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
    private readonly IOrderService _orderService;
    private readonly SearchService _searchService;
    private readonly IContentService _contentService;

    public WRAMemberManagementService(
        IMemberService memberService,
        IMemberManager memberManager,
        ICoreScopeProvider coreScopeProvider,
        IUmbracoCommerceApi commerceApi,
        IUmbracoContextAccessor umbracoContextAccessor,
        IOrderService orderService,
        SearchService searchService,
        IContentService contentService
    )
    {
        _memberService = memberService;
        _memberManager = memberManager;
        _coreScopeProvider = coreScopeProvider;
        _commerceApi = commerceApi;
        _umbracoContextAccessor = umbracoContextAccessor;
        _orderService = orderService;
        _searchService = searchService;
        _contentService = contentService;
    }


    /// <summary>
    /// CRUD Operations for Webhooks
    /// </summary>
    /// <param name="member"></param>
    public async Task<IMember?> Create(MemberDto member)
    {
        // crate a scope
        using ICoreScope scope = _coreScopeProvider.CreateCoreScope(autoComplete: true);
        // supress any notification to prevent our listener from firing an "updated member" webhook back at the queue
        using var _ = scope.Notifications.Suppress();

        // first check if the member already exists in the database
        var existingMember = _memberService.GetByEmail(member.Email);
        // if one exists, send to update method
        if (existingMember != null) { return await Update(member); }
        // spin up an Imember rather than memberIdentity to avoid db locks.
        var newMember = _memberService.CreateMember(
            member.Email,
            member.Email,
            member.FullName,
            "Member");

        // updates all the fields on the user
        newMember.UpdateWRAMemberProperties(member);
        // set the complex properties such as company and subscriptions
        var matchingCompany = GetCompany(member.CompanyId);
        newMember.SetValue("company", matchingCompany.GetUdi());
        // newMember.SetValue("subscriptions", member.Subscriptions.Select(s => s.Id).ToArray());
        // since a new member could potentially not exist in WRA's 
        newMember.IsApproved = false;

        // Must save here so an ID is assigned to the new member.
        // We need the memberId to create a link to member and memberGroups (roles).
        _memberService.Save(newMember);

        // assign to relvevant memberGroup...
        await AssignMemberToMemberGroup(newMember, member);
        return newMember;
    }

    public async Task<IMember?> Update(MemberDto member)
    {
        // crate a scope
        using ICoreScope scope = _coreScopeProvider.CreateCoreScope(autoComplete: true);
        // supress any notification to prevent our listener from firing an "updated member" webhook back at the queue
        using var _ = scope.Notifications.Suppress();

        // Query by email as they are unique in this site and in WRA's records.
        var existingMember = _memberService.GetByEmail(member.Email);
        if (existingMember == null) { return null; }


        existingMember.UpdateWRAMemberProperties(member);
        var matchingCompany = GetCompany(member.CompanyId);

        existingMember.SetValue("company", matchingCompany.GetUdi());
        await AssignMemberToMemberGroup(existingMember, member);

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

    private async Task AssignMemberToMemberGroup(IMember member, MemberDto mdto)
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
            identityUser,
            model.Password);

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
        // first get the board page that all indivial boards will be under.
        var BoardsContainer = _searchService.Search(Boards.ModelTypeAlias)?
            .FirstOrDefault()?
            .Content as Boards;

        var existingBoard = _searchService.Search(Board.ModelTypeAlias)?
            .FirstOrDefault(x => x.Content.Value("externalId") == mb.Id);
        bool boardExists = existingBoard != null;

        var board = boardExists ?
            existingBoard.Content as IContent :
            _contentService.Create(mb.Name, BoardsContainer.Id, Board.ModelTypeAlias);

        board.SetValue("externalId", mb.Id);
        board.SetValue("chapterId", mb.Chapter);
        board.SetValue("rosterOptIn", mb.RosterOptIn);
        board.SetValue("rosterOptInDate", mb.RosterOptInDate);

        _contentService.SaveAndPublish(board);

        return board;
    }

    public async Task<IContent> CreateActiveCompanySubscription(WraCompanySubscriptionDto request)
    {
        var ActiveSubscriptionsParentNode = _searchService.Search(ActiveSubscriptions.ModelTypeAlias)?
            .FirstOrDefault();

        var existingSubscription = _searchService.Search(CompanySubscription.ModelTypeAlias)?
            .FirstOrDefault(x => x.Content.Value("externalId") == request.Id);

        bool subscriptionExists = existingSubscription != null;

        var subscription = subscriptionExists ?
            existingSubscription.Content as IContent :
            _contentService.Create(
                request.ProductName,
                ActiveSubscriptionsParentNode.Content.Id,
                CompanySubscription.ModelTypeAlias);

        var subscriptionCompany = GetCompany(request.CompanyId);
        if (subscriptionCompany == null) { throw new InvalidOperationException("Company does not exist in Umbraco."); }

        var subscriptionProduct = _searchService.Search(ProductPage.ModelTypeAlias)?
            .FirstOrDefault(x => x.Content.Value("productId").Equals(request.ProductId));
        if (subscriptionProduct == null) { throw new InvalidOperationException("Product does not exist in Umbraco."); }

        subscription.SetValue("externalId", request.Id);
        subscription.SetValue("company", subscriptionCompany.GetUdi());
        subscription.SetValue("subscriptionProduct", subscriptionProduct.Content.GetUdi());
        subscription.SetValue("beginDate", request.BeginDate);
        subscription.SetValue("paidThrough", request.PaidThru);
        subscription.SetValue("status", request.Status);

        _contentService.SaveAndPublish(subscription);

        return subscription;
    }

    public async Task<IContent> CreateMemberSubscription(WraMemberSubscriptionDto request)
    {
        var ActiveSubscriptionsParentNode = _searchService.Search(ActiveSubscriptions.ModelTypeAlias)?
            .FirstOrDefault();

        var existingSubscription = _searchService.Search(MemberSubscription.ModelTypeAlias)?
            .FirstOrDefault(x => x.Content.Value("externalId") == request.Id);

        bool subscriptionExists = existingSubscription != null;

        var subscription = subscriptionExists ?
            existingSubscription.Content as IContent :
            _contentService.Create(
                request.ProductName,
                ActiveSubscriptionsParentNode.Content.Id,
                MemberSubscription.ModelTypeAlias);

        var subscriptionMember = _memberService.GetAllMembers().FirstOrDefault(m => m.GetValue("externalId").Equals(request.MemberId));
        if (subscriptionMember == null) { throw new InvalidOperationException("Member does not exist in Umbraco."); }

        var subscriptionProduct = _searchService.Search(ProductPage.ModelTypeAlias)?
            .FirstOrDefault(x => x.Content.Value("productId").Equals(request.ProductId));
        if (subscriptionProduct == null) { throw new InvalidOperationException("Product does not exist in Umbraco."); }

        subscription.SetValue("externalId", request.Id);
        subscription.SetValue("member", subscriptionMember.GetUdi());
        subscription.SetValue("subscriptionProduct", subscriptionProduct.Content.GetUdi());
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
    public IPublishedContent? GetCompany(string companyId)
    {
        var company = _searchService.Search(Company.ModelTypeAlias)?
            .FirstOrDefault(x => x.Content.Value("externalId").Equals(companyId));

        var content = company?.Content;
        return content;
    }

    public async Task<IContent> CreateCompany(CompanyDto companyDto)
    {
        var CompaniesContainer = _searchService.Search(Companies.ModelTypeAlias)?
            .FirstOrDefault();

        var existingCompany = GetCompany(companyDto.ExternalId);
        var company = existingCompany != null ? existingCompany as IContent :
         _contentService.Create(companyDto.name, CompaniesContainer.Content.Id, Company.ModelTypeAlias);


        await SetCompanyProperties(company, companyDto);
        _contentService.SaveAndPublish(company);
        return company;
    }

    public Task SetCompanyProperties(IContent company, CompanyDto companyDto)
    {
        company.SetValue("externalId", companyDto.ExternalId);
        company.SetValue("organizationCode", companyDto.organizationCode);
        company.SetValue("memberTypeId", companyDto.memberTypeId);
        company.SetValue("companyCategory", companyDto.category);
        company.SetValue("status", companyDto.status);
        company.SetValue("address", companyDto.address);
        company.SetValue("city", companyDto.city);
        company.SetValue("state", companyDto.state);
        company.SetValue("zip", companyDto.zip);
        company.SetValue("email", companyDto.email);
        company.SetValue("websiteUrl", companyDto.websiteUrl);

        return Task.CompletedTask;

        // public async Task<IMember> GetMember(string email)
        // {
        //     return _searchService.get(email);
        // }
    }
    #endregion

    #endregion
}