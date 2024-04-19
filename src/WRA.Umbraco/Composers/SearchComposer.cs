using Microsoft.Extensions.DependencyInjection;
using Umbraco.Cms.Core.Composing;
using WRA.Umbraco.Configuration;

namespace WRA.Umbraco.Composers;

[ComposeBefore(typeof(DateFolderComposer))]
public class SearchComposer : IComposer
{
    public void Compose(IUmbracoBuilder builder)
    {
        // Custom Examine configuration
        builder.Services.ConfigureOptions<ConfigureLuceneIndexOptions>();
    }
}