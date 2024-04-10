using System.Reflection;
using Umbraco.Cms.Core.Models;
using Umbraco.Cms.Core.PublishedCache;
using Umbraco.Cms.Core.Services;
using WRA.Umbraco.Extensions;
using WRA.Umbraco.Repositories;

namespace WRA.Umbraco.Helpers;

public class MemberHelper(IMemberService memberService, CompanyRepository companyRepository, bool autoSave = true)
{
    public IMember DynamicUpdate(IMember target, IMemberEvent source)
    {
        var properties = source.GetType().GetProperties(BindingFlags.Public | BindingFlags.Instance);
        foreach (var property in properties)
        {
            var alias = GetPropertyAlias(property.Name);
            if (!target.Properties.Contains(alias) || !IsSimpleType(property.PropertyType)) continue;
            var value = property.GetValue(source, null);
            target.SetValue(alias, value);
        }
        SetSensitiveData(source.PasswordHash, source.PasswordSalt, target);
        if (autoSave)
        { 
            memberService.Save(target);
        }
        return target;
    }
    private static string GetPropertyAlias(string propertyName)
    {
        return char.ToLowerInvariant(propertyName[0]) + propertyName.Substring(1);
    }
    
    private static bool IsSimpleType(Type type)
    {
        return type.IsPrimitive || type.IsEnum || type == typeof(string) || type == typeof(DateTime) || type == typeof(decimal);
    }

    public void SetProperty(IMember member, string propertyName, object value)
    {
        var alias = GetPropertyAlias(propertyName);
        if (member.HasProperty(alias))
        {
            member.SetValue(alias, value);
        }
    }
    
    private static void SetSensitiveData(string hash, string salt, IMember existingMember)
    {
        existingMember.SetValue("token", salt);
        existingMember.RawPasswordValue = hash;
    }
    
     public void SetCompanyOnMember(IMember member, IMemberEvent mevent, IPublishedContentCache content)
    {
        var company = companyRepository.GetCompany(mevent.CompanyId, content);
        if (company != null)
        {
            member.SetValue("company", company?.GetUdi());
        }
    }

    // public void SetBoardOnMember(IMember member, IMemberEvent mevent, IPublishedContentCache content)
    // {
    //     boardHelper.CreateOrUpdateBoard(mevent.Board, content);
    // }
     
    public void AssignMemberToMemberGroup(IMember member, IMemberEvent mevent)
    {

        // // TODO: make membergroups an array for one to many relationship.
        // var memberGroup = mdto.MemberTypeId switch
        // {
        //     "MDR" => "DesignatedRealtor",
        //     "ST" => "WRA Member",
        //     "A" => "Affiliate",
        //     _ => "Visitor"
        // };
        //
        // // get current member roles
        // var memberRoles = memberService.GetAllRoles(member.Id);
        // // if current member role is not part of the incoming update/create, remove them from said role.
        // var unmatchedRoles = memberRoles.Where(mr => memberGroup != mr);
        // if (unmatchedRoles.Any())
        // {
        //     var identityUser = new MemberIdentityUser(member.Id);
        //     memberService.DissociateRoles([member.Id], unmatchedRoles.ToArray());
        // }
        // memberService.AssignRole(member.Id, memberGroup);
    }

    
    public IMember? UpdateMemberProperties(IMember member, IMemberEvent mevent)
    {
        member.SetValue("externalId", mevent.iMISId);
        member.SetValue("brokerFullName", mevent.BrokerFullName);
        member.SetValue("brokerEmail", mevent.BrokerEmail);
        member.SetValue("address1", mevent.Address1);
        member.SetValue("address2", mevent.Address2);
        member.SetValue("address3", mevent.Address3);
        member.SetValue("city", mevent.City);
        member.SetValue("cellPhone", mevent.CellPhone);
        member.SetValue("canUseHotline", mevent.CanUseHotline);
        member.SetValue("companyLogoUrl", mevent.CompanyLogoUrl);
        member.SetValue("companyId", mevent.CompanyId);
        member.SetValue("companyName", mevent.CompanyName);
        //member.SetValue("companySubscriptions", mdto.CompanySubscriptions);
        member.SetValue("fax", mevent.Fax);
        member.SetValue("firstName", mevent.FirstName);
        member.SetValue("lastName", mevent.LastName);
        member.SetValue("gender", mevent.Gender);
        member.SetValue("homePhone", mevent.HomePhone);
        member.SetValue("imageUrl", mevent.ImageUrl);
        member.SetValue("joinDate", mevent.JoinDate);
        member.SetValue("mandatoryHotlineLetter", mevent.MandatoryHotlineLetter);
        member.SetValue("nrdsId", mevent.NrdsId);
        member.SetValue("paidThruDate", mevent.PaidThruDate);
        member.SetValue("prefix", mevent.Prefix);
        member.SetValue("suffix", mevent.Suffix);
        member.SetValue("stateProvince", mevent.StateProvince);
        member.SetValue("zip", mevent.Zip);
        member.SetValue("marketingEmail", mevent.MarketingEmail);
            
        return member;
    }
    
}