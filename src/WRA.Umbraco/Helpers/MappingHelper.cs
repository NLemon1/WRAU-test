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
        var companyUdi = content.GetUdi();
        var contentNode = contentQuery.GetById(companyUdi);
        return contentNode;
    }

    public IPublishedContent? FindRelatedContent(Guid Identifier)
    {
        using var umbracoContextReference = umbracoContextFactory.EnsureUmbracoContext();
        var contentQuery = umbracoContextReference.UmbracoContext.Content;
        var contentNode = contentQuery.GetById(Identifier);
        return contentNode;
    }
}