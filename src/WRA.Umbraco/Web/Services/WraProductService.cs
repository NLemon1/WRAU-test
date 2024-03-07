

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

    public IEnumerable<TimeBasedDiscountDto?> GetTimeBasedDiscounts(IProductComp content)
    {
        if (_umbracoContextAccessor.TryGetUmbracoContext(out IUmbracoContext? context) == false) { return null; }

        var product = content.AsProduct();
        if (product == null)
            return null;

        var udi = new GuidUdi("document", content.Key);

        // Get active discounts
        var discounts = _commerceApi.GetActiveDiscounts(product.StoreId);
        // string timeBasedDiscountAlias = "TimeBaseLineItemDiscountRule";
        string timeBasedDiscountAlias = "orderLineProductDiscountRule";

        var TimeBasedDiscount = discounts
            .Where(x => x.Alias == "productTimeBasedDiscount")
            .FirstOrDefault();

        if (TimeBasedDiscount == null)
            return [];

        var rewards = TimeBasedDiscount.Rewards;

        var groupedDiscountRules = TimeBasedDiscount.Rules.Children
            .Where(r => r.RuleProviderAlias == "groupDiscountRule")
            .Select(x => x);


        // Discounts rules are defined in the backoffice, so we need to find the rule that applies to the requested product
        var kvps = new List<KeyValuePair<string, string>>()
        {
            new KeyValuePair<string, string>("nodeId", udi.ToString()),
        };

        // Filter to single rule automatic discounts that are time based
        var timeBasedDiscountsOnProduct = groupedDiscountRules.Where(x =>
            x.Children.Where(c =>
                c.RuleProviderAlias == timeBasedDiscountAlias && c.Settings.ContainsAll(kvps)).Any());



        // if none found, return null
        if (discounts.Any() == false)
            return null;

        // TODO get rule provider definitions from this method.
        // IEnumerable<DiscountRuleProviderDefinition> ruleProvider = _commerceApi.GetDiscountRuleProviderDefinitions();

        // use the above kvp to find the discount that applies to the product
        // also, we are only interested in a specific rule whch applies to a line item product


        if (!timeBasedDiscountsOnProduct.Any())
        {
            return [];
        }


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
        return timeBasedDiscounts.Where(tbd => tbd.EndDate >= DateTime.Now);
    }
    // foreach (var discountItem in timeBasedDiscountsOnProduct)
    // {
    //     var dateRangeRule = discountItem.Children
    //         .FirstOrDefault(r => r.RuleProviderAlias == "DateRangeRule");

    //     var discountRuleStartDate = dateRangeRule.Settings["startDate"].TryConvertTo<DateTime>().Result;
    //     var discountRuleEndDate = dateRangeRule.Settings["endDate"].TryConvertTo<DateTime>().Result;
    //     bool isPastDiscountWindow = discountRuleEndDate <= DateTime.Now;
    //     if (isPastDiscountWindow) { continue; }
    //     //get time based discount rules for the product
    //     // var applicableRules = discountItem.Rules.Children
    //     //     .Where(r => r.RuleProviderAlias == timeBasedDiscountAlias &&
    //     //                 r.Settings.ContainsAll(kvps));

    //     // now that we have our discount, we need to only grab percentage based rewards
    //     var awardKvps = new List<KeyValuePair<string, string>>()
    //     {
    //         //new KeyValuePair<string, string>("nodeId", udi.ToString()),
    //         new KeyValuePair<string, string>("adjustmentType", "Percentage")
    //     };


    //     var contentpublished = content as IPublishedContent;
    //     var percentageReward = rewards
    //         .Where(r =>
    //         {
    //             return r.Settings.ContainsAll(awardKvps);
    //         });
    //     foreach (var reward in rewards)
    //     {
    //         if (reward != null)
    //         {
    //             var startDate = reward.Settings["startDate"].TryConvertTo<DateTime>().Result;
    //             var endDate = reward.Settings["endDate"].TryConvertTo<DateTime>().Result;
    //             // get the percentage value of the reward
    //             var pctDiscount = reward.Settings["percentage"];

    //             if (string.IsNullOrEmpty(pctDiscount) || startDate == null || endDate == null)
    //                 return null;
    //             // cast as decimal
    //             var attempt = pctDiscount.TryConvertTo<decimal>();
    //             if (attempt.Success)
    //             {
    //                 // return the discount along with it's active dates
    //                 timeBasedDiscounts.Add(new TimeBasedDiscountDto
    //                 {
    //                     StartDate = startDate,
    //                     EndDate = endDate,
    //                     Percentage = attempt.Result
    //                 });
    //             }
    //         }
    //     }
    // }
    // return timeBasedDiscounts.Where(tbd => tbd.StartDate <= DateTime.Now);

}


public class TimeBasedDiscountDto
{
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public decimal Percentage { get; set; }
}