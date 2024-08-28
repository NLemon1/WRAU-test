using Hangfire;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using Umbraco.Cms.Core.Models;
using Umbraco.Cms.Core.Scoping;
using Umbraco.Cms.Core.Security;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Core.Web;
using Umbraco.Cms.Web.Website.Models;
using Umbraco.Commerce.Core.Api;
using Umbraco.Commerce.Core.Models;
using WRA.Umbraco.Contracts;

namespace WRA.Umbraco.Web.Services;

public class WraMemberManagementService(
    IMemberService memberService,
    IMemberManager memberManager,
    ICoreScopeProvider coreScopeProvider,
    IUmbracoCommerceApi commerceApi,
    IUmbracoContextAccessor umbracoContextAccessor,
    MemberHelper memberHelper,
    ILogger<WraMemberManagementService> logger)
{
    private const string DefaultMemberType = "Member";

    [DisableConcurrentExecution(timeoutInSeconds: 5)]
    public IMember? CreateOrUpdate(MemberEvent memberEvent)
    {
        try
        {
            using var scope = coreScopeProvider.CreateCoreScope();

            // first check if the member already exists in the database
            var existingMember = memberService.GetByEmail(memberEvent.Email);

            // if one exists, send to update method
            if (existingMember != null)
            {
                scope.Complete();
                return Update(memberEvent);
            }

            // spin up an IMember rather than memberIdentity to avoid db locks.
            string fullName = $"{memberEvent.FirstName} {memberEvent.LastName}";
            string memberName = string.IsNullOrWhiteSpace(fullName) ? memberEvent.Email : fullName;

            var newMember = memberService.CreateMember(
                memberEvent.Email,
                memberEvent.Email,
                memberName,
                DefaultMemberType);

            // updates all the fields on the member
            memberHelper.SetProperties(newMember, memberEvent);

            // since a new member could potentially not exist in WRA's
            newMember.IsApproved = true;

            // Must save here so an ID is assigned to the new member.
            // We need the memberId to create a link to member and memberGroups (roles).
            memberService.Save(newMember);
            logger.LogInformation("Created member: {Email} - {Id}", newMember.Email, newMember.Id);

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

    public void BatchMemberUpdate(List<MemberEvent> memberEvents)
    {
        logger.LogInformation("- BatchMemberUpdate of {RecordsCount} -", memberEvents.Count);
        foreach (var memberEvent in memberEvents)
        {
            CreateOrUpdate(memberEvent);
        }
    }

    [DisableConcurrentExecution(10)]
    public IMember? Update(MemberEvent memberEvent, IMember? targetMember = null)
    {
        // Create a scope
        // suppress any notification to prevent our listener from firing an "updated member" webhook back at the queue
        using var scope = coreScopeProvider.CreateCoreScope();
        var existingMember = targetMember ?? memberService.GetByEmail(memberEvent.Email);

        // Query by email as they are unique in this site and in WRA's records.

        if (existingMember == null) return null;

        memberHelper.SetProperties(existingMember, memberEvent);

        logger.LogInformation("Updated member: {Member} - {Email}", existingMember.Id, existingMember.Email);
        scope.Complete();
        return existingMember;
    }

    public Task Delete(MemberEvent reqMember)
    {
        try
        {
            // Create a scope
            using var scope = coreScopeProvider.CreateCoreScope();

            var existingMember = memberService.GetByEmail(reqMember.Email);
            if (existingMember == null)
            {
                logger.LogInformation("Cannot delete member. Member not found: {Email}", reqMember.Email);
                scope.Complete();
                return Task.CompletedTask;
            }

            memberService.Delete(existingMember);
            scope.Complete();
            logger.LogInformation("Deleted member: {Email}", reqMember.Email);
            return Task.CompletedTask;
        }
        catch (Exception e)
        {
            logger.LogError(e, "Error deleting member with email {Email}", reqMember.Email);
            throw;
        }
    }

    public async Task<(IdentityResult? IdentityResult, MemberIdentityUser? MemberIdentityUser)> RegisterMember(RegisterModel model, string memberGroup = "Visitor")
    {
        using var scope = coreScopeProvider.CreateCoreScope(autoComplete: true);

        if (string.IsNullOrEmpty(model.Name) && !string.IsNullOrEmpty(model.Email))
        {
            model.Name = model.Email;
        }

        var memberExists = memberService.GetByEmail(model.Email);
        if (memberExists != null)
        {
            return (IdentityResult.Failed(new IdentityError { Code = "MemberExists", Description = "Member already exists" }), null);
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
            throw new InvalidOperationException($"Could not find a member with key: {identityUser.Key}.");
        }

        SetMemberProperties(model.MemberProperties, member);

        // Before we save the member we make sure to assign the group, for this the "Group" must exist in the backoffice.
        memberService.AssignRole(model.Email, memberGroup);

        memberService.Save(member);

        return (identityResult, identityUser);
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
}