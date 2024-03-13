using Examine;
using Examine.Lucene;
using Microsoft.Extensions.Options;
using Umbraco.Cms.Core;
using Umbraco.Cms.Core.Configuration.Models;
using Umbraco.Cms.Infrastructure.Examine;

public class ConfigureIndexOptions : IConfigureNamedOptions<LuceneDirectoryIndexOptions>
{
    private readonly IUmbracoIndexConfig _umbracoIndexConfig;
    private readonly IOptions<IndexCreatorSettings> _settings;

    public ConfigureIndexOptions(
        IUmbracoIndexConfig umbracoIndexConfig,
        IOptions<IndexCreatorSettings> settings)
    {
        _umbracoIndexConfig = umbracoIndexConfig;
        _settings = settings;
    }

    public void Configure(string name, LuceneDirectoryIndexOptions options)
    {
        switch (name)
        {
            case Constants.UmbracoIndexes.MembersIndexName:
                options.FieldDefinitions.TryAdd(new FieldDefinition("ExternalId", FieldDefinitionTypes.FullText));
                break;
        }
    }

    public void Configure(LuceneDirectoryIndexOptions options)
        => Configure(string.Empty, options);
}