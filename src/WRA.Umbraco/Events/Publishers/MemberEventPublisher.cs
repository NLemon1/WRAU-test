using MassTransit;
using Microsoft.Extensions.Logging;
using WRA.Umbraco.Contracts;
using WRA.Umbraco.Shared.Messaging;
using EntityEventAction = WRA.Umbraco.Contracts.EntityEventAction;

namespace WRA.Umbraco.Events.Publishers;

public class MemberEventPublisher(
    MessagingSettings messagingSettings,
    ILogger<MemberEventPublisher> logger,
    IPublishEndpoint publishEndpoint)
{
    public async Task Send(MemberEvent member, EntityEventAction action)
    {
        var endpointSettings = messagingSettings.GetEndPointSettings<MemberEvent>();
        if (endpointSettings == null)
        {
            logger.LogError("Cannot send message, topic endpoint null...");
            return;
        }

        if (endpointSettings is { Enabled: true })
        {
            logger.LogInformation("Sending member to hub...");
            var memberEntityEvent = new EntityEvent<MemberEvent>(
                EntityEventSource.UmbracoCloud,
                EntityEventSource.UmbracoCloud,
                action,
                member,
                Guid.NewGuid(),
                Guid.NewGuid());

            await publishEndpoint.Publish(
                memberEntityEvent,
                context =>
                {
                    context.InitiatorId = context.MessageId;
                    context.Headers.Set(MessageHeader.MessageType, typeof(MemberEvent).Name);
                    context.Headers.Set(MessageHeader.Action, memberEntityEvent.Action.ToString());
                    context.Headers.Set(MessageHeader.Source, memberEntityEvent.Source.ToString());
                    context.Headers.Set(MessageHeader.Originator, memberEntityEvent.Originator.ToString());
                    context.Headers.Set(MessageHeader.CorrelationId, memberEntityEvent.CorrelationId.ToString());
                    context.Headers.Set(MessageHeader.EntityId, memberEntityEvent.EventId);
                    context.Headers.Set(MessageHeader.Timestamp, DateTime.UtcNow.ToString("o"));
                },
                new CancellationToken());
        }
    }
}