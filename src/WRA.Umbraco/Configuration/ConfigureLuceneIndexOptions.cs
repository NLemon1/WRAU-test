using Examine;
using Examine.Lucene;
using Microsoft.Extensions.Options;
using Umbraco.Cms.Core;
using Umbraco.Cms.Core.Configuration.Models;
using Umbraco.Cms.Infrastructure.Examine;

namespace WRA.Umbraco.Configuration;

public class ConfigureLuceneIndexOptions(IUmbracoIndexConfig umbracoIndexConfig, IOptions<IndexCreatorSettings> settings) : IConfigureNamedOptions<LuceneDirectoryIndexOptions>
{
    // TODO: Remove these if we aren't going to need them.
    private readonly IUmbracoIndexConfig _umbracoIndexConfig = umbracoIndexConfig;
    private readonly IOptions<IndexCreatorSettings> _settings = settings;

    public void Configure(string? name, LuceneDirectoryIndexOptions options)
    {
        switch (name)
        {
            case Constants.UmbracoIndexes.MembersIndexName:
                options.FieldDefinitions.TryAdd(new FieldDefinition("ExternalId", FieldDefinitionTypes.FullText));
                break;
        }
    }

    public void Configure(LuceneDirectoryIndexOptions options) => Configure(string.Empty, options);
}