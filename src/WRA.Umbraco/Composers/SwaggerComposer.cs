using Microsoft.Extensions.DependencyInjection;
using Umbraco.Cms.Core.Composing;
using WRA.Umbraco.Configurations;

namespace WRA.Umbraco.Composers;

[ComposeAfter(typeof(WebhookComposer))]
public class SwaggerComposer : IComposer
{
    public void Compose(IUmbracoBuilder builder)
    {
        // Inject swagger IOptions
        builder.Services.ConfigureOptions<ConfigureSwaggerOptions>();
    }
}