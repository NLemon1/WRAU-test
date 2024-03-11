

using Microsoft.Extensions.Azure;
using Smidge.Models;
using Umbraco.Cms.Core;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Core.Web;
using Umbraco.Commerce.Cms.Discounts.Rewards;
// using Umbraco.Commerce.Cms.Helpers;
using Umbraco.Commerce.Core.Api;
using Umbraco.Commerce.Core.Discounts.Rules;
using Umbraco.Commerce.Core.Models;
using Umbraco.Commerce.Core.Services;
using WRA.Umbraco.Dtos;
using WRA.Umbraco.Models;

namespace WRA.Umbraco.Services;

public class WraProductService
{
    private readonly IUmbracoCommerceApi _commerceApi;
    private readonly IProductService _productService;
    private readonly IUmbracoContextAccessor _umbracoContextAccessor;
    private readonly SearchService _searchService;

    public WraProductService(
        IUmbracoCommerceApi umbracoCommerceApi,
        IProductService productService,
        IUmbracoContextAccessor umbracoContextAccessor,
        SearchService searchService)
    {
        _commerceApi = umbracoCommerceApi;
        _productService = productService;
        _umbracoContextAccessor = umbracoContextAccessor;
        _searchService = searchService;
    }

    public IEnumerable<ProductPage> GetProducts(ProductsRequestDto request)
    {
        IEnumerable<ProductPage> products = _searchService.Search(ProductPage.ModelTypeAlias)
            .Select(p => new ProductPage(p.Content, new NoopPublishedValueFallback()));

        // first, lets apply the product type filter
        if (!string.IsNullOrEmpty(request.ProductType))
        {
            products = products.Where(p => string.Equals(p.Collection.Name, request.ProductType, StringComparison.OrdinalIgnoreCase));
        }
        // now lets apply category and sub-category filters if they are requested
        if (!string.IsNullOrEmpty(request.Category))
        {
            products = products
                .Where(p => p.Categories.ContainsProductCategory(request.Category));
        }
        if (!string.IsNullOrEmpty(request.SubCategory))
        {
            products = products
                .Where(p => p.SubCategories.ContainsProductCategory(request.SubCategory));
        }
        // finally, lets apply a taxonmy filter if it is requested
        if (!string.IsNullOrEmpty(request.Taxonomy))
        {
            products = products
                .Where(p => p.Taxonomy.Contains(request.Taxonomy));
        }
        return products;
    }

    public IEnumerable<BundlePage> GetProductBundles(ProductBundlesRequestDto request)
    {
        IEnumerable<BundlePage> bundles = _searchService.SearchBySubCategory(request.SubCategory, BundlePage.ModelTypeAlias)
            .Select(p => new BundlePage(p.Content, new NoopPublishedValueFallback()));
        return bundles;
    }
    public IEnumerable<BundlePage> GetProductBundlesBySubCategory(Guid subCategoryUdi)
    {
        GuidUdi udi = new GuidUdi("document", subCategoryUdi);
        return _searchService.SearchBySubCategory(udi, BundlePage.ModelTypeAlias)
            .Select(p => new BundlePage(p.Content, new NoopPublishedValueFallback()));
    }
    public IEnumerable<ProductPage> GetProductsBySubCategory(Guid subCategoryUdi)
    {
        GuidUdi udi = new GuidUdi("document", subCategoryUdi);
        return _searchService.SearchBySubCategory(udi, ProductPage.ModelTypeAlias)
            .Select(p => new ProductPage(p.Content, new NoopPublishedValueFallback()));
    }

    public IEnumerable<TimeBasedDiscountDto?> GetTimeBasedDiscounts(IProductComp content)
    {
        if (_umbracoContextAccessor.TryGetUmbracoContext(out IUmbracoContext? context) == false) { return null; }

        var product = content.AsProduct();
        if (product == null)
            return null;

        var udi = new GuidUdi("document", content.Key);

        // Get specific discount that holds the rules for "time based discounts"
        string timeBasedDiscountAlias = "timeBasedDiscount";
        var TimeBasedDiscount = _commerceApi.GetDiscount(product.StoreId, timeBasedDiscountAlias);

        if (TimeBasedDiscount == null || !TimeBasedDiscount.IsActive)
            return [];

        // Time based discounts must be in GroupDiscountRules that contain the products along with a "Time Discount Rule"
        var rewards = TimeBasedDiscount.Rewards;
        // Here we will grab the groups on the discount
        var groupedDiscountRules = TimeBasedDiscount.Rules.Children
            .Where(r => r.RuleProviderAlias == "groupDiscountRule")
            .Select(x => x);

        // Next we will build the kvp that contains our product UDI...
        var kvps = new List<KeyValuePair<string, string>>()
        {
            new KeyValuePair<string, string>("nodeId", udi.ToString()),
        };

        // Filter to single rule automatic discounts that are time based
        var timeBasedDiscountsOnProduct = groupedDiscountRules.Where(x =>
            x.Children.Where(c =>
                c.RuleProviderAlias == "orderLineProductDiscountRule" && c.Settings.ContainsAll(kvps)).Any());

        if (!timeBasedDiscountsOnProduct.Any())
        {
            return [];
        }
        // we will only support percent discount rewards for now.
        List<TimeBasedDiscountDto> timeBasedDiscounts = new();
        var awardKvps = new List<KeyValuePair<string, string>>()
            {
                //new KeyValuePair<string, string>("nodeId", udi.ToString()),
                new KeyValuePair<string, string>("adjustmentType", "Percentage")
            };


        var contentpublished = content as IPublishedContent;
        var percentageReward = rewards
            .Where(r =>
            {
                return r.Settings.ContainsAll(awardKvps);
            });
        foreach (var reward in rewards)
        {
            if (reward != null)
            {
                var startDate = reward.Settings["startDate"].TryConvertTo<DateTime>().Result;
                var endDate = reward.Settings["endDate"].TryConvertTo<DateTime>().Result;
                // get the percentage value of the reward
                var pctDiscount = reward.Settings["percentage"];

                if (string.IsNullOrEmpty(pctDiscount) || startDate == null || endDate == null)
                    return null;
                // cast as decimal
                var attempt = pctDiscount.TryConvertTo<decimal>();
                if (attempt.Success)
                {
                    // return the discount along with it's active dates
                    timeBasedDiscounts.Add(new TimeBasedDiscountDto
                    {
                        StartDate = startDate,
                        EndDate = endDate,
                        Percentage = attempt.Result
                    });
                }
            }
        }
        // filter out discounts that have allready expired
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