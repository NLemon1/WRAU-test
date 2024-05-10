// using GlobalPayments.Api.Utils;
// using Umbraco.Cms.Core;
// using Umbraco.Cms.Core.Security;
// using Umbraco.Cms.Core.Services;
// using Umbraco.Cms.Core.Web;
// using Umbraco.Commerce.Core.Discounts.Rules;
// using WRA.Umbraco.CustomTables.Subscriptions;
// using WRA.Umbraco.Repositories;
//
// namespace WRA.Umbraco.Discounts.Rules;
//
// [DiscountRuleProvider("CompanySubscriptionRule", "Company Subscription Rule", labelView: "companysubscriptionrule")]
// public class CompanySubscriptionRule(
//     IMemberManager memberManager,
//     IMemberService memberService,
//     IUmbracoContextFactory umbracoContextFactory,
//     IContentService contentService,
//     CompanyRepository companyRepository,
//     IRepository<CompanySubscription> memberSubscriptionRepository)
//     : OrderLineDiscountRuleProviderBase<MemberSubscriptionRuleSettings>
// {
//     public override DiscountRuleResult ValidateRule(DiscountRuleContext context, MemberSubscriptionRuleSettings settings)
//     {
//         // var currentMember = memberManager.GetCurrentMemberAsync();
//         // var member = memberService.GetByKey(currentMember.Result.Key);
//         // var memberCompany = member.GetValue<Udi>("company");
//         //
//         // var company = contentService.GetById(memberCompany)
//         // var ctx = umbracoContextFactory.EnsureUmbracoContext();
//         // var discountProductUdi = settings.DiscountProduct;
//         // var discountProduct = ctx.UmbracoContext.Content.GetById(discountProductUdi);
//         //
//         // var currentDate = DateTime.Now;
//         // bool validSubscriptionsOnMember = memberSubscriptionRepository.GetQueryable()
//         //     .Any(x =>
//         //         x.ProductId == discountProduct.Id &&
//         //         x.CompanyId == currentMember.Result.Id.ToInt32() &&
//         //         x.BeginDate <= currentDate &&
//         //         x.PaidThruDate >= currentDate);
//         // return validSubscriptionsOnMember ? Fulfilled(context.ApplicableOrderLines) : Unfulfilled();
//
//     }
// }
//
// public class CompanySubscriptionRuleSettings
// {
//     [DiscountRuleProviderSetting(
//         Key = "nodeId",
//         Name = "Subscription Node",
//         Description = "The Subscription Product",
//         View = "contentpicker",
//         Config = "{ startNodeId: -1, multiPicker: false, idType: 'udi' }")]
//     public Udi DiscountProduct { get; set; }
//
// }