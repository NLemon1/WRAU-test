

using Umbraco.Cms.Core;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Core.Web;
using Umbraco.Commerce.Cms.Discounts.Rewards;
// using Umbraco.Commerce.Cms.Helpers;
using Umbraco.Commerce.Core.Api;
using Umbraco.Commerce.Core.Discounts.Rules;
using Umbraco.Commerce.Core.Models;
using Umbraco.Commerce.Core.Services;
using WRA.Umbraco.Models;

namespace WRA.Umbraco.Services;

public class WraProductService
{
    private readonly IUmbracoCommerceApi _commerceApi;
    private readonly IProductService _productService;
    private readonly IUmbracoContextAccessor _umbracoContextAccessor;

    public WraProductService(
        IUmbracoCommerceApi umbracoCommerceApi,
        IProductService productService,
        IUmbracoContextAccessor umbracoContextAccessor)
    {
        _commerceApi = umbracoCommerceApi;
        _productService = productService;
        _umbracoContextAccessor = umbracoContextAccessor;
    }


    public decimal DiscountedProductPrice(decimal price, decimal discount)
    {
        return price - (price * discount);
    }
    public IEnumerable<TimeBasedDiscountDto?> GetTimeBasedDiscounts(IProductComp content)
    {
        if (_umbracoContextAccessor.TryGetUmbracoContext(out IUmbracoContext? context) == false) { return null; }

        var product = content.AsProduct();
        if (product == null)
            return null;

        var udi = new GuidUdi("document", content.Key);

        // Get active discounts
        var discounts = _commerceApi.GetActiveDiscounts(product.StoreId);

        // Filter to single rule automatic discounts that are time based
        discounts = discounts.Where(x =>
            x.Rules.Children.Where(c => c.RuleProviderAlias == "TimeBaseLineItemDiscountRule").Any() &&
            x.Type == DiscountType.Automatic);

        // if none found, return null
        if (discounts.Any() == false)
            return null;

        // TODO get rule provider definitions from this method.
        // IEnumerable<DiscountRuleProviderDefinition> ruleProvider = _commerceApi.GetDiscountRuleProviderDefinitions();

        // Discounts rules are defined in the backoffice, so we need to find the rule that applies to the requested product
        var kvps = new List<KeyValuePair<string, string>>()
        {
            new KeyValuePair<string, string>("nodeId", udi.ToString()),
        };
        // use the above kvp to find the discount that applies to the product
        // also, we are only interested in a specific rule whch applies to a line item product
        // var discountsTargetOnProduct = discounts
        //     .FirstOrDefault(x => x.Rules.Children.Any(r =>
        //             r.RuleProviderAlias == "productTimeBasedDiscount" &&
        //             r.Settings.ContainsAll(kvps)));

        var timeBasedDiscountsOnProduct = discounts
           .Where(x => x.Rules.Children.Any(r =>
                   r.RuleProviderAlias == "TimeBaseLineItemDiscountRule" &&
                   r.Settings.ContainsAll(kvps)));


        List<TimeBasedDiscountDto> timeBasedDiscounts = new();
        foreach (var discountItem in timeBasedDiscountsOnProduct)
        {
            var applicableRules = discountItem.Rules.Children
                .Where(r => r.RuleProviderAlias == "TimeBaseLineItemDiscountRule" &&
                            r.Settings.ContainsAll(kvps));
            var startDate = applicableRules.Select(r => r.Settings["startDate"]).FirstOrDefault();
            var endDate = applicableRules.Select(r => r.Settings["endDate"]).FirstOrDefault();

            // now that we have our discount, we need to only grab percentage based rewards
            var awardKvps = new List<KeyValuePair<string, string>>()
            {
                //new KeyValuePair<string, string>("nodeId", udi.ToString()),
                new KeyValuePair<string, string>("adjustmentType", "Percentage")
            };


            var contentpublished = content as IPublishedContent;
            var percentageReward = discountItem.Rewards
                .FirstOrDefault(r =>
                {
                    return r.Settings.ContainsAll(awardKvps);
                });

            if (percentageReward != null)
            {
                // get the percentage value of the reward
                var pctDiscount = percentageReward.Settings["percentage"];

                if (string.IsNullOrEmpty(pctDiscount))
                    return null;
                // cast as decimal
                var attempt = pctDiscount.TryConvertTo<decimal>();
                if (attempt.Success)
                {
                    // return the discount along with it's active dates
                    timeBasedDiscounts.Add(new TimeBasedDiscountDto
                    {
                        StartDate = DateTime.Parse(startDate),
                        EndDate = DateTime.Parse(endDate),
                        Percentage = attempt.Result
                    });
                }
            }
            return timeBasedDiscounts;
        }

        return [];
    }
}

public class TimeBasedDiscountDto
{
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public decimal Percentage { get; set; }
}