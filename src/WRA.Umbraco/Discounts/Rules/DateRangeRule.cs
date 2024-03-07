using System.ComponentModel.DataAnnotations;
using System.Globalization;
using Umbraco.Cms.Core;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Core.Web;
using Umbraco.Commerce.Cms.Helpers;
using Umbraco.Commerce.Cms.Services;
using Umbraco.Commerce.Core.Discounts.Rewards;
using Umbraco.Commerce.Core.Discounts.Rules;
using Umbraco.Commerce.Core.Models;
using Umbraco.Commerce.Core.Services;
using Umbraco.Commerce.Extensions;

[DiscountRuleProvider("DateRangeRule", "Date Range Rule", labelView: "daterangerule")]
public class DateRangeRule : OrderLineDiscountRuleProviderBase<DateRangeRuleSettings>
{

    public override DiscountRuleResult ValidateRule(DiscountRuleContext ctx, DateRangeRuleSettings settings)
    {
        if (settings.StartDate <= DateTime.Now && settings.EndDate >= DateTime.Now)
        {
            return Fulfilled(ctx.ApplicableOrderLines);
        }
        return Unfulfilled();
    }
}
public class DateRangeRuleSettings
{

    [DiscountRuleProviderSetting(Key = "startDate",
        Name = "Line Discount Start Date",
        Description = "The Start Date for the line discount",
        View = "datepicker",
        Config = "{ dateFormat: 'yy-mm-dd', offset: true, minDate: 0 }")]
    public DateTime StartDate { get; set; } = DateTime.Now;

    [DiscountRuleProviderSetting(Key = "endDate",
        Name = "Line Discount End Date",
        Description = "The End Date for the line discount",
        View = "datepicker")]
    public DateTime EndDate { get; set; } = DateTime.Now.AddDays(2);



}
