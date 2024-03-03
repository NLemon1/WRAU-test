
using System.Security.Cryptography;
using System.Web;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Org.BouncyCastle.Ocsp;
using Umbraco.Cms.Core;
using Umbraco.Cms.Core.Cache;
using Umbraco.Cms.Core.Configuration.Models;
using Umbraco.Cms.Core.Logging;
using Umbraco.Cms.Core.Mail;
using Umbraco.Cms.Core.Models;
using Umbraco.Cms.Core.Models.Email;
using Umbraco.Cms.Core.Routing;
using Umbraco.Cms.Core.Security;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Core.Web;
using Umbraco.Cms.Infrastructure.Persistence;
using Umbraco.Cms.Web.Common.Security;
using Umbraco.Cms.Web.Website.Controllers;
using WRA.Umbraco.Web.Dtos;

namespace WRA.Umbraco.Controllers;
public class MemberLoginController : UmbLoginController
{
    private readonly IMemberManager _memberManager;
    private readonly IMemberService _memberService;
    private readonly GlobalSettings _globalSettings;
    private readonly LinkGenerator _linkGenerator;
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly ILocalizedTextService _textService;
    private readonly IEmailSender _emailSender;
    private readonly ILocalizationService _localisation;
    private readonly ILogger<MemberLoginController> _logger;
    private readonly IConfiguration _configuration;

    public MemberLoginController(
        IUmbracoContextAccessor umbracoContextAccessor,
        IUmbracoDatabaseFactory databaseFactory,
        ServiceContext services,
        AppCaches appCaches,
        IProfilingLogger profilingLogger,
        IPublishedUrlProvider publishedUrlProvider,
        IMemberSignInManager signInManager,
        IMemberManager memberManager,
        ITwoFactorLoginService twoFactorLoginService,
        IOptionsSnapshot<GlobalSettings> globalSettings,
        LinkGenerator linkGenerator,
        IHttpContextAccessor httpContextAccessor,
        ILocalizedTextService textService,
        IEmailSender emailSender,
        ILocalizationService localisation,
        ILogger<MemberLoginController> logger,
        IConfiguration configuration,
        IMemberService memberService
        ) : base(
            umbracoContextAccessor,
            databaseFactory,
            services,
            appCaches,
            profilingLogger,
            publishedUrlProvider,
            signInManager,
            memberManager,
            twoFactorLoginService)
    {
        _memberManager = memberManager;
        _globalSettings = globalSettings.Value;
        _linkGenerator = linkGenerator;
        _httpContextAccessor = httpContextAccessor;
        _textService = textService;
        _emailSender = emailSender;
        _localisation = localisation;
        _logger = logger;
        _configuration = configuration;
        _memberService = memberService;
    }


    [HttpPost]
    public async Task<IActionResult> ForgotPassword(ResetPasswordDto model)
    {
        await Task.Delay(RandomNumberGenerator.GetInt32(400, 2500)); // To randomize response time preventing user enumeration

        if (model.NewPassword != null && model.userid != null)
        {
            var member = _memberService.GetById(Convert.ToInt32(model.userid));
            var newPassword = model.NewPassword;
            var token = model.token;
            var confirmPass = model.confirmPassword;
            var validPassword = await _memberManager.ValidatePasswordAsync(newPassword);
            if (!validPassword.Succeeded)
            {
                ModelState.AddModelError("NoPass", "Password is not valid");
            }
            if (string.IsNullOrWhiteSpace(newPassword))
            {
                ModelState.AddModelError("NoPass", "You must enter a password");
            }
            if (newPassword != confirmPass)
            {
                ModelState.AddModelError("NoMatch", "passwords do not match");
            }
            // not sure what this does?
            if (Request.Form["token"][0].Replace(" ", "+") != token)
            {
                ModelState.AddModelError("TokenInv", "Reset token is invalid");
            }
            if (!ModelState.IsValid)
            {
                TempData["Message"] = "Validation Error";
                return CurrentUmbracoPage();
            }
            var resetSuccess = ResetPassword(model);
            if (resetSuccess)
            {
                TempData["Message"] = "Reset password error";
                return CurrentUmbracoPage();
            }
            //everything ok so redirect to the login page.
            return Redirect("~/login");

        }
        else
        {
            MemberIdentityUser? memberIdentityUser = await _memberManager.FindByEmailAsync(model.email);



            if (memberIdentityUser != null)
            {
                // IUser? user = _userService.GetByEmail(model.Email);

                var from = _globalSettings.Smtp?.From;
                var code = await _memberManager.GeneratePasswordResetTokenAsync(memberIdentityUser);
                var token = HttpUtility.UrlEncode(code);
                // var callbackUrl = ConstructCallbackUrl(memberIdentityUser.Id, code);

                string baseURL = _configuration.GetSection("Umbraco:CMS:WebRouting:UmbracoApplicationUrl").Value ?? string.Empty;
                var resetUrl = $"{baseURL}/reset-password/?id={memberIdentityUser.Id}&token={token}";
                var siteName = "WRA";

                var messageBody = $@"<p>Hi {memberIdentityUser.Name},</p>
                    <p>Someone requested a password reset for your account on {siteName}.</p>
                    <p>If this wasn't you then you can ignore this email, otherwise, please click the following password reset link to continue:</p>
                    <p>Please go to <a href='{resetUrl}'>here</a> to reset your password</p>
                    <p>&nnbsp;</p>
                    <p>Kind regards,<br/>The {siteName} Team</p>";

                var subject = "Reset your password";

                var mailMessage = new EmailMessage(from, memberIdentityUser.Email, subject, messageBody, true);
                try
                {
                    await _emailSender.SendAsync(mailMessage, Constants.Web.EmailTypes.PasswordReset, true);
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Error sending email, please check your SMTP configuration: {ErrorMessage}", ex.Message);
                    return Ok();
                }
            }
            else
            {
                ModelState.AddModelError("ForgotPasswordForm", "Member not found");
            }
        }
        return CurrentUmbracoPage();
    }

    private bool ResetPassword(ResetPasswordDto model)
    {
        var identityUser = _memberManager.FindByIdAsync(model.userid).Result;

        var result = _memberManager.ResetPasswordAsync(identityUser, model.token, model.NewPassword).Result;
        return result.Succeeded;

    }
    // private string ConstructCallbackUrl(string userId, string code)
    // {
    //     // Get an mvc helper to get the url
    //     var action = _linkGenerator.GetPathByAction(
    //         nameof(MemberController.ValidatePasswordResetCode),
    //         ControllerExtensions.GetControllerName<MemberController>(),
    //         new { u = userId, r = code });

    //     // Construct full URL using configured application URL (which will fall back to current request)
    //     Uri applicationUri = _httpContextAccessor.GetRequiredHttpContext().Request
    //         .GetApplicationUri(_webRoutingSettings);
    //     var callbackUri = new Uri(applicationUri, action);
    //     return callbackUri.ToString();
    // }

}


