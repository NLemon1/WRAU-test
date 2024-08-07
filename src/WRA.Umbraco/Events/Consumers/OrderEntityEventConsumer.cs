using Hangfire;
using MassTransit;
using Microsoft.Extensions.Logging;
using Umbraco.Commerce.Core.Api;
using Umbraco.Commerce.Core.Models;
using WRA.Umbraco.Contracts;
using WRA.Umbraco.Helpers.Constants;
using WRA.Umbraco.Repositories;
using WRA.Umbraco.Web.Dtos.External;
using WRA.Umbraco.Web.Services;

namespace WRA.Umbraco.Events.Consumers;

public class OrderEntityEventConsumer(
    ILogger<OrderEntityEventConsumer> logger)
    : IConsumer<EntityEvent<OrderEvent>>
{
    public async Task Consume(ConsumeContext<EntityEvent<OrderEvent>> context)
    {
        try
        {
            var order = context.Message.Entity;
            switch (context.Message.Action)
            {
                case EntityEventAction.Update:
                    logger.LogInformation("Order update task queued.");
                    BackgroundJob.Enqueue<OrderRepository>(x => x.Update(order));
                    await Task.CompletedTask;
                    break;
                default:
                    logger.LogInformation("Member action not supported: {Action}.", context.Message.Action);
                    break;
            }
        }
        catch (Exception e)
        {
            logger.LogError(e,"Error consuming order event.");
            throw;
        }
    }
}