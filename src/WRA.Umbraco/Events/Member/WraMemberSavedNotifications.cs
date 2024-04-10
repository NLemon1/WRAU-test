using Microsoft.Extensions.Logging;
using Umbraco.Cms.Core.Events;
using Umbraco.Cms.Core.Mapping;
using Umbraco.Cms.Core.Notifications;
using WRA.Umbraco.Dtos;
using WRA.Umbraco.Events.ServiceBusSubscriptions.Publisher;

namespace WRA.Umbraco.Events.Member;

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
            var memberDto = mapper.Map<MemberDto>(memberNotification);
            if (memberDto == null) continue;
            await memberEventPublisher.Send(memberDto);
            logger.LogInformation("Message sent for external memberId: {member} - {email}", memberDto.ExternalId,
                memberDto.Email);
        }
    }
}