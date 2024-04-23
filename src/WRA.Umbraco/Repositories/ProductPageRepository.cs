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

            // // get product type, which is always the parent to a product page
            // var categoryPage = new CategoryPage(productQuery.Parent, new NoopPublishedValueFallback());

            // // get categories and subcategories attached to a page
            // var category = productPage.Categories?.FirstOrDefault();
            // var subCategory = productPage.SubCategories?.FirstOrDefault();
            //
            // // grab currency
            // var store = productPage.GetStore();
            // var currency = GetCurrency(store.Id);
            // decimal? basePrice = productPage.Price?.GetPriceFor(currency.Id).Value;
            // decimal? memberPrice = productPage.MemberPrice?.GetPriceFor(currency.Id).Value;

            return productPage;
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error getting product: sku - {sku}", sku);
            throw;
        }
    }

    public async Task<IContent?> CreateProductCollectionPage(ProductCollectionDto productCollection)
    {
        using var scope = scopeProvider.CreateCoreScope();
        var context = contextFactory.EnsureUmbracoContext();
        var contentCache = context.UmbracoContext.Content;
        var home = contentCache?.GetAtRoot().FirstOrDefault();

        var productsContainer = home.ChildrenOfType(ProductsPage.ModelTypeAlias).First();
        var productCategoryPages = productsContainer.ChildrenOfType(CollectionPage.ModelTypeAlias)
            .Where(p => p.Value<Guid>(GlobalAliases.ExternalId).Equals(productCollection.Id));
        var existingCollectionPage = productCategoryPages.FirstOrDefault();

        var collectionPage = existingCollectionPage != null ?
            contentService.GetById(existingCollectionPage.Id) :
            contentService.Create(productCollection.Name, productsContainer.Id, CollectionPage.ModelTypeAlias);

        collectionPage.SetValue(GlobalAliases.ExternalId, productCollection.Id);
        collectionPage.SetValue("name", productCollection.Name);
        collectionPage.SetValue("description", productCollection.Description);

        contentService.Save(collectionPage);
        scope.Complete();

        return collectionPage;
    }
}