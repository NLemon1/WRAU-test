using Microsoft.Extensions.DependencyInjection;
using Umbraco.Cms.Core.Security;
using Umbraco.Commerce.Common.Events;
using Umbraco.Commerce.Core.Events.Notification;

namespace WRA.Umbraco.Events.Notifications.Commerce;
public class OrderBuiltNotification(
    IServiceScopeFactory serviceScopeFactory
    ) : NotificationEventHandlerBase<OrderCreatingNotification>
{

    public override void Handle(OrderCreatingNotification evt)
    {
        using var scope = serviceScopeFactory.CreateScope();
        var memberManager = scope.ServiceProvider.GetRequiredService<IMemberManager>();
        var currentMember = memberManager.GetCurrentMemberAsync().Result;
        if (currentMember == null) return;
        evt.Order.AssignToCustomer(currentMember.Key.ToString());

    }
}