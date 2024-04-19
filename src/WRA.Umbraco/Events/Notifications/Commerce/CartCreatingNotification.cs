using Microsoft.Extensions.Logging;
using Umbraco.Commerce.Common.Events;
using Umbraco.Commerce.Core.Events.Notification;

namespace WRA.Umbraco.Events.Notifications.Commerce;
public class CartCreatingNotifiction(ILogger<CartCreatingNotifiction> logger) : NotificationEventHandlerBase<OrderCreatingNotification>
{
    private readonly ILogger<CartCreatingNotifiction> _logger = logger;

    public override void Handle(OrderCreatingNotification evt)
    {
        _logger.LogInformation("Order created!");

        // attach to member might not be necessary
        // _WRAMemberManagementService.AttachOrderToMember(evt.Order);

    }
}