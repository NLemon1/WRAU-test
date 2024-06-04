using Microsoft.AspNetCore.Mvc;
using Umbraco.Cms.Core.Cache;
using Umbraco.Cms.Core.Logging;
using Umbraco.Cms.Core.Routing;
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
    ServiceContext services,
    AppCaches appCaches,
    IProfilingLogger profilingLogger,
    IPublishedUrlProvider publishedUrlProvider

    ) : SurfaceController(
        umbracoContextAccessor,
        databaseFactory,
        services,
        appCaches,
        profilingLogger,
        publishedUrlProvider
    )
{
    [HttpPost]
    [ValidateAntiForgeryToken]
    [ValidateUmbracoFormRouteString]
    public async Task<IActionResult> HandleMemberEdit([Bind(Prefix = "memberUpdateModel")] EditMemberDto memberInfo)
    {
        try
        {
            string? redirectUrl = memberInfo.RedirectUrl ?? CurrentPage.Url();
            if (!ModelState.IsValid)
            {
                return Redirect(redirectUrl);
            }

            // Get member
            var member = services.MemberService.GetById(memberInfo.MemberId);
            // update member
            if (member == null) return Redirect(redirectUrl);

            if (!string.IsNullOrEmpty(memberInfo.FirstName)) member.Name = $"{memberInfo.FirstName} {memberInfo.LastName}";
            member.SetIfNotEmpty(GlobalConstants.Member.FirstName, memberInfo.FirstName);
            member.SetIfNotEmpty(GlobalConstants.Member.LastName, memberInfo?.LastName);
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
            member.SetIfNotEmpty(GlobalConstants.Member.SecondaryLanguage, memberInfo.SecondaryLanguage);
            member.SetIfNotEmpty(GlobalConstants.Member.AreaOfSpecialty, memberInfo.AreaOfSpecialty);
            services.MemberService.Save(member);
            return Redirect(redirectUrl);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }
}
