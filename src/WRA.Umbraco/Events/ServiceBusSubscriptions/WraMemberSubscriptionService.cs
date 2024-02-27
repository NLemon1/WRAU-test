using System.Text.Json;
using Azure.Messaging.ServiceBus;
using Microsoft.EntityFrameworkCore.Storage.Json;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using RestSharp;
using StackExchange.Profiling.Internal;
using WRA.Umbraco.Dtos;
using WRA.Umbraco.Events.ServiceBusSubscriptions;
public class WraMemberSubscriptionService : BackgroundService
{
    private readonly string _topicName;
    private readonly string _subscriptionName;
    private readonly string _connectionString;
    private readonly string _baseUrl;
    ServiceBusProcessor _processor;
    readonly ILogger<WraMemberSubscriptionService> _logger;

    public WraMemberSubscriptionService(IOptions<MemberSubscriptionServiceSettings> settings, ILogger<WraMemberSubscriptionService> logger)
    {
        _topicName = settings.Value.TopicName;
        _subscriptionName = settings.Value.SubscriptionName;
        _connectionString = settings.Value.AzureUrl;
        _baseUrl = settings.Value.BaseUrl;
        _logger = logger;

        var client = new ServiceBusClient(_connectionString);
        _processor = client.CreateProcessor(_topicName, _subscriptionName, new ServiceBusProcessorOptions());
    }


    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {

        _processor.ProcessMessageAsync += MessageHandler;
        _processor.ProcessErrorAsync += ErrorHandler;

        await _processor.StartProcessingAsync(stoppingToken);

        stoppingToken.Register(() => _processor.StopProcessingAsync(CancellationToken.None).Wait());
    }

    private Task MessageHandler(ProcessMessageEventArgs args)
    {
        if (args.Message.Body == null)
        {
            _logger.LogInformation("No message body");
            return Task.CompletedTask;
        }

        var body = args.Message.Body.ToObjectFromJson<string>();

        _logger.LogInformation($"Received message: {body}");
        var memberDto = JsonSerializer.Deserialize<MemberDto>(body);

        var options = new RestClientOptions(_baseUrl);
        var client = new RestClient(options);
        // Check if this member already exists in umbraco. If not call Create.
        if (memberDto?.MemberId == null || memberDto.MemberId == 0)
        {
            var jsonBody = JsonSerializer.Serialize(memberDto);
            _logger.LogInformation("Sending To Member Creation Api...");
            var request = new RestRequest("/WraMemberApi/create");
            request.AddJsonBody(jsonBody.ToString());
            // var response = client.Post(request);
            // _logger.LogInformation($"Response: {response.Content}");
            // read response
            return Task.CompletedTask;
        }
        else
        {
            var jsonBody = JsonSerializer.Serialize(memberDto);
            _logger.LogInformation("Sending To Member Update Api...");
            var request = new RestRequest("/WraMemberApi/update");
            request.AddJsonBody(jsonBody.ToString());
            var response = client.Put(request);
            _logger.LogInformation($"Response: {response.Content}");
            // read response
            return Task.CompletedTask;
        }
    }

    private Task ErrorHandler(ProcessErrorEventArgs args)
    {
        Console.WriteLine($"Error handling message: {args.Exception}");
        return Task.CompletedTask;
    }

    public override async Task StopAsync(CancellationToken cancellationToken)
    {
        await _processor.StopProcessingAsync(cancellationToken);
        await _processor.DisposeAsync();
        await base.StopAsync(cancellationToken);
    }
}