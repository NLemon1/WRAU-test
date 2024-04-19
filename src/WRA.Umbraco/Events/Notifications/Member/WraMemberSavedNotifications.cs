using Microsoft.Extensions.Logging;
using Umbraco.Cms.Core.Cache;
using Umbraco.Cms.Core.Events;
using Umbraco.Cms.Core.Mapping;
using Umbraco.Cms.Core.Notifications;
using WRA.Umbraco.Events.Publishers;
using WRA.Umbraco.Contracts;
using WRA.Umbraco.Models;

namespace WRA.Umbraco.Events.Notifications.Member;

public class WraMemberNotifications(
    ILogger<WraMemberNotifications> logger,
    MemberEventPublisher memberEventPublisher,
    IUmbracoMapper mapper)
    : INotificationHandler<MemberSavedNotification>
{
    public async void Handle(MemberSavedNotification notification)
    {
        ArgumentNullException.ThrowIfNull(notification);
        foreach (var memberNotification in notification.SavedEntities)
        {
            var memberEvent = mapper.Map<MemberEvent>(memberNotification);
            if (memberEvent == null) continue;
            await memberEventPublisher.Send(memberEvent);
            logger.LogInformation("Message sent for external memberId: {Member} - {Email}", memberEvent.Id,  memberEvent.Email);
        }
    }
}