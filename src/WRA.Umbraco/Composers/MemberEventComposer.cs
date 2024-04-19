// using Mapster;
// using MassTransit;
// using Microsoft.Extensions.Logging;
// using System;
// using System.Collections.Generic;
// using System.Linq;
// using System.Text;
// using System.Threading.Tasks;
// using Umbraco.Cms.Core.Cache;
// using Umbraco.Cms.Core.Composing;
// using Umbraco.Cms.Core.Events;
// using Umbraco.Cms.Core.Models;
// using Umbraco.Cms.Core.Notifications;
// using WRA.Umbraco.Contracts;
// using WRA.Umbraco.Contracts.Member;
// using WRA.Umbraco.Exceptions;
// using WRA.Umbraco.Extensions;
// using WRA.Umbraco.Services.Caching;
// using WRA.Umbraco.Shared.Messaging;
//
// namespace WRA.Umbraco.Composers;
//
// [ComposeAfter(typeof(CustomServiceComposer))]
// public class MemberEventComposer : IComposer
// {
//     public void Compose(IUmbracoBuilder builder)
//     {
//         builder.AddNotificationHandler<MemberSavedNotification, MemberSavedServiceBusPublisher>();
//     }
// }
//
// public class MemberSavedServiceBusPublisher(AppCaches appCaches, ICacheKeyProvider cacheKeyProvider, ILogger<MemberSavedServiceBusPublisher> logger, IPublishEndpoint publishEndpoint) : INotificationHandler<MemberSavedNotification>
// {
//     private readonly AppCaches _appCaches = appCaches ?? throw new ArgumentNullException(nameof(appCaches));
//     private readonly ICacheKeyProvider _cacheKeyProvider = cacheKeyProvider ?? throw new ArgumentNullException(nameof(cacheKeyProvider));
//     private readonly ILogger<MemberSavedServiceBusPublisher> _logger = logger ?? throw new ArgumentNullException(nameof(logger));
//     private readonly IPublishEndpoint _publishEndpoint = publishEndpoint ?? throw new ArgumentNullException(nameof(publishEndpoint));
//
//     public async void Handle(MemberSavedNotification notification)
//     {
//         // List of exceptions we encounter during the cache invalidation.
//         List<Exception> errorLog = [];
//
//         // Loop through all published entities and invalidate cache for each one.
//         foreach (IMember member in notification.SavedEntities)
//         {
//             try
//             {
//                 // If content is null just skip to next iteration of the loop.
//                 if (member is null) continue;
//
//                 // Retrieve cache key for content type and id.
//                 string cacheKey = _cacheKeyProvider.GetCacheKey(member.GetType(), member.Id);
//
//                 var memberEvent = member.Adapt<MemberEvent>();
//
//                 IEntityEvent<MemberEvent> memberEntityEvent = new EntityEvent<MemberEvent>(EntityEventSource.UmbracoCloud, EntityEventSource.UmbracoCloud, EntityEventAction.Updated, memberEvent, Guid.NewGuid(), Guid.NewGuid());
//
//                 await publishEndpoint.Publish<IEntityEvent<MemberEvent>>(memberEntityEvent, context =>
//                 {
//                     context.Headers.Set(MessageHeader.MessageType, typeof(IEntityEvent<MemberEvent>).GetGenericTypeName());
//                     context.Headers.Set(MessageHeader.Action, EntityEventAction.Updated);
//                     context.Headers.Set(MessageHeader.Source, EntityEventSource.UmbracoIntegration);
//                     context.Headers.Set(MessageHeader.CorrelationId, Guid.NewGuid().ToString());
//                     context.Headers.Set(MessageHeader.Timestamp, DateTime.UtcNow.ToString("o"));
//                     context.Headers.Set(MessageHeader.EntityId, Guid.NewGuid().ToString());
//                 });
//             }
//             catch (Exception ex)
//             {
//                 // Log the exception and continue to the next iteration of the loop.
//                 CacheInvalidationException cacheInvalidationException = new($"Failed to invalidate cache for published {typeof(IMember)} {member.Id}.", member, ex);
//
//                 _logger.LogError(cacheInvalidationException, "Failed to invalidate cache for published content. {Id}.", member.Id);
//
//                 // Create a list of exceptions to log at the end of the method.
//                 errorLog.Add(cacheInvalidationException);
//             }
//         }
//     }
// }