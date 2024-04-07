using System.Text.Json;
using Microsoft.Extensions.Logging;
using Umbraco.Cms.Core.Events;
using Umbraco.Cms.Core.Models;
using Umbraco.Cms.Core.Notifications;
using WRA.Umbraco.Dtos;
using WRA.Umbraco.Services;

namespace WRA.Umbraco.Events;

public class WraMemberNotifications : INotificationHandler<MemberSavedNotification>
{
    readonly QueueService _queueService;
    readonly ILogger<WraMemberNotifications> _logger;

    public WraMemberNotifications(ILogger<WraMemberNotifications> logger, QueueService queueService)
    {
        _logger = logger;
        _queueService = queueService;
    }


    public async void Handle(MemberSavedNotification notification)
    {
        if (notification == null) throw new ArgumentNullException(nameof(notification));

        foreach (var memberNotif in notification.SavedEntities)
        {
            // convert to DTO
            var member = memberNotif.AsDto();

            // Write to the logs every time a member is saved.
            _logger.LogInformation("Member ({FullName}) has been saved and notification published! name: {FullName} WraID: {ExternalId} umbracoId: {UmbracoId} email: {Email}",
                member.FullName, member.FullName, member.ExternalId, member.UmbracoId, member.Email);

            // we need to send passsword hash as well. 
            // WRA deserializes this and adds it to their system so that user do not have out of sync passwords
            // this property wont be set by default as I wont it to only be set in one instance.
            // var pw = memberNotif.RawPasswordValue;
            // member. = pw;


            //TODO: create static options class
            var options = new JsonSerializerOptions { WriteIndented = false };
            string memberJson = JsonSerializer.Serialize(member, options);
            _logger.LogInformation("Sending to Queue...");
            await _queueService.SendMessage(memberJson, "website-prod-member");
            _logger.LogInformation($"Message sent for external memberId: {member.UmbracoId} - {member.Email}");

        }
    }
}