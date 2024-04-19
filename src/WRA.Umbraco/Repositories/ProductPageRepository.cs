using Microsoft.Extensions.Logging;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Core.PublishedCache;
using Umbraco.Commerce.Core.Models;
using Umbraco.Commerce.Core.Services;
using WRA.Umbraco.Models;

namespace WRA.Umbraco.Repositories;

public class ProductPageRepository(
    ICurrencyService currencyService,
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
                .FirstOrDefault(c => c.Value<string>("sku") == sku);
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
}