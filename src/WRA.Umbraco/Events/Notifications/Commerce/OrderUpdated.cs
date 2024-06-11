using Microsoft.Extensions.DependencyInjection;
using Umbraco.Commerce.Common.Events;
using Umbraco.Commerce.Core.Events.Notification;
using WRA.Umbraco.Helpers.Constants;
using WRA.Umbraco.Shared.Extensions;

namespace WRA.Umbraco.Events.Notifications.Commerce;
public class OrderUpdated(
    IServiceScopeFactory serviceScopeFactory
) : NotificationEventHandlerBase<OrderUpdatedNotification>
{

    public override void Handle(OrderUpdatedNotification evt)
    {
        // using var scope = serviceScopeFactory.CreateScope();
        // check items in order
        // if all items are non-shippable set an order property "notShippable"
        // evt.Order.SetProperty(GlobalConstants.Order.NotShippable, true);
    }
}