using Microsoft.AspNetCore.Identity;
using Umbraco.Cms.Core.Cache;
using Umbraco.Cms.Core.Models;
using Umbraco.Cms.Core.PublishedCache;
using Umbraco.Cms.Core.Scoping;
using Umbraco.Cms.Core.Services;
using WRA.Umbraco.Contracts;
using WRA.Umbraco.Extensions;
using WRA.Umbraco.Repositories;
using WRA.Umbraco.Services.Caching;

namespace WRA.Umbraco.Helpers;

public class MemberHelper(
    IMemberService memberService,
    CompanyRepository companyRepository,
    ICacheKeyProvider cacheKeyProvider,
    ICoreScopeProvider coreScopeProvider,
    AppCaches appCache,
    bool autoSave = true)
: ContentHelperBase<IMember, MemberEvent>(cacheKeyProvider, appCache)
{
    public IMember update(IMember target, MemberEvent source)
    {
        using var scope = coreScopeProvider.CreateCoreScope();
        DynamicUpdate(target, source);
        SetProperty(target, "ExternalId", source.Id);
        SetSensitiveData(source.PasswordHash, source.PasswordSalt, target);

        if (autoSave)
        {
            memberService.Save(target);
        }

        scope.Complete();
        return target;
    }

    private static void SetSensitiveData(string hash, string salt, IMember existingMember)
    {
        SetProperty(existingMember, "token", salt);
        existingMember.RawPasswordValue = hash;
    }

    public void SetCompanyOnMember(IMember member, MemberEvent mevent, IPublishedContentCache content)
    {
        var company = companyRepository.Get(mevent.CompanyId, content);
        if (company != null)
        {
            member.SetValue("company", company.GetUdi());
        }
    }

    // public static void AssignMemberToMemberGroup(IMember member, MemberEvent mevent)
    // {
    //
    //     // // TODO: make membergroups an array for one to many relationship.
    //     var memberGroup = mdto.MemberTypeId switch
    //     {
    //         "MDR" => "DesignatedRealtor",
    //         "ST" => "WRA Member",
    //         "A" => "Affiliate",
    //         _ => "Visitor"
    //     };
    //
    //     // get current member roles
    //     var memberRoles = memberService.GetAllRoles(member.Id);
    //     // if current member role is not part of the incoming update/create, remove them from said role.
    //     var unmatchedRoles = memberRoles.Where(mr => memberGroup != mr);
    //     if (unmatchedRoles.Any())
    //     {
    //         var identityUser = new MemberIdentityUser(member.Id);
    //         memberService.DissociateRoles([member.Id], unmatchedRoles.ToArray());
    //     }
    //     memberService.AssignRole(member.Id, memberGroup);
    // }

    public static IMember? UpdateMemberProperties(IMember member, MemberEvent memberEvent)
    {
        member.SetValue("externalId", memberEvent.iMISId);
        member.SetValue("brokerFullName", memberEvent.BrokerFullName);
        member.SetValue("brokerEmail", memberEvent.BrokerEmail);
        member.SetValue("address1", memberEvent.Address1);
        member.SetValue("address2", memberEvent.Address2);
        member.SetValue("address3", memberEvent.Address3);
        member.SetValue("city", memberEvent.City);
        member.SetValue("cellPhone", memberEvent.CellPhone);
        member.SetValue("canUseHotline", memberEvent.CanUseHotline);
        member.SetValue("companyLogoUrl", memberEvent.CompanyLogoUrl);
        member.SetValue("companyId", memberEvent.CompanyId);
        member.SetValue("companyName", memberEvent.CompanyName);

        // member.SetValue("companySubscriptions", mdto.CompanySubscriptions);
        member.SetValue("fax", memberEvent.Fax);
        member.SetValue("firstName", memberEvent.FirstName);
        member.SetValue("lastName", memberEvent.LastName);
        member.SetValue("gender", memberEvent.Gender);
        member.SetValue("homePhone", memberEvent.HomePhone);
        member.SetValue("imageUrl", memberEvent.ImageUrl);
        member.SetValue("joinDate", memberEvent.JoinDate);
        member.SetValue("mandatoryHotlineLetter", memberEvent.MandatoryHotlineLetter);
        member.SetValue("nrdsId", memberEvent.NrdsId);
        member.SetValue("paidThruDate", memberEvent.PaidThruDate);
        member.SetValue("prefix", memberEvent.Prefix);
        member.SetValue("suffix", memberEvent.Suffix);
        member.SetValue("stateProvince", memberEvent.StateProvince);
        member.SetValue("zip", memberEvent.Zip);
        member.SetValue("marketingEmail", memberEvent.MarketingEmail);

        return member;
    }
}