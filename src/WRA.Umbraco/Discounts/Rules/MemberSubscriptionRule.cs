using GlobalPayments.Api.Utils;
using Umbraco.Cms.Core;
using Umbraco.Cms.Core.Security;
using Umbraco.Cms.Core.Web;
using Umbraco.Commerce.Core.Discounts.Rules;
using WRA.Umbraco.CustomTables.Subscriptions;
using WRA.Umbraco.Repositories;

namespace WRA.Umbraco.Discounts.Rules;

[DiscountRuleProvider("MemberSubscriptionRule", "Member Subscription Rule", labelView: "membersubscriptionrule")]
public class MemberSubscriptionRule(
    IMemberManager memberManager,
    IUmbracoContextFactory umbracoContextFactory,
    IRepository<MemberSubscription> memberSubscriptionRepository)
    : OrderLineDiscountRuleProviderBase<MemberSubscriptionRuleSettings>
{
    public override DiscountRuleResult ValidateRule(DiscountRuleContext context, MemberSubscriptionRuleSettings settings)
    {
        var currentMember = memberManager.GetCurrentMemberAsync();
        var ctx = umbracoContextFactory.EnsureUmbracoContext();
        var discountProductUdi = settings.DiscountProduct;
        var discountProduct = ctx.UmbracoContext.Content.GetById(discountProductUdi);

        var currentDate = DateTime.Now;
        bool validSubscriptionsOnMember = memberSubscriptionRepository.GetQueryable()
            .Any(x =>
                x.ProductId == discountProduct.Id &&
                x.MemberId == currentMember.Result.Id.ToInt32() &&
                x.BeginDate <= currentDate &&
                x.PaidThruDate >= currentDate);
        return validSubscriptionsOnMember ? Fulfilled(context.ApplicableOrderLines) : Unfulfilled();

    }
}

public class MemberSubscriptionRuleSettings
{
    [DiscountRuleProviderSetting(
        Key = "nodeId",
        Name = "Subscription Node",
        Description = "The product to discount the price of",
        View = "contentpicker",
        Config = "{ startNodeId: -1, multiPicker: false, idType: 'udi' }")]
    public Udi DiscountProduct { get; set; }

}