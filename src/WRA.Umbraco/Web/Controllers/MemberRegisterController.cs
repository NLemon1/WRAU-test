using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Umbraco.Cms.Core.Cache;
using Umbraco.Cms.Core.Logging;
using Umbraco.Cms.Core.Models;
using Umbraco.Cms.Core.Routing;
using Umbraco.Cms.Core.Scoping;
using Umbraco.Cms.Core.Security;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Core.Web;
using Umbraco.Cms.Infrastructure.Persistence;
using Umbraco.Cms.Web.Common.Filters;
using Umbraco.Cms.Web.Common.Security;
using Umbraco.Cms.Web.Website.Controllers;
using Umbraco.Cms.Web.Website.Models;
using WRA.Umbraco.Web.Services;

namespace WRA.Umbraco.Controllers;

public class MemberRegisterController : SurfaceController
{
    private readonly IMemberManager _memberManager;
    private readonly IMemberService _memberService;
    private readonly IMemberSignInManager _memberSignInManager;
    private readonly ICoreScopeProvider _coreScopeProvider;
    private readonly WraMemberManagementService _WRAMemberManagementService;

    public MemberRegisterController(
        IMemberManager memberManager,
        IMemberService memberService,
        WraMemberManagementService WRAMemberManagementService,
        IUmbracoContextAccessor umbracoContextAccessor,
        IUmbracoDatabaseFactory databaseFactory,
        ServiceContext services,
        AppCaches appCaches,
        IProfilingLogger profilingLogger,
        IPublishedUrlProvider publishedUrlProvider,
        IMemberSignInManager memberSignInManager,
        ICoreScopeProvider coreScopeProvider)
        : base(umbracoContextAccessor, databaseFactory, services, appCaches, profilingLogger, publishedUrlProvider)
    {
        _memberManager = memberManager;
        _memberService = memberService;
        _memberSignInManager = memberSignInManager;
        _WRAMemberManagementService = WRAMemberManagementService;
        _coreScopeProvider = coreScopeProvider;
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    [ValidateUmbracoFormRouteString]
    public async Task<IActionResult> HandleRegisterMember([Bind(Prefix = "registerModel")] RegisterModel model)
    {
        if (ModelState.IsValid == false)
        {
            return CurrentUmbracoPage();
        }

        MergeRouteValuesToModel(model);

        var result = await RegisterMemberAsync(model);
        if (result.Succeeded)
        {
            TempData["FormSuccess"] = true;


            if (model.RedirectUrl.IsNullOrWhiteSpace() == false)
            {
                return Redirect(model.RedirectUrl!);
            }


            return RedirectToCurrentUmbracoPage();
        }

        AddErrors(result);
        return CurrentUmbracoPage();
    }

    /// <summary>
    /// 
    /// </summary>
    /// <param name="model"></param>
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

    //Here we created a helper Method to assign a MemberGroup to a member.
    private void AssignMemberGroup(string email, string group)
    {
        try
        {
            _memberService.AssignRole(email, group);
        }
        catch (Exception ex)
        {
            //handle the exception
        }

    }


    /// <summary>

    /// </summary>
    /// <param name="model">Register member model.</param>
    /// <param name="logMemberIn">Flag for whether to log the member in upon successful registration.</param>
    /// <returns>Result of registration operation.</returns>
    /// 

    private async Task<IdentityResult> RegisterMemberAsync(RegisterModel model, bool logMemberIn = true)
    {
        var (identityResult,identityUser)= await _WRAMemberManagementService.RegisterMember(model);

        if (logMemberIn && identityResult.Succeeded)
        {
            await _memberSignInManager.SignInAsync(identityUser, false);
        }
        return identityResult;
    }
}

