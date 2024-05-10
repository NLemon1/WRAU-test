using System.Text;
using Umbraco.Cms.Core.Models;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Core.Web;
using WRA.Umbraco.Extensions;

namespace WRA.Umbraco.Helpers;

public class MappingHelper(
    IUmbracoContextFactory umbracoContextFactory)
{
    public IPublishedContent? GetRelatedContent(IContentBase source, string alias)
    {
        using var umbracoContextReference = umbracoContextFactory.EnsureUmbracoContext();
        var contentQuery = umbracoContextReference.UmbracoContext.Content;
        string? content = source.GetValue<string>(alias);
        if (string.IsNullOrEmpty(content)) return null;
        var contentUdi = content.GetUdi();
        if (contentUdi == null) return null;
        var contentNode = contentQuery.GetById(contentUdi);
        return contentNode;

    }

    public IPublishedContent? FindRelatedContent(Guid Identifier)
    {
        using var umbracoContextReference = umbracoContextFactory.EnsureUmbracoContext();
        var contentQuery = umbracoContextReference.UmbracoContext.Content;
        var contentNode = contentQuery.GetById(Identifier);
        return contentNode;
    }

    public Guid GetExternalIdOnContent(IContentBase content, string alias)
    {
        var relatedContent = GetRelatedContent(content, alias);
        return relatedContent?.Value<Guid>(GlobalAliases.ExternalId) ?? Guid.Empty;
    }

    public Guid GetExternalIdOnParent(IContentBase content)
    {
        using var umbracoContextReference = umbracoContextFactory.EnsureUmbracoContext();
        var contentQuery = umbracoContextReference.UmbracoContext.Content;
        var contentNode = contentQuery.GetById(content.Id);
        var parent = contentNode?.Parent;
        return parent?.Value<Guid>(GlobalAliases.ExternalId) ?? Guid.Empty;
    }
}