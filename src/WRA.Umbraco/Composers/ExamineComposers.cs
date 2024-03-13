using Examine;
using Microsoft.Extensions.DependencyInjection;
using Umbraco.Cms.Core.Composing;

public class SearchComposer : IComposer
{
    public void Compose(IUmbracoBuilder builder)
    {
        // Custom Examine configuration
        builder.Services.ConfigureOptions<ConfigureIndexOptions>();
    }
}