using System.Text.Json;
using Umbraco.Cms.Core.Events;
using Umbraco.Cms.Core.Models;
using Umbraco.Cms.Core.Notifications;
using WRA.Umbraco.Services;

namespace WRA.Umbraco.Events;

public class WraProductNotifications : INotificationHandler<ContentPublishedNotification>
{
    readonly WRAProductManagementService _productService;
    readonly QueueService _queueService;
    public WraProductNotifications(WRAProductManagementService WRAProductManagementService) : base()
    {
        _productService = WRAProductManagementService;
    }
    public async void Handle(ContentPublishedNotification notification)
    {
        foreach (IContent node in notification.PublishedEntities)
        {
            if (node.ContentType.Alias.Equals("productPage"))
            {
                var productSku = node.GetValue<string>("sku");
                var product = await _productService.GetWraProduct(productSku);

                var options = new JsonSerializerOptions { WriteIndented = false };
                string jsonResponse = JsonSerializer.Serialize(product, options);
                // await _queueService.SendMessage(jsonResponse, "website-prod-product");
            }
        }
    }
}