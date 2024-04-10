// using Azure.Messaging.ServiceBus;
// using Microsoft.EntityFrameworkCore.Storage.Json;
// using Microsoft.Extensions.Hosting;
// using Microsoft.Extensions.Options;
// using Newtonsoft.Json.Linq;
// using RestSharp;
// public class WraProductSubscriptionService : BackgroundService
// {
//     private readonly string _topicName;
//     private readonly string _subscriptionName;
//     private readonly string _connectionString;
//     private readonly string _baseUrl;
//     private ServiceBusProcessor _processor;
//
//     public WraProductSubscriptionService(SubscriptionServiceSettings settings)
//     {
//         var productSubscriptionSettings = settings.ProductSubscriptionServiceSettings;
//         _topicName = productSubscriptionSettings.TopicName;
//         _subscriptionName = productSubscriptionSettings.SubscriptionEndpoint;
//         _baseUrl = productSubscriptionSettings.BaseUrl;
//     }
//
//
//     protected override async Task ExecuteAsync(CancellationToken stoppingToken)
//     {
//         var client = new ServiceBusClient(_connectionString);
//         _processor = client.CreateProcessor(_topicName, _subscriptionName, new ServiceBusProcessorOptions());
//
//         _processor.ProcessMessageAsync += MessageHandler;
//         _processor.ProcessErrorAsync += ErrorHandler;
//
//         await _processor.StartProcessingAsync(stoppingToken);
//
//         stoppingToken.Register(() => _processor.StopProcessingAsync(CancellationToken.None).Wait());
//     }
//
//     private Task MessageHandler(ProcessMessageEventArgs args)
//     {
//         var body = args.Message.Body.ToString();
//         JObject jsonBody = JObject.Parse(body);
//
//         var options = new RestClientOptions(_baseUrl);
//         var client = new RestClient(options);
//         // Check if this member already exists in umbraco. If not call Create.
//         if (string.IsNullOrEmpty(jsonBody.GetValue("umbracoMemberId")?.ToString()))
//         {
//             var request = new RestRequest("/WraProductApi/create");
//             var response = client.Post(request);
//             return Task.CompletedTask;
//         }
//         else
//         {
//             var request = new RestRequest("/WraProductApi/create");
//             var response = client.Post(request);
//             return Task.CompletedTask;
//         }
//     }
//
//     private Task ErrorHandler(ProcessErrorEventArgs args)
//     {
//         Console.WriteLine($"Error handling message: {args.Exception}");
//         return Task.CompletedTask;
//     }
//
//     public override async Task StopAsync(CancellationToken cancellationToken)
//     {
//         await _processor.StopProcessingAsync(cancellationToken);
//         await _processor.DisposeAsync();
//         await base.StopAsync(cancellationToken);
//     }
// }