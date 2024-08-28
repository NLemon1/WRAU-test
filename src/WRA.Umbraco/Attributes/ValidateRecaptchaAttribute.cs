using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Options;
using Umbraco.Cms.Core.Security;
using WRA.Umbraco.Configuration.Settings;
using WRA.Umbraco.Exceptions;
using WRA.Umbraco.Web.Services;

namespace WRA.Umbraco.Filters;

/// <summary>
/// Attribute for validating reCAPTCHA o an endpoint by endpoint basis.
/// Allows for overriding global settings through the attribute.
/// </summary>
/// <param name="memberManager">Umbraco member management service for determining if the user is logged in.</param>
/// <param name="recaptchaService">Recaptcha service responsible for making calls to external API.</param>
/// <param name="recaptchaOptions"><see cref="RecaptchaSettings"/> passed in using the options pattern.</param>
/// <param name="logger">Serilog logger.</param>
[AttributeUsage(AttributeTargets.Method | AttributeTargets.Class, AllowMultiple = false)]
public class ReCaptchaRequiredAttribute(IMemberManager memberManager, IRecaptchaService recaptchaService, IOptions<RecaptchaSettings> recaptchaOptions, ILogger logger) : ActionFilterAttribute
{
    private readonly IMemberManager _memberManager = memberManager;
    private readonly IRecaptchaService _recaptchaService = recaptchaService;
    private readonly RecaptchaSettings _recaptchaSettings = recaptchaOptions.Value;
    private readonly ILogger _logger = logger.ForContext<ReCaptchaRequiredAttribute>();

    // Version of reCAPTCHA to use. ('v2' and 'v3' are valid options) If not set it will default to the global settings.
    public string? Version { get; set; }

    // Validate reCAPTCHA for logged in users or just anonymous users.
    public bool? ValidateLoggedInUsers { get; set; }

    // Minimum score we count as a succesful response for V3 reCAPTCHA.
    public double? MinimumScore { get; set; }

    // Enable or Disable the attribute.
    public bool Enabled { get; set; } = true;

    /// <summary>
    /// Executed when endpoints with the attribute are called.
    /// </summary>
    /// <param name="context">The execution context of the request.</param>
    /// <param name="next">Delegate to the rest of the execution flow.</param>
    /// <returns><see cref="BadRequestObjectResult"/> for any invalid states such as missing, invalid, too low of score.</returns>
    public override async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
    {
        using var activity = _logger.StartActivity(LogEventLevel.Information, "Validation Filter - reCAPTCHA {Filter}:{Method}");
        try
        {
            activity.AddProperty(nameof(Enabled), Enabled);
            activity.AddProperty(nameof(Version), Version);

            // Use the local setting from the attribute if it's set otherwise default to configuration.
            bool validateLoggedInUsers = ValidateLoggedInUsers ?? _recaptchaSettings.ValidateLoggedInUsers;
            activity.AddProperty(nameof(ValidateLoggedInUsers), validateLoggedInUsers);

            // Skip validation if disabled or user it logged in and we are not validating logged in users.
            if (!Enabled || (!validateLoggedInUsers && _memberManager.IsLoggedIn()))
            {
                activity.Complete();
                await next();
                return;
            }

            // Get the reCAPTCHA response from the request context
            string? captchaResponse = context.HttpContext.Request.Form["g-recaptcha-response"].FirstOrDefault();

            // No captcha answer was provided by the user.
            if (string.IsNullOrEmpty(captchaResponse))
            {
                _logger.Information("reCAPTCHA response from user was not found.");
                activity.Complete();
                context.Result = new BadRequestObjectResult("Please complete the reCAPTCHA.");
                return;
            }

            // Validate the recaptcha using our service which will handle both v2 and v3.
            var (success, score) = await _recaptchaService.ValidateRecaptchaAsync(captchaResponse);

            // Recaptcha validation failed
            if (!success)
            {
                _logger.Information("reCAPTCHA validation failed.");
                activity.Complete();
                context.Result = new BadRequestObjectResult("reCAPTCHA validation failed.");
                return;
            }

            // If we are using v3 and a minimum score is set, check the score.
            if (Version.EqualsIgnoreCase("v3") || (Version == null && _recaptchaSettings.V3 != null))
            {
                double minimumScore = MinimumScore ?? _recaptchaSettings.V3.MinimumScore;
                if (score < minimumScore)
                {
                    _logger.Information("reCAPTCHAT score too low.");
                    activity.Complete();
                    context.Result = new BadRequestObjectResult("reCAPTCHA score too low.");
                    return;
                }
            }

            // Call the next action in the request pipeline effectively validating the reCAPTCHA.
            activity.Complete();
            await next();
        }
        catch (Exception ex)
        {
            _logger.Error(ex, "Unexpected error in the reCAPTCHA validation filter. {Message}", ex.Message);
            activity.Complete(LogEventLevel.Error, ex);
            throw new SurfaceAttributeFilterException($"Unexpected error in the reCAPTCHA validation filter. {ex.Message}", ex);
        }
    }
}