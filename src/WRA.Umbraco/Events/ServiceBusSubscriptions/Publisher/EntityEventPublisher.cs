using MassTransit;
using Microsoft.Extensions.Logging;
using WRA.Umbraco.Infrastructure.Messaging;
using WRA.Umbraco.Contracts;


public class EntityEventPublisher<TEvent, TEntity>
   where TEvent : IEntityEvent<TEntity>
   where TEntity : IMember

{
    readonly ITopicEndpointProvider _topicEndpointProvider;
    private readonly ISubscriptionServiceSettings _subscriptionServiceSettings;
    private readonly ILogger<EntityEventPublisher<TEvent, TEntity>> _logger;


    public EntityEventPublisher(
        ISubscriptionServiceSettings subscriptionServiceSettings,
        ILogger<EntityEventPublisher<TEvent, TEntity>> logger,
        ISendEndpointProvider sendEndpointProvider)
    {
        _subscriptionServiceSettings = subscriptionServiceSettings;
        _logger = logger;
    }
    // public async Task SendOrder(ISendEndpointProvider sendEndpointProvider)
    // {
    //     var endpoint = await sendEndpointProvider.GetSendEndpoint(_subscriptionServiceSettings.SubscriptionEndpoint);

    //     await endpoint.Send(new SubmitOrder { OrderId = "123" });
    // }

    public async Task SendEntity(TEvent notification, CancellationToken cancellationToken)
    {
        // assume member
        var subscription = _subscriptionServiceSettings.SubscriptionEndpoint;
        try
        {


            // var entityEvent = new IEntityEvent<>()
            // {
            //     Entity = notification.Entity,
            //     EventType = notification.EventType
            // };


            var topicEndpoint = await _topicEndpointProvider.GetSendEndpointForEntity<TEntity>();
            var topicUri = new Uri("topic:" + _subscriptionServiceSettings.TopicName);
            // var endpoint = await _bus.GetSendEndpoint(new Uri("topic:" + _subscriptionServiceSettings.TopicName));


            // await topicEndpoint.Send(entityEvent);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Unexpected error occurred while sending entity event to service bus.");
            throw;
        }
    }
}
