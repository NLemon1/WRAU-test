using MassTransit;
using Microsoft.Extensions.Logging;
using WRA.Umbraco.Contracts;
using WRA.Umbraco.Shared.Messaging;
using EntityEventAction = WRA.Umbraco.Contracts.EntityEventAction;

namespace WRA.Umbraco.Events.Publishers;

public class ProductEventPublisher(
    MessagingSettings messagingSettings,
    ILogger<ProductEventPublisher> logger,
    IPublishEndpoint publishEndpoint)
{
    public async Task Send(ProductEvent product)
    {
        var endpointSettings = messagingSettings.GetEndPointSettings<ProductEvent>();
        if (endpointSettings == null)
        {
            logger.LogError("Cannot send message, topic endpoint null...");
            return;
        }

        if (endpointSettings is { Enabled: true })
        {
            logger.LogInformation("Sending product to hub...");
            var productEntityEvent = new EntityEvent<ProductEvent>(
                EntityEventSource.UmbracoCloud,
                EntityEventSource.UmbracoCloud,
                EntityEventAction.Update,
                product,
                Guid.NewGuid(),
                Guid.NewGuid());

            if (product != null) await publishEndpoint.Publish(productEntityEvent);
        }
    }
}
