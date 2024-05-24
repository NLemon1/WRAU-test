using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Umbraco.Commerce.Common.Events;
using Umbraco.Commerce.Core.Events.Notification;
using WRA.Umbraco.Contracts;
using WRA.Umbraco.Events.Publishers;

namespace WRA.Umbraco.Events.Notifications.Commerce;

public class OrderCompletedNotification(
    ILogger<OrderCompletedNotification> logger
    ) : NotificationEventHandlerBase<OrderFinalizedNotification>
{

    public override void Handle(OrderFinalizedNotification evt)
    {
        try
        {
            var order = evt.Order;
            var orderEventPublisher = StaticServiceProvider.Instance.GetService<OrderEventPublisher>() ??
                                      throw new ArgumentNullException("Could not Get OrderEventPublisher from ServiceProvider");
            _ = orderEventPublisher.Send(order, EntityEventAction.Create);
        }
        catch (Exception e)
        {
            logger.LogError(e, "Error handling OrderCompletedNotification");
        }

    }
}