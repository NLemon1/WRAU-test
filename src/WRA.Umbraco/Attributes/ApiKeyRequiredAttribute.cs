using Microsoft.AspNetCore.Mvc;
using WRA.Umbraco.Filters;

namespace WRA.Umbraco.Attributes;

public class ApiKeyRequiredAttribute : ServiceFilterAttribute
{
    public ApiKeyRequiredAttribute()
    : base(typeof(ApiKeyAuthorizationFilter))
    {
    }
}