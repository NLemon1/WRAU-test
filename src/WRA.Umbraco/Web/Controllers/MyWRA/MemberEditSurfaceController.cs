using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Umbraco.Cms.Core.Cache;
using Umbraco.Cms.Core.Logging;
using Umbraco.Cms.Core.Routing;
using Umbraco.Cms.Core.Security;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Core.Web;
using Umbraco.Cms.Infrastructure.Persistence;
using Umbraco.Cms.Web.Common.Filters;
using Umbraco.Cms.Web.Website.Controllers;
using WRA.Umbraco.Extensions;
using WRA.Umbraco.Helpers.Constants;
using WRA.Umbraco.Web.Dtos.Member;

namespace WRA.Umbraco.Web.Controllers.MyWRA;

public class MemberEditSurfaceController(
    IUmbracoContextAccessor umbracoContextAccessor,
    IUmbracoDatabaseFactory databaseFactory,
    ServiceContext serviceContext,
    AppCaches appCaches,
    IProfilingLogger profilingLogger,
    IPublishedUrlProvider publishedUrlProvider,
    IMemberManager memberManager,
    ILogger<MemberEditSurfaceController> logger
    ) : SurfaceController(
        umbracoContextAccessor,
        databaseFactory,
        serviceContext,
        appCaches,
        profilingLogger,
        publishedUrlProvider
    )
{
    [HttpPost]
    [ValidateAntiForgeryToken]
    [ValidateUmbracoFormRouteString]
    public IActionResult HandleMemberEdit([Bind(Prefix = "memberUpdateModel")] EditMemberDto memberInfo)
    {
        try
        {
            string? redirectUrl = memberInfo?.RedirectUrl ?? CurrentPage!.Url();
            var currentMember = memberManager.GetCurrentMemberAsync().GetAwaiter().GetResult();
            bool requestMemberMatchesCurrentMember = memberInfo?.MemberId.ToString() == currentMember.Id;
            if ((!ModelState.IsValid && !requestMemberMatchesCurrentMember) || memberInfo == null)
            {
                return Redirect(redirectUrl);
            }

            // Get  member
            var member = Services.MemberService.GetById(memberInfo.MemberId);
            if (member == null) return Redirect(redirectUrl);

            if (!string.IsNullOrEmpty(memberInfo.FirstName)) member.Name = $"{memberInfo.FirstName} {memberInfo.LastName}";
            member.SetIfNotEmpty(GlobalConstants.Member.FirstName, memberInfo.FirstName);
            member.SetIfNotEmpty(GlobalConstants.Member.LastName, memberInfo.LastName);
            member.SetIfNotEmpty(GlobalConstants.Member.AddressLine1, memberInfo.Address1);
            member.SetIfNotEmpty(GlobalConstants.Member.AddressLine2, memberInfo.Address2);
            member.SetIfNotEmpty(GlobalConstants.Member.AddressLine3, memberInfo.Address3);
            member.SetIfNotEmpty(GlobalConstants.Member.City, memberInfo.City);
            member.SetIfNotEmpty(GlobalConstants.Member.State, memberInfo.State);
            member.SetIfNotEmpty(GlobalConstants.Member.ZipCode, memberInfo.ZipCode);
            member.SetIfNotEmpty(GlobalConstants.Member.WorkPhone, memberInfo.WorkPhone);
            member.SetIfNotEmpty(GlobalConstants.Member.CellPhone, memberInfo.CellPhone);
            member.SetIfNotEmpty(GlobalConstants.Member.HomePhone, memberInfo.HomePhone);
            member.SetIfNotEmpty(GlobalConstants.Member.PersonalWebSite, memberInfo.PersonalWebSite);
            member.SetIfNotEmpty(GlobalConstants.Member.PrimaryCounties, memberInfo.PrimaryCounties);
            member.SetIfNotEmpty(GlobalConstants.Member.SecondaryLanguage, memberInfo.SecondaryLanguage);
            member.SetIfNotEmpty(GlobalConstants.Member.AreaOfSpecialty, memberInfo.AreaOfSpecialty);
            Services.MemberService.Save(member);
            return Redirect(redirectUrl);
        }
        catch (Exception e)
        {
            logger.LogError(e, "Error updating member: {MemberInfo}", memberInfo.MemberId);
            throw;
        }
    }
}
