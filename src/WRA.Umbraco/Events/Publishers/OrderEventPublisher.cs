using MassTransit;
using Microsoft.Extensions.Logging;
using NPoco.FluentMappings;
using Umbraco.Cms.Core.Mapping;
using Umbraco.Commerce.Core.Models;
using WRA.Umbraco.Contracts;
using WRA.Umbraco.Shared.Messaging;
using WRA.Umbraco.Web.Dtos.External;
using EntityEventAction = WRA.Umbraco.Contracts.EntityEventAction;

namespace WRA.Umbraco.Events.Publishers;

public class OrderEventPublisher(
    MessagingSettings messagingSettings,
    IUmbracoMapper mapper,
    ILogger<OrderEventPublisher> logger,
    IPublishEndpoint publishEndpoint)
{
    public async Task Send(OrderReadOnly order, EntityEventAction action)
    {
        var orderEvent = mapper.Map<OrderEvent>(order);
        if (orderEvent != null) _ = Send(orderEvent, action);
    }

    public async Task Send(OrderEvent order, EntityEventAction action)
    {
        var endpointSettings = messagingSettings.GetEndPointSettings<OrderEvent>();
        switch (endpointSettings)
        {
            case null:
                logger.LogError("Cannot send message, topic endpoint null...");
                return;
            case { Enabled: true }:
            {
                logger.LogInformation("Sending order to hub...");
                var orderEntityEvent = new EntityEvent<OrderEvent>(
                    EntityEventSource.UmbracoCloud,
                    EntityEventSource.UmbracoCloud,
                    action,
                    order,
                    Guid.NewGuid(),
                    Guid.NewGuid());

                await publishEndpoint.Publish(
                    orderEntityEvent,
                    context =>
                    {
                        context.InitiatorId = context.MessageId;
                        context.Headers.Set(MessageHeader.MessageType, typeof(OrderEvent).Name);
                        context.Headers.Set(MessageHeader.Action, orderEntityEvent.Action.ToString());
                        context.Headers.Set(MessageHeader.Source, orderEntityEvent.Source.ToString());
                        context.Headers.Set(MessageHeader.Originator, orderEntityEvent.Originator.ToString());
                        context.Headers.Set(MessageHeader.CorrelationId, orderEntityEvent.CorrelationId.ToString());
                        context.Headers.Set(MessageHeader.EntityId, orderEntityEvent.EventId);
                        context.Headers.Set(MessageHeader.Timestamp, DateTime.UtcNow.ToString("o"));
                    },
                    new CancellationToken());
                break;
            }
        }
    }
}