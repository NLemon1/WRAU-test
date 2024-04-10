using System.Text.Json;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Umbraco.Cms.Core.Configuration.Models;
using Umbraco.Cms.Core.Models;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Core.Notifications;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Core.Sync;
using Umbraco.Cms.Core.Webhooks;
using WRA.Umbraco.Dtos;
using WRA.Umbraco.Models;

namespace WRA.Umbraco.Webhooks;

[WebhookEvent("WRA Product Update", "WraProductUpdate")]
public class WraProductWebhook : WebhookEventContentBase<ContentPublishedNotification, IContent>
{
    private readonly ILogger<WraProductWebhook> _logger;
    // private readonly WRAProductManagementService _WRAProductManagementService;
    public WraProductWebhook(
        IWebhookFiringService webhookFiringService,
        IWebhookService webhookService,
        IOptionsMonitor<WebhookSettings> webhookSettings,
        IServerRoleAccessor serverRoleAccessor,
        ILogger<WraProductWebhook> logger
        // WRAProductManagementService wraProdService
        )
        : base(webhookFiringService, webhookService, webhookSettings, serverRoleAccessor)
    {
        _logger = logger;
        // _WRAProductManagementService = wraProdService;
    }

    public override string Alias => "WraProductUpdate";
    // Additional optional overrides

    protected override IEnumerable<IContent> GetEntitiesFromNotification(ContentPublishedNotification notification) => notification.PublishedEntities;
    protected override object? ConvertEntityToRequestPayload(IContent contentNotif)
    {

        // Custom conversion logic
        if (contentNotif == null ||
            !contentNotif.ContentType.Alias.Equals("productPage") ||
            contentNotif.GetValue<string>("sku") == null)
        {
            return null;
        }


        // convert to DTO


        // Write to the logs every time a member is saved.
        _logger.LogInformation($"Product {contentNotif.Id} has been saved and notification published! name: {contentNotif.Name} WraID: {contentNotif.Id}");
        string sku = contentNotif.GetValue<string>("sku") ?? string.Empty;
        return string.Empty;
        // var product = _WRAProductManagementService.GetWraProduct(sku);

        // //TODO: create static options class
        // var options = new JsonSerializerOptions { WriteIndented = false };
        // string jsonResponse = JsonSerializer.Serialize(product, options);
        // return jsonResponse;

    }
    public override async Task ProcessWebhooks(ContentPublishedNotification notification, IEnumerable<IWebhook> webhooks, CancellationToken cancellationToken)
    {
        foreach (IWebhook webhook in webhooks)
        {
            if (!webhook.Enabled)
            {
                continue;
            }

            foreach (IContent entity in GetEntitiesFromNotification(notification))
            {
                if (webhook.ContentTypeKeys.Any() && !webhook.ContentTypeKeys.Contains(entity.ContentType.Key))
                {
                    continue;
                }
                var payload = ConvertEntityToRequestPayload(entity);
                //await _queueService.SendMessage(payload, "website-prod-product");
                await WebhookFiringService.FireAsync(webhook, Alias, payload, cancellationToken);

            }
        }
    }


}

