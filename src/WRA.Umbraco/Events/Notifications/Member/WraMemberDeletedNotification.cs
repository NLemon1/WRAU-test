using Microsoft.Extensions.Logging;
using Umbraco.Cms.Core.Events;
using Umbraco.Cms.Core.Mapping;
using Umbraco.Cms.Core.Notifications;
using WRA.Umbraco.Events.Publishers;
using WRA.Umbraco.Contracts;

namespace WRA.Umbraco.Events.Notifications.Member;

public class WraMemberDeletedNotification(
    ILogger<WraMemberNotifications> logger,
    MemberEventPublisher memberEventPublisher,
    IUmbracoMapper mapper)
    : INotificationHandler<MemberDeletedNotification>
{
    public async void Handle(MemberDeletedNotification notification)
    {
        ArgumentNullException.ThrowIfNull(notification);
        foreach (var memberNotification in notification.DeletedEntities)
        {
            var memberEvent = mapper.Map<MemberEvent>(memberNotification);
            if (memberEvent == null) continue;
            await memberEventPublisher.Send(memberEvent, EntityEventAction.Delete);
            logger.LogWarning("DELETE message sent for external memberId: {Member} - {Email}", memberEvent.Id, memberEvent.Email);
        }
    }
}