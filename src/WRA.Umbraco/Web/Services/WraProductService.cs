using Microsoft.Extensions.Logging;
using Umbraco.Cms.Core;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Commerce.Core.Api;
using Umbraco.Commerce.Core.Models;
using WRA.Umbraco.Dtos;
using WRA.Umbraco.Extensions;
using WRA.Umbraco.Models;
using WRA.Umbraco.Repositories;

namespace WRA.Umbraco.Web.Services;

public class WraProductService(
    IUmbracoCommerceApi umbracoCommerceApi,
    SearchService searchService,
    ProductPageRepository productPageRepository,
    ILogger<WraProductService> logger)
{
    public IEnumerable<ProductPage> GetProducts(ProductsRequestDto request)
    {
        try
        {
            var products = productPageRepository.GetAll();

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
                    .Where(p => p?.ProductTaxonomy != null && p.ProductTaxonomy.Name.Contains(request.Taxonomy));
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

        // Next we will build the kvp that contains our product UDI...
        var productNodeIds = new List<KeyValuePair<string, string>>()
        {
            new("nodeId", udi.ToString()),
        };

        // Get specific discount that holds the rules for "time based discounts"
        // TODO cache this
        const string dateRangeRuleAlias = "DateRangeRule";
        const string groupDiscountRuleAlias = "groupDiscountRule";
        var allTimedDiscounts = umbracoCommerceApi.GetActiveDiscounts(product.StoreId)
            .Where(discount => discount.Rules.Children
                .Where(discountRule => discountRule.RuleProviderAlias == groupDiscountRuleAlias)
                .Any(groupDiscountRule => groupDiscountRule.Children
                    .Any(subRule => subRule.RuleProviderAlias == dateRangeRuleAlias)
                ));

        var timeDiscountsContainingProduct = allTimedDiscounts.Where(
            discount => discount.Rules.Children
                .Where(discountRule => discountRule.RuleProviderAlias == groupDiscountRuleAlias)
                .Any(groupDiscountRule => groupDiscountRule.Children
                    .Any(subRule => subRule.RuleProviderAlias is "orderLineProductDiscountRule" &&
                                    subRule.Settings.ContainsAll(productNodeIds))));

        // DiscountReadOnly timeBasedDiscount = umbracoCommerceApi.GetDiscount(product.StoreId, timeBasedDiscountAlias);
        // get first for now. User should not create dupliacte discounts
        var timeBasedDiscount = timeDiscountsContainingProduct.FirstOrDefault();
        // If the time based discount is not active, return empty list
        if (timeBasedDiscount?.IsActive != true) return [];

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