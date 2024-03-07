using Org.BouncyCastle.Crypto.Modes;
using Umbraco.Commerce.Core.Discounts.Rewards;
using Umbraco.Commerce.Core.Models;

[DiscountRewardProvider("timeBasedDiscountReward", "Time Based Discount Reward")]
public class TimeBasedDiscountReward : OrderLineAmountDiscountRewardProviderBase<TimeBasedDiscountRewardSettings>
{
    public override DiscountRewardCalculation CalculateReward(DiscountRewardContext ctx, TimeBasedDiscountRewardSettings settings)
    {
        if (settings.StartDate <= DateTime.Now && settings.EndDate >= DateTime.Now)
        {
            return base.CalculateReward(ctx, settings);
        }
        return new DiscountRewardCalculation();

    }

    public override IEnumerable<OrderLineReadOnly> FilterOrderLines(DiscountRewardContext ctx, TimeBasedDiscountRewardSettings settings)
    {
        return ctx.OrderLines;
    }
}

public class TimeBasedDiscountRewardSettings : OrderLineAmountDiscountRewardProviderSettingsBase
{

    [DiscountRewardProviderSetting(Key = "startDate",
        Name = "Line Discount Start Date",
        Description = "The Start Date for the line discount",
        View = "datepicker",
        Config = "{ dateFormat: 'yy-mm-dd', offset: true, minDate: 0 }")]
    public DateTime StartDate { get; set; } = DateTime.Now;

    [DiscountRewardProviderSetting(Key = "endDate",
        Name = "Line Discount End Date",
        Description = "The End Date for the line discount",
        View = "datepicker")]
    public DateTime EndDate { get; set; } = DateTime.Now.AddDays(2);
}
