using System.Formats.Asn1;
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
using WRA.Umbraco.Contracts;
using WRA.Umbraco.Helpers;
using WRA.Umbraco.Models;
using WRA.Umbraco.Shared.Extensions;

namespace WRA.Umbraco.Web.Services;

public class WraMemberManagementService(
    IMemberService memberService,
    IMemberManager memberManager,
    ICoreScopeProvider coreScopeProvider,
    IUmbracoCommerceApi commerceApi,
    IUmbracoContextAccessor umbracoContextAccessor,
    IUmbracoContextFactory umbracoContextFactory,
    MemberHelper memberHelper,
    ILogger<WraMemberManagementService> logger)
{
    /// <summary>
    /// CRUD Operations for Webhooks.
    /// </summary>
    /// <param name="memberEvent"></param>
    public async Task<IMember?> CreateOrUpdate(MemberEvent memberEvent)
    {
        try
        {
            // first check if the member already exists in the database
            var existingMember = memberService.GetByEmail(memberEvent.Email);

            // if one exists, send to update method
            if (existingMember != null) { return Update(memberEvent); }

            using var scope = coreScopeProvider.CreateCoreScope();

            using var umbracoContextReference = umbracoContextFactory.EnsureUmbracoContext();
            var contentQuery = umbracoContextReference.UmbracoContext.Content;

            // spin up an Imember rather than memberIdentity to avoid db locks.
            string memberName = $"{memberEvent.FirstName} {memberEvent.LastName}";
            if (string.IsNullOrWhiteSpace(memberName))
            {
                memberName = memberEvent.Email;
            }

            const string defaultMemberType = "Member";
            var newMember = memberService.CreateMember(
                memberEvent.Email,
                memberEvent.Email,
                memberName,
                defaultMemberType);

            // updates all the fields on the member
            memberHelper.update(newMember, memberEvent);
            memberHelper.SetCompanyOnMember(newMember, memberEvent, contentQuery);

            // since a new member could potentially not exist in WRA's
            newMember.IsApproved = false;

            // Must save here so an ID is assigned to the new member.
            // We need the memberId to create a link to member and memberGroups (roles).
            memberService.Save(newMember);
            logger.LogInformation("Created member: {Email} - {Id}", newMember.Email, newMember.Id);

            // assign to relevant memberGroup...
            // MemberHelper.AssignMemberToMemberGroup(newMember, memberEvent);

            // another save?
            scope.Complete();
            return newMember;
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error creating member ({Email}) -> {Message}", memberEvent.Email, ex.Message);
            throw;
        }
    }

    public IMember? Update(MemberEvent memberEvent, IMember? targetMember = null)
    {
        // Create a scope
        // suppress any notification to prevent our listener from firing an "updated member" webhook back at the queue
        using var scope = coreScopeProvider.CreateCoreScope();
        using var umbracoContextReference = umbracoContextFactory.EnsureUmbracoContext();
        var contentQuery = umbracoContextReference.UmbracoContext.Content;

        var existingMember = targetMember ?? memberService.GetByEmail(memberEvent.Email);

        // Query by email as they are unique in this site and in WRA's records.

        if (existingMember == null) return null;

        memberHelper.update(existingMember, memberEvent);
        if (contentQuery != null) memberHelper.SetCompanyOnMember(existingMember, memberEvent, contentQuery);
        // MemberHelper.AssignMemberToMemberGroup(existingMember, memberEvent);

        // memberService.Save(existingMember);
        logger.LogInformation("Updated member: {Member} - {Email}", existingMember.Id, existingMember.Email);
        scope.Complete();
        return existingMember;

    }

    public Task Delete(MemberEvent reqMember)
    {
        // Create a scope
        using var scope = coreScopeProvider.CreateCoreScope(autoComplete: true);

        // suppress any notification to prevent our listener from firing an "updated member" webhook back at the queue
        using var _ = scope.Notifications.Suppress();

        var existingMember = memberService.GetByEmail(reqMember.Email);
        if (existingMember == null)
        {
            return Task.CompletedTask;
        }

        memberService.Delete(existingMember);
        return Task.CompletedTask;
    }


    public async Task<(IdentityResult, MemberIdentityUser)> RegisterMember(RegisterModel model, string memberGroup = "Visitor")
    {
        using var scope = coreScopeProvider.CreateCoreScope(autoComplete: true);

        if (string.IsNullOrEmpty(model.Name) && string.IsNullOrEmpty(model.Email) == false)
        {
            model.Name = model.Email;
        }

        model.Username = model.UsernameIsEmail || model.Username == null ? model.Email : model.Username;

        var identityUser =
            MemberIdentityUser.CreateNew(model.Username, model.Email, model.MemberTypeAlias, true, model.Name);

        var identityResult = await memberManager.CreateAsync(
            identityUser);

        if (!identityResult.Succeeded) return (identityResult, identityUser);

        var passwordSetResult = memberManager.AddPasswordAsync(identityUser, model.Password);

        if (!identityResult.Succeeded && !passwordSetResult.Result.Succeeded) return (identityResult, identityUser);

        var member = memberService.GetByKey(identityUser.Key);
        if (member == null)
        {
            throw new InvalidOperationException($"Could not find a member with key: {member?.Key}.");
        }

        SetMemberProperties(model.MemberProperties, member);

        // Before we save the member we make sure to assign the group, for this the "Group" must exist in the backoffice.
        memberService.AssignRole(model.Email, memberGroup);

        memberService.Save(member);

        return (identityResult, identityUser);
    }

    public async Task UpdateMemberInfo(RegisterModel model, string memberGroup = "")
    {
        using ICoreScope scope = coreScopeProvider.CreateCoreScope(autoComplete: true);

        // var existingMember = _memberService.GetByEmail(model.Email);

        // generate an "identity user" with the information we have from the request
        var identityUser =
            MemberIdentityUser.CreateNew(model.Username, model.Email, model.MemberTypeAlias, true, model.Name);

        // get get the member based on the identity user we have generated for this session
        IMember? existingMember = memberService.GetByKey(identityUser.Key);

        // Now set the properties from the request on the matching user...
        SetMemberProperties(model.MemberProperties, existingMember);

        // now update the role on the user...
        var currentMemberRoles = await memberManager.GetRolesAsync(identityUser);

        // if a membergroup has been passed to the api AND it does not match a group the current member is a part of...
        if (!string.IsNullOrEmpty(memberGroup) && !currentMemberRoles.Contains(memberGroup))
        {
            // remove them from any current roles so a single member does not belong to many member groups
            await memberManager.RemoveFromRolesAsync(identityUser, currentMemberRoles);

            // assign to new group!
            memberService.AssignRole(model.Email, memberGroup);
        }

        memberService.Save(existingMember);
        await memberManager.UpdateAsync(identityUser);
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
        if (!umbracoContextAccessor.TryGetUmbracoContext(out IUmbracoContext? context))
        {
            return false;
        }

        Task<MemberIdentityUser?> currentMember = memberManager.GetCurrentMemberAsync();
        if (currentMember != null)
        {
            string? memberKey = currentMember.Result?.Key.ToString();
            commerceApi.Uow.Execute(uow =>
            {
                Order order = commerceApi.GetOrCreateCurrentOrder(currentOrder.StoreId)
                    .AsWritable(uow)
                    .AssignToCustomer(memberKey);
                commerceApi.SaveOrder(order);

                uow.Complete();
            });

            // member successfully attached to customer
            return true;
        }

        // no member attached
        return false;
    }

    #region Member Content Items

    private IPublishedContent? GetProductById(string productId)
    {
        var contentCache = GetContentCache();
        var siteRoot = contentCache?.GetAtRoot().FirstOrDefault();

        var collectionPages = siteRoot?.Children
            .FirstOrDefault(c => c.ContentType.Alias == ProductsPage.ModelTypeAlias)?.Children
            .Where(c => c.ContentType.Alias == CollectionPage.ModelTypeAlias) ?? [];

        IPublishedContent? subscriptionProduct = null;
        foreach (IPublishedContent? collection in collectionPages)
        {
            subscriptionProduct = collection.Children
                .FirstOrDefault(x => x.Value("productId").Equals(productId));
            if (subscriptionProduct != null) { break; }
        }

        return subscriptionProduct;
    }

    #region  companies

    // private async Task<IContent> TieCompanyToSubscription(string companyId)
    // {
    //     var company = _searchService.Search(Company.ModelTypeAlias)?
    //         .FirstOrDefault(x => x.Content.Value("externalId") == companyId);

    // company.Content.va("subscriptions", companyId);

    // return company?.Content as IContent;
    // }

    #endregion

    #endregion

    private IPublishedContentCache GetContentCache()
    {
        using var umbracoContextReference = umbracoContextFactory.EnsureUmbracoContext();
        var contentQuery = umbracoContextReference.UmbracoContext.Content;
        return contentQuery;
    }
}