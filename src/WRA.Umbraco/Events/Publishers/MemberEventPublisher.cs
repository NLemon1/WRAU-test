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
    public async Task Send(MemberEvent member)
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
                EntityEventAction.Update,
                member,
                Guid.NewGuid(),
                Guid.NewGuid());

            await publishEndpoint.Publish(memberEntityEvent);
        }
    }
}