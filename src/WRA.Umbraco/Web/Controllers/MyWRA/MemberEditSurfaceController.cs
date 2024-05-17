using Microsoft.AspNetCore.Mvc;
using Umbraco.Cms.Core.Cache;
using Umbraco.Cms.Core.Logging;
using Umbraco.Cms.Core.Routing;
using Umbraco.Cms.Core.Security;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Core.Web;
using Umbraco.Cms.Infrastructure.Persistence;
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
    public async Task<IActionResult> HandleMemberEdit(EditMemberDto memberInfo)
    {
        try
        {
            if (!ModelState.IsValid)
            {
                return CurrentUmbracoPage();
            }

            if (memberInfo == null || string.IsNullOrEmpty(memberInfo.Email))
            {
                return CurrentUmbracoPage();
            }

            // Get member
            var member = services.MemberService.GetByEmail(memberInfo.Email);
            // update member
            if (member != null)
            {
                if (string.IsNullOrEmpty(memberInfo.FullName)) member.Name = memberInfo.FullName;
                member.Email = memberInfo.Email;
                member.SetIfNotEmpty(GlobalConstants.Member.AddressLine1, memberInfo.Address);
                member.SetIfNotEmpty(GlobalConstants.Member.WorkPhone, memberInfo.WorkPhone);
                member.SetIfNotEmpty(GlobalConstants.Member.CellPhone, memberInfo.CellPhone);
                member.SetIfNotEmpty(GlobalConstants.Member.HomePhone, memberInfo.HomePhone);
                // member.SetIfNotEmpty(GlobalConstants.Member.Website, memberInfo.Website);
            }

            return RedirectToCurrentUmbracoPage();

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