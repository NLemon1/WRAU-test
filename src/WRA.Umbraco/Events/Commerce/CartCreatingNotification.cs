using System.Text.Json;
using Microsoft.Extensions.Logging;
using Umbraco.Cms.Core.Events;
using Umbraco.Cms.Core.Models;
using Umbraco.Cms.Core.Notifications;
using Umbraco.Cms.Core.Security;
using Umbraco.Cms.Core.Services;
using Umbraco.Commerce.Common.Events;
using Umbraco.Commerce.Core.Api;
using Umbraco.Commerce.Core.Events.Notification;
using Umbraco.Commerce.Core.Models;
using WRA.Umbraco.Web.Services;

namespace WRA.Umbraco.Events;
public class CartCreatingNotifiction(ILogger<CartCreatingNotifiction> logger, WraMemberManagementService WRAMemberManagementService) : NotificationEventHandlerBase<OrderCreatingNotification>
{
    readonly ILogger<CartCreatingNotifiction> _logger = logger;
    readonly WraMemberManagementService _WRAMemberManagementService = WRAMemberManagementService;

    public override void Handle(OrderCreatingNotification evt)
    {
        _logger.LogInformation("Order created!");

        // attach to member might not be necessary
        //_WRAMemberManagementService.AttachOrderToMember(evt.Order);

    }


}