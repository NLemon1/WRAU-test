using Microsoft.Extensions.Logging;
using Umbraco.Cms.Core.Security;
using Umbraco.Commerce.Common.Events;
using Umbraco.Commerce.Core.Events.Notification;

namespace WRA.Umbraco.Events.Notifications.Commerce;
public class OrderBuiltNotification(
    IMemberManager memberManager
    ) : NotificationEventHandlerBase<OrderCreatingNotification>
{

    public override void Handle(OrderCreatingNotification evt)
    {
        var currentMember = memberManager.GetCurrentMemberAsync().Result;
        if (currentMember == null) return;
        evt.Order.AssignToCustomer(currentMember.Key.ToString());

    }
}