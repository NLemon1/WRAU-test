
using System.Text;
using System.Text.Json;
using Azure.Messaging.ServiceBus;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace WRA.Umbraco.Services;
public class QueueService
{
    private readonly ILogger<QueueService> _logger;
    private readonly IConfiguration _config;
    // the client that owns the connection and can be used to create senders and receivers
    ServiceBusClient client;

    // the sender used to publish messages to the queue
    ServiceBusSender sender;

    // number of messages to be sent to the queue
    const int numOfMessages = 3;

    public QueueService(IConfiguration config, ILogger<QueueService> logger)
    {
        _config = config;
        _logger = logger;
    }

    public async Task SendMessage<T>(T serviceBusMessage, string topicName)
    {
        var clientOptions = new ServiceBusClientOptions()
        {
            TransportType = ServiceBusTransportType.AmqpWebSockets
        };
        _logger.LogInformation("Sending message to Azure Service Bus");

        // client = new ServiceBusClient(_config.GetConnectionString("AzureServiceBus"), clientOptions);
        // //MembersFromUmbraco Subscription
        // sender = client.CreateSender(topicName);

        // var messageBody = JsonSerializer.Serialize(serviceBusMessage);
        // // aparently speeds things up quite a bit.
        // var message = Encoding.UTF8.GetBytes(messageBody);
        // await sender.SendMessageAsync(new ServiceBusMessage(message));
    }

}