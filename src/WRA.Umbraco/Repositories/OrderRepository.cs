using Microsoft.Extensions.Logging;
using Umbraco.Commerce.Core.Api;
using WRA.Umbraco.Contracts;
using WRA.Umbraco.Helpers.Constants;
using WRA.Umbraco.Web.Dtos.External;

namespace WRA.Umbraco.Repositories;

public class OrderRepository(
    IUmbracoCommerceApi commerceApi,
    ILogger<OrderRepository> logger)
{
    public void UpdateProperties(Dictionary<string, string> properties, Guid orderId)
    {
        try
        {
            commerceApi.Uow.Execute(uow =>
            {
                var orderToUpdate = commerceApi.GetOrder(orderId)
                    .AsWritable(uow)
                    .SetProperties(properties);

                commerceApi.SaveOrder(orderToUpdate);
                uow.Complete();
                logger.LogInformation("Order properties updated on order {OrderId}.", orderId);
            });
        }
        catch (Exception e)
        {
            logger.LogError(e, "Failed to update order properties.");
            throw;
        }
    }

    public void Update(OrderEvent orderEvent)
    {
        try
        {
            var updateProperties = new Dictionary<string, string>()
            {
                { GlobalConstants.ExternalId, orderEvent.OrderNumber },
            };
            UpdateProperties(updateProperties, orderEvent.Id);
        }
        catch (Exception e)
        {
            logger.LogError(e, "Failed to update order properties.");
            throw;
        }
    }

}