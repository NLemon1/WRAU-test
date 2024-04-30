using Microsoft.Extensions.Logging;
using Umbraco.Cms.Core;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Core.Web;
using Umbraco.Cms.Web.Common;
using Umbraco.Commerce.Core.Api;
using Umbraco.Commerce.Core.Models;
using WRA.Umbraco.Dtos;
using WRA.Umbraco.Extensions;
using WRA.Umbraco.Models;

namespace WRA.Umbraco.Web.Services;

public class WraProductService(
    IUmbracoCommerceApi umbracoCommerceApi,
    SearchService searchService,
    ILogger<WraProductService> logger)
{
    public IEnumerable<ProductPage> GetProducts(ProductsRequestDto request)
    {
        try
        {
            var products = searchService.Search(ProductPage.ModelTypeAlias)
                .Select(p => new ProductPage(p.Content, new NoopPublishedValueFallback()));

            // first, lets apply the product type filter
            if (!string.IsNullOrEmpty(request.ProductType))
            {
                products = products.Where(p => string.Equals(p.Collection.Name, request.ProductType, StringComparison.OrdinalIgnoreCase));
            }

            // now lets apply category and sub-category filters if they are requested
            if (request.Categories.Count != 0)
            {
                products = products
                    .Where(p => p.Categories.ContainsCategories(request.Categories));
            }

            if (request.SubCategories.Count != 0)
            {
                products = products
                    .Where(p => p.SubCategories.ContainsCategories(request.SubCategories));
            }

            // finally, lets apply a taxonomy filter if it is requested
            if (!string.IsNullOrEmpty(request.Taxonomy))
            {
                products = products
                    .Where(p => p.Taxonomy.Contains(request.Taxonomy));
            }

            return products;
        }
        catch (Exception e)
        {
            logger.LogError(e, "Error getting products");
            throw;
        }
    }

    public ProductPage? GetProductById(string productId)
    {
        var product = searchService.Search(ProductPage.ModelTypeAlias)
            .Select(p => new ProductPage(p.Content, new NoopPublishedValueFallback()))
            .FirstOrDefault(p => p.ProductId == productId);

        return product;
    }

    public IEnumerable<BundlePage> GetProductBundles(ProductBundlesRequestDto request)
    {
        IEnumerable<BundlePage> bundles = searchService.SearchBySubCategory(request.SubCategory, BundlePage.ModelTypeAlias)
            .Select(p => new BundlePage(p.Content, new NoopPublishedValueFallback()));
        return bundles;
    }

    public IEnumerable<BundlePage> GetProductBundlesBySubCategory(Guid subCategoryUdi)
    {
        GuidUdi udi = new GuidUdi("document", subCategoryUdi);
        return searchService.SearchBySubCategory(udi, BundlePage.ModelTypeAlias)
            .Select(p => new BundlePage(p.Content, new NoopPublishedValueFallback()));
    }

    public IEnumerable<ProductPage> GetProductsBySubCategory(Guid subCategoryUdi)
    {
        GuidUdi udi = new GuidUdi("document", subCategoryUdi);
        return searchService.SearchBySubCategory(udi, ProductPage.ModelTypeAlias)
            .Select(p => new ProductPage(p.Content, new NoopPublishedValueFallback()));
    }

    public IEnumerable<TimeBasedDiscountDto?> GetTimeBasedDiscounts(IProductComp content)
    {
        // If the product is null return an empty list.
        IProductSnapshot? product = content.AsProduct();
        if (product == null) return [];

        GuidUdi udi = new("document", content.Key);

        // Get specific discount that holds the rules for "time based discounts"
        const string timeBasedDiscountAlias = "timeBasedDiscount";
        DiscountReadOnly timeBasedDiscount = umbracoCommerceApi.GetDiscount(product.StoreId, timeBasedDiscountAlias);

        // If the time based discount is not active, return empty list
        if (timeBasedDiscount?.IsActive != true) return [];

        // Here we will grab the groups on the discount
        var groupedDiscountRules = timeBasedDiscount.Rules.Children
            .Where(r => r.RuleProviderAlias == "groupDiscountRule")
            .Select(x => x);

        // Next we will build the kvp that contains our product UDI...
        var productNodeIds = new List<KeyValuePair<string, string>>()
        {
            new("nodeId", udi.ToString()),
        };

        // Filter to single rule automatic discounts that are time based
        IEnumerable<DiscountRuleConfig>? timeBasedDiscountsOnProduct = groupedDiscountRules.Where(x =>
            x.Children.Any(c => c.RuleProviderAlias == "orderLineProductDiscountRule" && c.Settings.ContainsAll(productNodeIds)));

        // Return empty list if no discount rule configs exist for the above condition.
        if (!timeBasedDiscountsOnProduct.Any()) return [];

        List<TimeBasedDiscountDto> timeBasedDiscounts = [];

        // Time based discounts must be in GroupDiscountRules that contain the products along with a "Time Discount Rule"
        var rewards = timeBasedDiscount.Rewards;
        foreach (var reward in rewards)
        {
            if (reward == null) continue;
            var startDate = reward.Settings["startDate"].TryConvertTo<DateTime?>().Result;
            var endDate = reward.Settings["endDate"].TryConvertTo<DateTime?>().Result;

            // we will only support percent discount rewards for now.
            // get the percentage value of the reward
            string? pctDiscount = reward.Settings["percentage"];

            // Return an empty list if there is no percentage discount or we weren't able to parse the start and end dates.
            if (string.IsNullOrEmpty(pctDiscount) || !startDate.HasValue || !endDate.HasValue) return [];

            // Attempt to get a decimal value
            var attempt = pctDiscount.TryConvertTo<decimal>();
            if (attempt.Success)
            {
                // return the discount along with it's active dates
                timeBasedDiscounts.Add(new TimeBasedDiscountDto
                {
                    StartDate = startDate.Value,
                    EndDate = endDate.Value,
                    Percentage = attempt.Result
                });
            }
        }

        // filter out discounts that have already expired
        return timeBasedDiscounts.Where(tbd => tbd.EndDate >= DateTime.Now);
    }
}

public class TimeBasedDiscountDto
{
    public DateTime StartDate { get; set; }

    public DateTime EndDate { get; set; }

    public decimal Percentage { get; set; }

    public bool Active => DateTime.Now >= StartDate && DateTime.Now <= EndDate;
}