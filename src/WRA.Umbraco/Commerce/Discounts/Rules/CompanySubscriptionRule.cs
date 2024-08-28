using GlobalPayments.Api.Utils;
using Microsoft.Extensions.DependencyInjection;
using Umbraco.Cms.Core;
using Umbraco.Cms.Core.Security;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Core.Web;
using Umbraco.Commerce.Core.Discounts.Rules;
using WRA.Umbraco.CustomTables.Subscriptions;
using WRA.Umbraco.Extensions;
using WRA.Umbraco.Repositories;

namespace WRA.Umbraco.Discounts.Rules;

[DiscountRuleProvider("CompanySubscriptionRule", "Company Subscription Rule", labelView: "companysubscriptionrule")]
public class CompanySubscriptionRule(
    IMemberService memberService,
    IUmbracoContextFactory umbracoContextFactory,
    IServiceScopeFactory serviceScopeFactory)
    : OrderLineDiscountRuleProviderBase<MemberSubscriptionRuleSettings>
{
    public override DiscountRuleResult ValidateRule(DiscountRuleContext context, MemberSubscriptionRuleSettings settings)
    {
        using var umbracoContextReference = umbracoContextFactory.EnsureUmbracoContext();
        var contentQuery = umbracoContextReference.UmbracoContext.Content;
        using var scope = serviceScopeFactory.CreateScope();

        // get current member
        var memberManager = scope.ServiceProvider.GetRequiredService<IMemberManager>();
        var currentMember = memberManager.GetCurrentMemberAsync();
        if (currentMember?.Result == null) return Unfulfilled();
        var member = memberService.GetByKey(currentMember.Result.Key);

        // get company member belongs to
        string? memberCompany = member.GetValue<string>("company");
        if (memberCompany == null) return Unfulfilled();

        var contentUdi = memberCompany.GetUdi();
        if (contentUdi == null) return Unfulfilled();

        // get company node
        var companyNode = contentQuery.GetById(contentUdi);

        if (settings?.DiscountProduct == null) return Unfulfilled();

        // get discount node
        var discountProduct = contentQuery.GetById(settings.DiscountProduct);

        var currentDate = DateTime.Now;
        var memberSubscriptionRepository = StaticServiceProvider.Instance.GetService<IRepository<CompanySubscription>>();
        bool validSubscriptionsOnMember = memberSubscriptionRepository.GetAll()
            .Any(x =>
                x.ProductId == discountProduct.Id &&
                x.CompanyId == companyNode.Id &&
                x.BeginDate <= currentDate &&
                x.PaidThruDate >= currentDate);
        return validSubscriptionsOnMember ? Fulfilled(context.ApplicableOrderLines) : Unfulfilled();
    }
}

public class CompanySubscriptionRuleSettings
{
    [DiscountRuleProviderSetting(
        Key = "nodeId",
        Name = "Subscription Node",
        Description = "The Subscription Product",
        View = "contentpicker",
        Config = "{ startNodeId: -1, multiPicker: false, idType: 'udi' }")]
    public Udi? DiscountProduct { get; set; }

}