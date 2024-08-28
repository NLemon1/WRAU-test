using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Umbraco.Cms.Core.Composing;
using WRA.Umbraco.Web.ModelBinders;

namespace WRA.Umbraco.Composers;

/// <summary>
/// Allows for adding custom model binders to the application.
/// </summary>
public class CustomModelBinderComposer : IComposer
{
    public void Compose(IUmbracoBuilder builder)
    {
        // Add Newtonsoft model binding for use on specific endpoints.
        builder.Services.Configure<MvcOptions>(options =>
        {
            options.ModelBinderProviders.Insert(0, new FromNewtonsoftJsonModelBinderProvider());
        });
    }
}