using Microsoft.Extensions.Logging;
using Umbraco.Cms.Core.Cache;
using Umbraco.Cms.Core.Events;
using Umbraco.Cms.Core.Mapping;
using Umbraco.Cms.Core.Models;
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
                HandleProductEvent(publishedEntity);
            }

            if (publishedEntity.ContentType.Alias is CategoriesPage.ModelTypeAlias or CategoryPage.ModelTypeAlias)
            {
                runtimeCache.ClearByKey(publishedEntity.ContentType.Id.ToString());
                runtimeCache.ClearOfType(typeof(CategoriesPage));
                runtimeCache.ClearOfType(typeof(CategoryPage));
            }
        }
    }

    private async void HandleProductEvent(IContent publishedEntity)
    {
        try
        {
            var externalId = publishedEntity.GetValue<string>(GlobalAliases.ExternalId);
            if (string.IsNullOrEmpty(externalId))
            {
                var productCreateEvent = mapper.Map<ProductEvent>(publishedEntity);
                if (productCreateEvent == null) return;
                await productEventPublisher.Send(productCreateEvent, EntityEventAction.Create);
                logger.LogInformation("Message sent for product: {Product} - {Sku}", productCreateEvent.Id, productCreateEvent.Sku);
            }
            else
            {
                var productUpdateEvent = mapper.Map<ProductEvent>(publishedEntity);
                if (productUpdateEvent == null) return;
                await productEventPublisher.Send(productUpdateEvent, EntityEventAction.Update);
                logger.LogInformation("Message sent for product: {Product} - {Sku}", productUpdateEvent.Id, productUpdateEvent.Sku);
            }
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }
}