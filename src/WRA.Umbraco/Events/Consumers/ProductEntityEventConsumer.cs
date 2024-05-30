using Hangfire;
using MassTransit;
using Microsoft.Extensions.Logging;
using WRA.Umbraco.Contracts;
using WRA.Umbraco.Web.Services;

namespace WRA.Umbraco.Events.Consumers;

public class ProductEntityEventConsumer(ILogger<ProductEntityEventConsumer> logger)
: IConsumer<EntityEvent<ProductEvent>>
{
    public async Task Consume(ConsumeContext<EntityEvent<ProductEvent>> context)
    {
        try
        {
            var productEvent = context.Message.Entity;
            // var message = context.Message

            switch (context.Message.Action)
            {
                case EntityEventAction.Create:
                    logger.LogInformation("Creating product: {Product}.", productEvent.Sku);
                    BackgroundJob.Enqueue<WraProductManagementService>(x => x.CreateOrUpdate(productEvent));
                    await Task.CompletedTask;
                    logger.LogInformation("Product created.");
                    break;
                case EntityEventAction.Update:
                    logger.LogInformation("Updating product: {Product}.", productEvent.Sku);
                    BackgroundJob.Enqueue<WraProductManagementService>(x => x.CreateOrUpdate(productEvent));
                    await Task.CompletedTask;
                    logger.LogInformation("Product updated.");
                    break;
                case EntityEventAction.Delete:
                    logger.LogInformation("Deleting product: {Product}.", productEvent.Sku);
                    BackgroundJob.Enqueue<WraProductManagementService>(x => x.Delete(productEvent));
                    await Task.CompletedTask;
                    logger.LogInformation("Product Deleted.");
                    break;
                default:
                    logger.LogInformation("Product action not supported: {Action}.", context.Message.Action);
                    break;
            }
        }
        catch (Exception e)
        {
            logger.LogInformation("Cannot consume message");
            throw;
        }
    }
}