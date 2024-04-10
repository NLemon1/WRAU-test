using MassTransit;
using Microsoft.Extensions.Logging;
using WRA.Umbraco.Events.ServiceBusSubscriptions;

namespace WRA.Umbraco.Infrastructure.Messaging;

public interface ITopicEndpointProvider
{
    Task<ISendEndpoint?> GetSendEndpointForEntity<TEntity>();
}


public class TopicEndpointProvider(IBus bus, ILogger<TopicEndpointProvider> logger, MessagingSettings settings) : ITopicEndpointProvider

{
    public async Task<ISendEndpoint?> GetSendEndpointForEntity<TEntity>()

    {

        logger.LogInformation($"Getting send endpoint for entity type {typeof(TEntity).Name}.");

        // _settings.TryGetValue(typeof(TEntity), out MessagingSubscriptionSettings? subscriptionSettings);
        var endpointSettings = settings.EndpointSettings.Find(z => z.EntityName.Equals(typeof(TEntity).Name, StringComparison.InvariantCultureIgnoreCase));

        return await bus.GetSendEndpoint(new Uri("topic:" + endpointSettings?.SendEndpoint));
    }

}


