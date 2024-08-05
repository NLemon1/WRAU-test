using Microsoft.Extensions.Logging;
using Umbraco.Cms.Core.Cache;
using Umbraco.Cms.Core.Events;
using Umbraco.Cms.Core.Mapping;
using Umbraco.Cms.Core.Notifications;
using WRA.Umbraco.Events.Publishers;
using WRA.Umbraco.Contracts;
using WRA.Umbraco.Helpers.Constants;
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
            string? externalId = memberNotification.GetValue<string>(GlobalConstants.ExternalId);
            if (string.IsNullOrEmpty(externalId))
            {
                var memberCreateEvent = mapper.Map<MemberEvent>(memberNotification);
                if (memberCreateEvent == null) continue;
                await memberEventPublisher.Send(memberCreateEvent, EntityEventAction.Create);
                logger.LogInformation("Message sent for external memberId: {Member} - {Email}", memberCreateEvent.Id,  memberCreateEvent.Email);
            }
            else
            {
                var memberUpdateEvent = mapper.Map<MemberEvent>(memberNotification);
                if (memberUpdateEvent == null) continue;
                await memberEventPublisher.Send(memberUpdateEvent, EntityEventAction.Update);
                logger.LogInformation("Message sent for external memberId: {Member} - {Email}", memberUpdateEvent.Id,  memberUpdateEvent.Email);
            }

        }
    }
}