using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using WRA.Umbraco.Configuration.Settings;
using WRA.Umbraco.Helpers.Constants;

namespace WRA.Umbraco.Filters;

public class ApiKeyAuthorizationFilter(IApiKeyValidator apiKeyValidator, ApiSettings apiSettings) : IAuthorizationFilter
{
    private readonly IApiKeyValidator _apiKeyValidator = apiKeyValidator;
    private readonly string _apiKeyHeaderName = apiSettings.ApiKeyHeaderName ?? GlobalConstants.Api.ApiKeyHeaderFallbackName;

    public void OnAuthorization(AuthorizationFilterContext context)
    {
        string? apiKey = context.HttpContext.Request.Headers[_apiKeyHeaderName];

        if (apiKey == null || !_apiKeyValidator.IsValid(apiKey))
        {
            context.Result = new UnauthorizedResult();
        }
    }
}