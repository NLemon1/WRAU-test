using Examine;
using Examine.Lucene;
using Microsoft.Extensions.Options;
using Umbraco.Cms.Core;
using Umbraco.Cms.Core.Configuration.Models;
using Umbraco.Cms.Infrastructure.Examine;
using WRA.Umbraco.Helpers;
using WRA.Umbraco.Helpers.Constants;

namespace WRA.Umbraco.Configuration;

public class ConfigureLuceneIndexOptions() : IConfigureNamedOptions<LuceneDirectoryIndexOptions>
{
    public void Configure(string? name, LuceneDirectoryIndexOptions options)
    {
        switch (name)
        {
            case Constants.UmbracoIndexes.MembersIndexName:
                options.FieldDefinitions.TryAdd(new FieldDefinition(GlobalConstants.ExternalId, FieldDefinitionTypes.FullText));
                break;
        }
    }

    public void Configure(LuceneDirectoryIndexOptions options) => Configure(string.Empty, options);
}