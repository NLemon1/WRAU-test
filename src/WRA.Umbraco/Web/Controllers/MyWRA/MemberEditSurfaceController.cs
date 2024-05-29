using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Text;
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

            if (!ModelState.IsValid)
            {
                return Redirect(memberInfo.RedirectUrl);
            }

            // Get member
            var member = services.MemberService.GetById(memberInfo.MemberId);
            // update member
            if (member == null) return Redirect(memberInfo.RedirectUrl);

            if (!string.IsNullOrEmpty(memberInfo.FirstName)) member.Name = $"{memberInfo.FirstName} {memberInfo.LastName}";
            // member.Email = memberInfo.Email;
            member.SetIfNotEmpty(GlobalConstants.Member.AddressLine1, memberInfo.Address1);
            member.SetIfNotEmpty(GlobalConstants.Member.AddressLine2, memberInfo.Address2);
            member.SetIfNotEmpty(GlobalConstants.Member.AddressLine3, memberInfo.Address3);
            member.SetIfNotEmpty(GlobalConstants.Member.City, memberInfo.City);
            member.SetIfNotEmpty(GlobalConstants.Member.State, memberInfo.State);
            member.SetIfNotEmpty(GlobalConstants.Member.ZipCode, memberInfo.ZipCode);
            member.SetIfNotEmpty(GlobalConstants.Member.WorkPhone, memberInfo.WorkPhone);
            member.SetIfNotEmpty(GlobalConstants.Member.CellPhone, memberInfo.CellPhone);
            member.SetIfNotEmpty(GlobalConstants.Member.HomePhone, memberInfo.HomePhone);
            services.MemberService.Save(member);
            //return RedirectToCurrentUmbracoPage();
            return Redirect(memberInfo.RedirectUrl);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }
}

public class ModelState
{
}