using Umbraco.Cms.Core.Cache;
using Umbraco.Cms.Core.Composing;
using Umbraco.Cms.Core.Events;
using Umbraco.Cms.Core.Notifications;
using Umbraco.Cms.Core.Models;
using WRA.Umbraco.Services.Caching;
using Microsoft.Extensions.Logging;
using WRA.Umbraco.Exceptions;

namespace WRA.Umbraco.Composers;

[ComposeAfter(typeof(CustomServiceComposer))]
public class CacheEventHandlerComposer : IComposer
{
    public void Compose(IUmbracoBuilder builder)
    {
        builder.AddNotificationHandler<ContentPublishedNotification, ContentPublishedCacheNotificationHandler>();
        builder.AddNotificationHandler<MemberSavedNotification, MemberSavedCacheNotificationHandler>();
    }
}

// Handles cache invalidation when content is published
public class ContentPublishedCacheNotificationHandler(AppCaches appCaches, ICacheKeyProvider cacheKeyProvider, ILogger<ContentPublishedCacheNotificationHandler> logger) : INotificationHandler<ContentPublishedNotification>
{
    private readonly AppCaches _appCaches = appCaches ?? throw new ArgumentNullException(nameof(appCaches));
    private readonly ICacheKeyProvider _cacheKeyProvider = cacheKeyProvider ?? throw new ArgumentNullException(nameof(cacheKeyProvider));
    private readonly ILogger<ContentPublishedCacheNotificationHandler> _logger = logger ?? throw new ArgumentNullException(nameof(logger));

    public void Handle(ContentPublishedNotification notification)
    {
        // List of exceptions we encounter during the cache invalidation.
        List<Exception> errorLog = [];

        // Loop through all published entities and invalidate cache for each one.
        foreach (IContent content in notification.PublishedEntities)
        {
            try
            {
                // If content is null just skip to next iteration of the loop.
                if (content is null) continue;

                // Retrieve cache key for content type and id.
                string cacheKey = _cacheKeyProvider.GetCacheKey(content.GetType(), content.Id);

                // If we can't get a valid cache key just skip to the next iteration of the loop.
                if (string.IsNullOrEmpty(cacheKey)) continue;

                // Clear keys that start with the primary key of the content.
                _appCaches.RuntimeCache.ClearByKey(cacheKey);
            }
            catch (Exception ex)
            {
                // Log the exception and continue to the next iteration of the loop.
                CacheInvalidationException cacheInvalidationException = new($"Failed to invalidate cache for published {typeof(IContent)} {content.Id}.", content, ex);

                _logger.LogError(cacheInvalidationException, "Failed to invalidate cache for published content. {Id}.", content.Id);

                // Create a list of exceptions to log at the end of the method.
                errorLog.Add(cacheInvalidationException);

                // Continue to next content item.
                continue;
            }
        }

        if (errorLog.Count != 0)
        {
            var ex = new AggregateException($"Failed to fully invalidate the cache while processing {typeof(ContentPublishedNotification)}.", errorLog);
            _logger.LogError(ex, "Failed to invalidate cache for published content Notification. {Notification}.", notification.ToString());
            throw ex;
        }
    }
}

// Handles cache invalidation when a member is saved
public class MemberSavedCacheNotificationHandler(AppCaches appCaches, ICacheKeyProvider cacheKeyProvider, ILogger<MemberSavedCacheNotificationHandler> logger) : INotificationHandler<MemberSavedNotification>
{
    private readonly AppCaches _appCaches = appCaches ?? throw new ArgumentNullException(nameof(appCaches));
    private readonly ICacheKeyProvider _cacheKeyProvider = cacheKeyProvider ?? throw new ArgumentNullException(nameof(cacheKeyProvider));
    private readonly ILogger<MemberSavedCacheNotificationHandler> _logger = logger ?? throw new ArgumentNullException(nameof(logger));

    public void Handle(MemberSavedNotification notification)
    {
        // List of exceptions we encounter during the cache invalidation.
        List<Exception> errorLog = [];

        // Loop through all published entities and invalidate cache for each one.
        foreach (IMember member in notification.SavedEntities)
        {
            try
            {
                // If content is null just skip to next iteration of the loop.
                if (member is null) continue;

                // Retrieve cache key for content type and id.
                string cacheKey = _cacheKeyProvider.GetCacheKey(member.GetType(), member.Id);

                // If we can't get a valid cache key just skip to the next iteration of the loop.
                if (string.IsNullOrEmpty(cacheKey)) continue;

                // Clear keys that start with the primary key of the content.
                _appCaches.RuntimeCache.ClearByKey(cacheKey);
            }
            catch (Exception ex)
            {
                // Log the exception and continue to the next iteration of the loop.
                CacheInvalidationException cacheInvalidationException = new($"Failed to invalidate cache for saved {typeof(IMember)}. {member.Id}.", member, ex);

                _logger.LogError(cacheInvalidationException, "Failed to invalidate cache for saved IMember. {Id}.", member.Id);

                // Create a list of exceptions to log at the end of the method.
                errorLog.Add(cacheInvalidationException);

                // Continue to next IMember.
                continue;
            }

            if (errorLog.Count != 0)
            {
                var ex = new AggregateException($"Failed to fully invalidate the cache while processing ${typeof(MemberSavedNotification)}.", errorLog);
                _logger.LogError(ex, "Failed to invalidate cache for published content Notification. {Notification}.", notification.ToString());
                throw ex;
            }
        }
    }
}
