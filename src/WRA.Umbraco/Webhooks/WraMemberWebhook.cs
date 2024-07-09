// using System.Text.Json;
// using Microsoft.Extensions.Logging;
// using Microsoft.Extensions.Options;
// using Umbraco.Cms.Core.Configuration.Models;
// using Umbraco.Cms.Core.Models;
// using Umbraco.Cms.Core.Notifications;
// using Umbraco.Cms.Core.Services;
// using Umbraco.Cms.Core.Sync;
// using Umbraco.Cms.Core.Webhooks;
// using WRA.Umbraco.Dtos;
// using WRA.Umbraco.Events;
// using WRA.Umbraco.Services;

// namespace WRA.Umbraco.Webhooks;

// [WebhookEvent("WRA Member Update", "WraMemberUpdate")]
// public class WraMemberWebhook : WebhookEventContentBase<MemberSavedNotification, IMember>
// {
//     private readonly ILogger<WraMemberWebhook> _logger;
//     private readonly QueueService _queueService;
//     public WraMemberWebhook(
//         IWebhookFiringService webhookFiringService,
//         IWebhookService webhookService,
//         IOptionsMonitor<WebhookSettings> webhookSettings,
//         IServerRoleAccessor serverRoleAccessor,
//         ILogger<WraMemberWebhook> logger,
//         QueueService queueService)
//         : base(webhookFiringService, webhookService, webhookSettings, serverRoleAccessor)
//     {
//         _logger = logger;
//         _queueService = queueService;
//     }

// public override string Alias => "WraMemberUpdate";
//     // Additional optional overrides

// protected override IEnumerable<IMember> GetEntitiesFromNotification(MemberSavedNotification notification) => notification.SavedEntities;
//     protected override object? ConvertEntityToRequestPayload(IMember memberNotif)
//     {

// // Custom conversion logic
//         if (memberNotif == null)
//         {
//             return null;
//         }

// // convert to DTO
//         var member = memberNotif.AsDto();

// // Write to the logs every time a member is saved.
//         _logger.LogInformation($"Member {member.Id} has been saved and notification published! name: {member.FullName} WraID: {member.Id}");

// // we need to send passsword hash as well.
//         // WRA deserializes this and adds it to their system so that user do not have out of sync passwords
//         // this property wont be set by default as I wont it to only be set in one instance.
//         var pw = memberNotif.RawPasswordValue;
//         member.SecurtyHash = pw;

// var options = new JsonSerializerOptions { WriteIndented = false };
//         string jsonResponse = JsonSerializer.Serialize(member, options);
//         return jsonResponse;

// }
//     public override async Task ProcessWebhooks(MemberSavedNotification notification, IEnumerable<IWebhook> webhooks, CancellationToken cancellationToken)
//     {
//         foreach (IWebhook webhook in webhooks)
//         {
//             if (!webhook.Enabled)
//             {
//                 continue;
//             }

// foreach (IMember entity in GetEntitiesFromNotification(notification))
//             {
//                 if (webhook.ContentTypeKeys.Any() && !webhook.ContentTypeKeys.Contains(entity.ContentType.Key))
//                 {
//                     continue;
//                 }
//                 var payload = ConvertEntityToRequestPayload(entity);
//                 await _queueService.SendMessage(payload, "website-prod-member");
//                 await WebhookFiringService.FireAsync(webhook, Alias, payload, cancellationToken);

// }
//         }
//     }

// }