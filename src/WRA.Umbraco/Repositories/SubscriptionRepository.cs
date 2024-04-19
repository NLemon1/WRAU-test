// using Umbraco.Cms.Core.Models;
// using Umbraco.Cms.Core.Services;
// using Umbraco.Cms.Infrastructure.PublishedCache;
// using WRA.Umbraco.Dtos;
// using WRA.Umbraco.Models;
//
// namespace WRA.Umbraco.Helpers;
//
// public class SubscriptionRepository(ContentService contentService,
//     IMemberService memberService
//     )
// {
//     public IContent CreateActiveCompanySubscription(WraCompanySubscriptionDto request, ContentCache contentCache)
//     {
//         var siteRoot = contentCache?.GetAtRoot().FirstOrDefault();
//
//         var ActiveSubscriptionsContainer = siteRoot?.Children
//             .FirstOrDefault(x => x.ContentType.Alias == ActiveSubscriptions.ModelTypeAlias);
//
//         var existingSubscription = siteRoot?.Children
//             .Where(x => x.ContentType.Alias == CompanySubscription.ModelTypeAlias)?
//             .FirstOrDefault(x => x.Value("externalId") == request.Id);
//
//         bool subscriptionExists = existingSubscription != null;
//
//         var subscription = subscriptionExists ?
//             existingSubscription as IContent :
//             contentService.Create(
//                 request.ProductName,
//                 ActiveSubscriptionsContainer.Id,
//                 CompanySubscription.ModelTypeAlias);
//
//         // var subscriptionCompany = CompanyHelper.GetCompany(request.CompanyId, contentCache) ??
//         //     throw new InvalidOperationException("Company does not exist in Umbraco.");
//
//         // var subscriptionProduct = GetProductById(request.ProductId) ??
//         //     throw new InvalidOperationException("Product does not exist in Umbraco.");
//
//         // subscription.SetValue("externalId", request.Id);
//         // subscription.SetValue("company", subscriptionCompany.GetUdi());
//         // subscription.SetValue("subscriptionProduct", subscriptionProduct.GetUdi());
//         // subscription.SetValue("beginDate", request.BeginDate);
//         // subscription.SetValue("paidThrough", request.PaidThru);
//         // subscription.SetValue("status", request.Status);
//
//         contentService.SaveAndPublish(subscription);
//
//         return subscription;
//     }
//
//     // public async Task<IContent> CreateMemberSubscription(WraMemberSubscriptionDto request)
//     // {
//     //     var contentCache = GetContentCache();
//     //     var siteRoot = contentCache?.GetAtRoot().FirstOrDefault();
//     //
//     //     var ActiveSubscriptionsContainer = siteRoot.Children
//     //         .FirstOrDefault(x => x.ContentType.Alias == ActiveSubscriptions.ModelTypeAlias);
//     //
//     //     var existingSubscription = siteRoot.Children
//     //         .Where(x => x.ContentType.Alias == MemberSubscription.ModelTypeAlias)?
//     //         .FirstOrDefault(x => x.Value("externalId") == request.Id);
//     //
//     //     bool subscriptionExists = existingSubscription != null;
//     //
//     //     var subscription = subscriptionExists ?
//     //         existingSubscription as IContent :
//     //         contentService.Create(
//     //             request.ProductName,
//     //             ActiveSubscriptionsContainer.Id,
//     //             MemberSubscription.ModelTypeAlias);
//     //
//     //     var subscriptionMember = memberService.GetAllMembers().FirstOrDefault(m => m.GetValue("externalId").Equals(request.MemberId)) ??
//     //         throw new InvalidOperationException("Member does not exist in Umbraco.");
//     //     var subscriptionProduct = GetProductById(request.ProductId) ??
//     //         throw new InvalidOperationException("Product does not exist in Umbraco.");
//     //     subscription.SetValue("externalId", request.Id);
//     //     subscription.SetValue("member", subscriptionMember.GetUdi());
//     //     subscription.SetValue("subscriptionProduct", subscriptionProduct.GetUdi());
//     //     subscription.SetValue("beginDate", request.BeginDate);
//     //     subscription.SetValue("paidThrough", request.PaidThru);
//     //     subscription.SetValue("status", request.Status);
//     //
//     //     contentService.SaveAndPublish(subscription);
//     //
//     //     return subscription;
//     // }
// }