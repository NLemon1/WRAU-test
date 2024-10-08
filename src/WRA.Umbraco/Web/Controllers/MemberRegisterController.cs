using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Umbraco.Cms.Core.Cache;
using Umbraco.Cms.Core.Logging;
using Umbraco.Cms.Core.Routing;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Core.Web;
using Umbraco.Cms.Infrastructure.Persistence;
using Umbraco.Cms.Web.Common.Filters;
using Umbraco.Cms.Web.Common.Security;
using Umbraco.Cms.Web.Website.Controllers;
using Umbraco.Cms.Web.Website.Models;
using WRA.Umbraco.Web.Services;

namespace WRA.Umbraco.Controllers;

public class MemberRegisterController(
    WraMemberManagementService WRAMemberManagementService,
    IUmbracoContextAccessor umbracoContextAccessor,
    IUmbracoDatabaseFactory databaseFactory,
    ServiceContext services,
    AppCaches appCaches,
    IProfilingLogger profilingLogger,
    IPublishedUrlProvider publishedUrlProvider,
    IMemberSignInManager memberSignInManager)
    : SurfaceController(
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
    public async Task<IActionResult> HandleRegisterMember([Bind(Prefix = "registerModel")] RegisterModel model)
    {
        if (!ModelState.IsValid)
        {
            return CurrentUmbracoPage();
        }

        MergeRouteValuesToModel(model);

        var result = await RegisterMemberAsync(model);
        if (result.Succeeded)
        {
            TempData["FormSuccess"] = true;

            if (!model.RedirectUrl.IsNullOrWhiteSpace())
            {
                return Redirect(model.RedirectUrl!);
            }

            return RedirectToCurrentUmbracoPage();
        }

        AddErrors(result);
        return CurrentUmbracoPage();
    }

    private void MergeRouteValuesToModel(RegisterModel model)
    {
        if (RouteData.Values.TryGetValue(nameof(RegisterModel.RedirectUrl), out var redirectUrl) && redirectUrl != null)
        {
            model.RedirectUrl = redirectUrl.ToString();
        }

        if (RouteData.Values.TryGetValue(nameof(RegisterModel.MemberTypeAlias), out var memberTypeAlias) &&
            memberTypeAlias != null)
        {
            model.MemberTypeAlias = memberTypeAlias.ToString()!;
        }

        if (RouteData.Values.TryGetValue(nameof(RegisterModel.UsernameIsEmail), out var usernameIsEmail) &&
            usernameIsEmail != null)
        {
            model.UsernameIsEmail = usernameIsEmail.ToString() == "True";
        }
    }

    private void AddErrors(IdentityResult result)
    {
        foreach (IdentityError? error in result.Errors)
        {
            ModelState.AddModelError("registerModel", error.Description);
        }
    }

    /// <summary>
    /// Registers a member with the system.
    /// </summary>
    /// <param name="model">Register member model.</param>
    /// <param name="logMemberIn">Flag for whether to log the member in upon successful registration.</param>
    /// <returns>Result of registration operation.</returns>
    private async Task<IdentityResult> RegisterMemberAsync(RegisterModel model, bool logMemberIn = true)
    {
        var (identityResult, identityUser) = await WRAMemberManagementService.RegisterMember(model);
        if (identityResult.Errors.Any() || identityUser == null)
        {
            return identityResult;
        }

        if (logMemberIn && identityResult.Succeeded)
        {
            await memberSignInManager.SignInAsync(identityUser, false);
        }

        return identityResult;
    }
}
