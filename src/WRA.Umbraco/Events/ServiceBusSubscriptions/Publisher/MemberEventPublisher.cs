using Microsoft.Extensions.Logging;
using Umbraco.Cms.Core.Mapping;
using WRA.Umbraco.Dtos;
using WRA.Umbraco.Infrastructure.Messaging;

namespace WRA.Umbraco.Events.ServiceBusSubscriptions.Publisher;

public class MemberEventPublisher(
    ILogger<MemberEventPublisher> logger,
    TopicEndpointProvider topicEndpointProvider,
    IUmbracoMapper mapper)
{
    public async Task Send(MemberDto member)
    {
        var endpoint = await topicEndpointProvider.GetSendEndpointForEntity<MemberEvent>();
        if(endpoint == null) {logger.LogError("Cannot send message, topic endpoint null...");
            return;
        };
        var memberEntity = mapper.Map<MemberEvent>(member);
        logger.LogInformation("Sending member to hub...");
        if (memberEntity != null) await endpoint?.Send(memberEntity)!;
        await Task.CompletedTask;
    }

}