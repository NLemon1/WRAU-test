using Hangfire;
using Microsoft.Extensions.DependencyInjection;
using Umbraco.Cms.Core.Mapping;
using Umbraco.Commerce.Common.Events;
using Umbraco.Commerce.Core.Events.Notification;
using WRA.Umbraco.Contracts;
using WRA.Umbraco.Events.Publishers;

namespace WRA.Umbraco.Events.Notifications.Commerce;

public class OrderCompletedNotification(
    IUmbracoMapper mapper
    ) : NotificationEventHandlerBase<OrderFinalizedNotification>
{

    public override void Handle(OrderFinalizedNotification evt)
    {
        var order = evt.Order;
        var orderEventPublisher = StaticServiceProvider.Instance.GetService<OrderEventPublisher>() ??
                                  throw new ArgumentNullException("Could not Get OrderEventPublisher from ServiceProvider");
        BackgroundJob.Enqueue(() =>  orderEventPublisher.Send(order, EntityEventAction.Create));
    }
}