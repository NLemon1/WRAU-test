using System.ComponentModel.DataAnnotations;
using Umbraco.Cms.Core;
using Umbraco.Commerce.Core.Discounts.Rewards;
using Umbraco.Commerce.Core.Discounts.Rules;
using Umbraco.Commerce.Core.Models;

[DiscountRuleProvider("TimeBaseLineItemDiscountRule", "Time Based Discount Rule", labelView: "timebaselineitemdiscountrule")]
public class TimeBaseLineItemDiscountRule : OrderDiscountRuleProviderBase<TimeBaseLineItemDiscountSettings>
{
    public override DiscountRuleResult ValidateRule(DiscountRuleContext ctx, TimeBaseLineItemDiscountSettings settings)
    {

        // foreach (var lineItem in ctx.ApplicableOrderLines)
        // {
        //     var currentDateTime = DateTime.Now;
        //     bool dateWithtinRage = currentDateTime >= settings.StartDate && currentDateTime <= settings.EndDate;
        //     if (dateWithtinRage)
        //     {
        //         return Fulfilled();
        //     }
        // }
        var currentDateTime = DateTime.Now;
        bool dateWithtinRage = currentDateTime >= settings.StartDate && currentDateTime <= settings.EndDate;
        if (dateWithtinRage)
        {
            return Fulfilled();
        }

        return Unfulfilled();
    }
}

public class TimeBaseLineItemDiscountSettings
{
    [DiscountRuleProviderSetting(Key = "nodeId",
        Name = "Product Node",
        Description = "The product to discount the price of",
        View = "contentpicker",
        Config = "{ startNodeId: -1, multiPicker: false, idType: 'udi' }"),]
    public Udi NodeId { get; set; }

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
