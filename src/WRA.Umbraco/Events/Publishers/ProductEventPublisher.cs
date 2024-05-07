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
    public async Task Send(ProductEvent product, EntityEventAction action)
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
                action,
                product,
                Guid.NewGuid(),
                Guid.NewGuid());

            await publishEndpoint.Publish(
                productEntityEvent,
                context =>
                {
                    context.InitiatorId = context.MessageId;
                    context.Headers.Set(MessageHeader.MessageType, typeof(MemberEvent).Name);
                    context.Headers.Set(MessageHeader.Action, productEntityEvent.Action.ToString());
                    context.Headers.Set(MessageHeader.Source, productEntityEvent.Source.ToString());
                    context.Headers.Set(MessageHeader.Originator, productEntityEvent.Originator.ToString());
                    context.Headers.Set(MessageHeader.CorrelationId, productEntityEvent.CorrelationId.ToString());
                    context.Headers.Set(MessageHeader.EntityId, productEntityEvent.EventId);
                    context.Headers.Set(MessageHeader.Timestamp, DateTime.UtcNow.ToString("o"));
                });
        }
    }
}
