// using System.Threading.Tasks;
// using Azure.Messaging.ServiceBus;

// // the client that owns the connection and can be used to create senders and receivers
// ServiceBusClient client;

// // the processor that reads and processes messages from the subscription
// ServiceBusProcessor processor;

// // handle received messages
// async Task MessageHandler(ProcessMessageEventArgs args)
// {
//     // TODO: Replace the <TOPIC-SUBSCRIPTION-NAME> placeholder
//     string body = args.Message.Body.ToString();
//     Console.WriteLine($"Received: {body} from subscription: <TOPIC-SUBSCRIPTION-NAME>");

// // complete the message. messages is deleted from the subscription.
//     await args.CompleteMessageAsync(args.Message);
// }

// // handle any errors when receiving messages
// Task ErrorHandler(ProcessErrorEventArgs args)
// {
//     Console.WriteLine(args.Exception.ToString());
//     return Task.CompletedTask;
// }