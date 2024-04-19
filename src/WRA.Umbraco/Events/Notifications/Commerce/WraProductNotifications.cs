using Microsoft.Extensions.Logging;
using Umbraco.Cms.Core.Cache;
using Umbraco.Cms.Core.Events;
using Umbraco.Cms.Core.Mapping;
using Umbraco.Cms.Core.Notifications;
using WRA.Umbraco.Contracts;
using WRA.Umbraco.Events.Publishers;
using WRA.Umbraco.Models;

namespace WRA.Umbraco.Events.Notifications.Commerce;

public class WraProductNotifications(
    ILogger<WraProductNotifications> logger,
    ProductEventPublisher productEventPublisher,
    IUmbracoMapper mapper,
    AppCaches appCaches)
    : INotificationHandler<ContentPublishedNotification>
{
    public async void Handle(ContentPublishedNotification notification)
    {
        ArgumentNullException.ThrowIfNull(notification);

        var runtimeCache = appCaches.RuntimeCache;
        foreach (var publishedEntity in notification.PublishedEntities)
        {
            if (publishedEntity.ContentType.Alias == ProductPage.ModelTypeAlias)
            {
                var productEvent = mapper.Map<ProductEvent>(publishedEntity);
                if (productEvent == null) continue;
                await productEventPublisher.Send(productEvent);
                logger.LogInformation("Message sent for product: {Product} - {Sku}", productEvent.Id, productEvent.Sku);
                runtimeCache.ClearByKey(productEvent.Id.ToString());
                runtimeCache.ClearOfType<ProductPage>();
            }

            if (publishedEntity.ContentType.Alias is CategoriesPage.ModelTypeAlias or CategoryPage.ModelTypeAlias)
            {
                runtimeCache.ClearByKey(publishedEntity.ContentType.Id.ToString());
                runtimeCache.ClearOfType(typeof(CategoriesPage));
                runtimeCache.ClearOfType(typeof(CategoryPage));
            }
        }
    }
}