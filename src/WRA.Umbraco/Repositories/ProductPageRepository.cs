using Microsoft.Extensions.Logging;
using Umbraco.Cms.Core.Models;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Core.PublishedCache;
using Umbraco.Cms.Core.Scoping;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Core.Web;
using Umbraco.Commerce.Core.Models;
using Umbraco.Commerce.Core.Services;
using WRA.Umbraco.Helpers.Constants;
using WRA.Umbraco.Models;
using WRA.Umbraco.Web.Dtos.External;
using WRA.Umbraco.Web.Dtos.WraExternal;

namespace WRA.Umbraco.Repositories;

public class ProductPageRepository(
    IUmbracoContextFactory contextFactory,
    ICoreScopeProvider scopeProvider,
    IContentService contentService,
    ILogger<ProductPageRepository> logger)
{
    public ProductPage? GetBySku(string sku)
    {
        try
        {
            using var scope = scopeProvider.CreateCoreScope(autoComplete: true);
            var context = contextFactory.EnsureUmbracoContext();
            var contentCache = context.UmbracoContext.Content;
            var productContentType = contentCache.GetContentType(ProductPage.ModelTypeAlias);
            if (productContentType == null) return null;
            var productPages = contentCache.GetByContentType(productContentType)
                .OfType<ProductPage>();
            var productPage = productPages.FirstOrDefault(p => p.Sku == sku);
            if (productPage != null) return productPage;
            logger.LogInformation("Product not found: sku - {Sku}", sku);
            return null;

        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error getting product: sku - {Sku}", sku);
            throw;
        }
    }

    public IEnumerable<ProductPage> GetAll()
    {
        using var scope = scopeProvider.CreateCoreScope();
        var context = contextFactory.EnsureUmbracoContext();
        var contentCache = context.UmbracoContext.Content;
        var contentType = contentCache.GetContentType(ProductPage.ModelTypeAlias);
        if (contentType == null) return new List<ProductPage>();
        var allProducts = contentCache.GetByContentType(contentType).OfType<ProductPage>();
        return allProducts;

    }

    public IContent? GetByExternalId(Guid externalId)
    {
        try
        {
            using var scope = scopeProvider.CreateCoreScope(autoComplete: true);
            var context = contextFactory.EnsureUmbracoContext();
            var contentCache = context.UmbracoContext.Content;
            var productPageType = contentCache.GetContentType(ProductPage.ModelTypeAlias);
            if (productPageType == null) return null;
            var productPage = contentCache.GetByContentType(productPageType)
                .First(p => p.Value(GlobalConstants.Product.Sku).Equals(externalId));

            var productPageContent = contentService.GetById(productPage.Id);
            return productPageContent;
        }
        catch (Exception e)
        {
            logger.LogError(e, "Error getting product by external ID: {ExternalId}", externalId);
            throw;
        }
    }

    public IContent? CreateProductCollectionPage(ExternalProductCollectionDto productCollection)
    {
        using var scope = scopeProvider.CreateCoreScope();
        var context = contextFactory.EnsureUmbracoContext();
        var contentCache = context.UmbracoContext.Content;
        var home = contentCache?.GetAtRoot().FirstOrDefault();

        var productsContainer = home!.ChildrenOfType(ProductsPage.ModelTypeAlias)!.First();
        var productCategoryPages = productsContainer.ChildrenOfType(CollectionPage.ModelTypeAlias)!
            .Where(p => p.Value<Guid>(GlobalConstants.ExternalId).Equals(productCollection.Id));

        // if one doesn't have an external ID, we will do a name comparison
        if (!productCategoryPages.Any())
        {
            productCategoryPages = productsContainer.ChildrenOfType(CollectionPage.ModelTypeAlias)!
                .Where(p => p.Name.Equals(productCollection.Name));
        }

        var existingCollectionPage = productCategoryPages.FirstOrDefault();

        var collectionPage = existingCollectionPage != null ?
            contentService.GetById(existingCollectionPage.Id) :
            contentService.Create(productCollection.Name, productsContainer.Id, CollectionPage.ModelTypeAlias);

        collectionPage.Name = productCollection.Name;
        collectionPage.SetValue(GlobalConstants.ExternalId, productCollection.Id);
        collectionPage.SetValue("description", productCollection.Description);

        contentService.SaveAndPublish(collectionPage);
        scope.Complete();
        logger.LogInformation("Product collection page created: {ProductCollectionId} - {Name}", productCollection.Id, collectionPage.Name);
        return collectionPage;
    }
}