using Microsoft.Extensions.Logging;
using Umbraco.Cms.Core.Models;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Core.Scoping;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Core.Web;
using WRA.Umbraco.Models;
using WRA.Umbraco.Web.Dtos.External;

namespace WRA.Umbraco.Repositories;

public class TaxonomyRepository(
    IContentService contentService,
    ICoreScopeProvider coreScopeProvider,
    IUmbracoContextFactory umbracoContextFactory,
    ILogger<TaxonomyRepository> logger)
{
    public async Task<IContent> CreateOrUpdateTaxonomy(ExternalTaxonomyDto taxonomyDto){
        using var scope = coreScopeProvider.CreateCoreScope();
        using var umbracoContextReference = umbracoContextFactory.EnsureUmbracoContext();
        var contentCache = umbracoContextReference.UmbracoContext.Content;

        var taxonomyType = contentCache.GetContentType(ProductTaxonomy.ModelTypeAlias);
        var allTaxonomy = contentCache.GetByContentType(taxonomyType);

        var siteRoot = contentCache.GetAtRoot().FirstOrDefault();
        var taxonomyContainer = siteRoot?.Children
            .FirstOrDefault(x => x.ContentType.Alias == TaxonomyItems.ModelTypeAlias);
        if (taxonomyContainer == null)
        {
            scope.Complete();
            return null;
        }

        var existingTaxonomy = allTaxonomy.FirstOrDefault(t =>
            t.Value<Guid>(GlobalAliases.ExternalId) == taxonomyDto.Id);

        var taxonomy = existingTaxonomy != null ?
            contentService.GetById(existingTaxonomy.Id) :
            contentService.Create(taxonomyDto.Name, taxonomyContainer.Id, ProductTaxonomy.ModelTypeAlias);

        taxonomy.SetValue(GlobalAliases.ExternalId, taxonomyDto.Id);
        taxonomy.SetValue("description", taxonomyDto.Description);
        contentService.SaveAndPublish(taxonomy);
        scope.Complete();
        logger.LogInformation("Taxonomy created or updated");
        return taxonomy;
    }

    public IPublishedContent Get(Guid externalId)
    {
        using var scope = coreScopeProvider.CreateCoreScope();
        using var umbracoContextReference = umbracoContextFactory.EnsureUmbracoContext();
        var contentCache = umbracoContextReference.UmbracoContext.Content;

        var taxonomyType = contentCache.GetContentType(ProductTaxonomy.ModelTypeAlias);
        var allTaxonomy = contentCache.GetByContentType(taxonomyType);

        var existingTaxonomy = allTaxonomy.FirstOrDefault(t =>
            t.Value<Guid>(GlobalAliases.ExternalId) == externalId);


        return existingTaxonomy;
    }
}