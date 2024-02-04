
using K4os.Compression.LZ4.Internal;
using Microsoft.AspNetCore.Identity;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using NUglify.Helpers;
using Umbraco.Cms.Core.Models;
using Umbraco.Cms.Core.Scoping;
using Umbraco.Cms.Core.Security;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Infrastructure.Examine;
using Umbraco.Cms.Web.Common.Security;
using Umbraco.Cms.Web.Website.Models;
using WRA.Umbraco.Dtos;

namespace WRA.Umbraco.Services;

public class MemberManagementService
{
    private readonly IMemberService _memberService;
    private readonly IMemberManager _memberManager;
    private readonly ICoreScopeProvider _coreScopeProvider;

    public MemberManagementService(
        IMemberService memberService,
        IMemberManager memberManager,
        ICoreScopeProvider coreScopeProvider
    )
    {
        _memberService = memberService;
        _memberManager = memberManager;
        _coreScopeProvider = coreScopeProvider;
    }


    /// <summary>
    /// CRUD Operations for Webhooks
    /// </summary>
    /// <param name="member"></param>
    public IMember Create(MemberDto member)
    {
        var newMember = _memberService.CreateMember(
            member.Email,
            member.Email,
            member.FullName,
            "Member");


        // updates all the fields on the user
        newMember.UpdateWRAMemberProperties(member);
        // Must save here so an ID is assigned to the new member.
        // We need the memberId to create a link to member and memberGroups (roles).
        _memberService.Save(newMember);

        //generate an identity user based off our new member...
        var identityUser =
            new MemberIdentityUser(newMember.Id);

        // assign to relvevant memberGroup...
        AssignMemberToMemberGroup(identityUser, member);
        return newMember;
    }

    public IMember? Update(MemberDto reqMember)
    {
        // Since we assume the user already exists, get the identity user right away.
        var identityUser =
           MemberIdentityUser.CreateNew(reqMember.Email, reqMember.Email, "Member", true, reqMember.FullName);

        // take the identity user returned and get generate an Imember instance
        // Imember updates don't save until the save() function is called. Helpful for avoiding DB locks.
        IMember? existingMember = _memberService.GetByKey(identityUser.Key);
        if (existingMember == null) { return null; }

        existingMember.UpdateWRAMemberProperties(reqMember);
        _memberService.Save(existingMember);
        return existingMember;
    }

    private void AssignMemberToMemberGroup(MemberIdentityUser member, MemberDto mdto)
    {

        // TODO: make membergroups an array for one to many relationship.
        var memberGroup = mdto.MemberType switch
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
            _memberManager.RemoveFromRolesAsync(member, unmatchedRoles);
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
}