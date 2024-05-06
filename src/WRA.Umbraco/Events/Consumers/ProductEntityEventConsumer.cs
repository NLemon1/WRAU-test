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
        var productEvent = context.Message.Entity;
        switch (context.Message.Source)
        {
            case EntityEventSource.UmbracoCloud:
                logger.LogInformation("Source is UmbracoCloud. Skipping...");
                await Task.CompletedTask;
                break;
            default:
                logger.LogInformation("Updating product: {Product}.", productEvent.Sku);
                BackgroundJob.Enqueue<WraProductManagementService>(x => x.CreateOrUpdate(productEvent));
                await Task.CompletedTask;
                logger.LogInformation("Product updated.");  // Changed from "Member updated" to "Product updated"
                break;
        }
    }
}