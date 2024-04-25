using Microsoft.Extensions.Logging;
using Umbraco.Cms.Core.Models;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Core.PublishedCache;
using Umbraco.Cms.Core.Scoping;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Core.Web;
using Umbraco.Commerce.Core.Models;
using Umbraco.Commerce.Core.Services;
using WRA.Umbraco.Models;
using WRA.Umbraco.Web.Dtos.WraExternal;

namespace WRA.Umbraco.Repositories;

public class ProductPageRepository(
    ICurrencyService currencyService,
    IUmbracoContextFactory contextFactory,
    ICoreScopeProvider scopeProvider,
    IContentService contentService,
    ILogger<ProductPageRepository> logger)
{
    private CurrencyReadOnly GetCurrency(Guid storeId) => currencyService.GetCurrencies(storeId).First(c => c.Name == "USD");

    public ProductPage? Get(string sku, IPublishedContentCache contentCache)
    {
        try
        {
            var siteRoot = contentCache.GetAtRoot().FirstOrDefault();

            // search products
            var productQuery = siteRoot?.Children
                .Where(c => c.ContentType.Alias == ProductPage.ModelTypeAlias)
                .FirstOrDefault(c => c.Value<string>(GlobalAliases.Sku) == sku);
            if (productQuery == null)
            {
                logger.LogInformation("Product not found: sku - {Sku}", sku);
                return null;
            }

            // cast as our strongly type product page
            var productPage = new ProductPage(productQuery, new NoopPublishedValueFallback());

            return productPage;
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error getting product: sku - {Sku}", sku);
            throw;
        }
    }

    public async Task<IContent?> GetByExternalId(Guid externalId)
    {
        try
        {
            using var scope = scopeProvider.CreateCoreScope();
            var context = contextFactory.EnsureUmbracoContext();
            var contentCache = context.UmbracoContext.Content;
            var home = contentCache?.GetAtRoot().FirstOrDefault();

            var productPage = home.ChildrenOfType(ProductPage.ModelTypeAlias)
                .FirstOrDefault(p => p.Value<Guid>(GlobalAliases.ExternalId).Equals(externalId));

            var productPageContent = contentService.GetById(productPage.Id);
            return productPageContent;
        }
        catch (Exception e)
        {
            logger.LogError(e, "Error getting product by external ID: {ExternalId}", externalId);
            throw;
        }
    }

    // TODO move to it's own repository class
    public async Task<IContent?> CreateProductCollectionPage(ProductCollectionDto productCollection)
    {
        using var scope = scopeProvider.CreateCoreScope();
        var context = contextFactory.EnsureUmbracoContext();
        var contentCache = context.UmbracoContext.Content;
        var home = contentCache?.GetAtRoot().FirstOrDefault();

        var productsContainer = home.ChildrenOfType(ProductsPage.ModelTypeAlias).First();
        var productCategoryPages = productsContainer.ChildrenOfType(CollectionPage.ModelTypeAlias)!
            .Where(p => p.Value<Guid>(GlobalAliases.ExternalId).Equals(productCollection.Id));

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
        collectionPage.SetValue(GlobalAliases.ExternalId, productCollection.Id);
        collectionPage.SetValue("description", productCollection.Description);

        contentService.SaveAndPublish(collectionPage);
        scope.Complete();
        logger.LogInformation("Product collection page created: {ProductCollectionId} - {Name}", productCollection.Id, collectionPage.Name);
        return collectionPage;
    }
}