using Umbraco.Cms.Core.Mapping;
using Umbraco.Commerce.Common.Events;
using Umbraco.Commerce.Core.Events.Notification;
using WRA.Umbraco.Contracts;
using WRA.Umbraco.Events.Publishers;
using WRA.Umbraco.Web.Dtos.External;

namespace WRA.Umbraco.Events.Notifications.Commerce;

public class OrderCompletedNotification(
    OrderEventPublisher memberEventPublisher,
    IUmbracoMapper mapper
    ) : NotificationEventHandlerBase<OrderFinalizedNotification>
{

    public override void Handle(OrderFinalizedNotification evt)
    {
        var order = evt.Order;
        var orderEvent = mapper.Map<OrderEvent>(order);
        if (orderEvent != null) _ = memberEventPublisher.Send(orderEvent, EntityEventAction.Create);
    }
}