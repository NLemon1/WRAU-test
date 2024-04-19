using Umbraco.Commerce.Core.Discounts.Rules;

namespace WRA.Umbraco.Discounts.Rules;

[DiscountRuleProvider("DateRangeRule", "Date Range Rule", labelView: "daterangerule")]
public class DateRangeRule : OrderLineDiscountRuleProviderBase<DateRangeRuleSettings>
{
    public override DiscountRuleResult ValidateRule(DiscountRuleContext context, DateRangeRuleSettings settings)
    {
        if (settings.StartDate <= DateTime.Now && settings.EndDate >= DateTime.Now)
        {
            return Fulfilled(context.ApplicableOrderLines);
        }

        return Unfulfilled();
    }
}

public class DateRangeRuleSettings
{
    [DiscountRuleProviderSetting(Key = "startDate", Name = "Line Discount Start Date", Description = "The Start Date for the line discount", View = "datepicker", Config = "{ dateFormat: 'yy-mm-dd', offset: true, minDate: 0 }")]
    public DateTime StartDate { get; set; } = DateTime.Now;

    [DiscountRuleProviderSetting(Key = "endDate", Name = "Line Discount End Date", Description = "The End Date for the line discount", View = "datepicker")]
    public DateTime EndDate { get; set; } = DateTime.Now.AddDays(2);
}