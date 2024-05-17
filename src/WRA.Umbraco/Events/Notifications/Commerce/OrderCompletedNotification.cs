using Hangfire;
using Umbraco.Cms.Core.Mapping;
using Umbraco.Commerce.Common.Events;
using Umbraco.Commerce.Core.Events.Notification;
using WRA.Umbraco.Contracts;
using WRA.Umbraco.Events.Publishers;

namespace WRA.Umbraco.Events.Notifications.Commerce;

public class OrderCompletedNotification(
    OrderEventPublisher orderEventPublisher,
    IUmbracoMapper mapper
    ) : NotificationEventHandlerBase<OrderFinalizedNotification>
{

    public override void Handle(OrderFinalizedNotification evt)
    {
        var order = evt.Order;
        BackgroundJob.Enqueue(() => orderEventPublisher.Send(order, EntityEventAction.Create));
    }
}