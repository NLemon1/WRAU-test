using System.Text.Json;
using Umbraco.Cms.Core.Events;
using Umbraco.Cms.Core.Models;
using Umbraco.Cms.Core.Notifications;
using WRA.Umbraco.Services;

namespace WRA.Umbraco.Events;

public class WraProductNotifications : INotificationHandler<ContentPublishedNotification>
{
    readonly IProductManagementService _productManagementService;
    readonly QueueService _queueService;
    public WraProductNotifications(IProductManagementService WRAProductManagementService) : base()
    {
        _productManagementService = WRAProductManagementService;
    }
    public async void Handle(ContentPublishedNotification notification)
    {
        foreach (IContent node in notification.PublishedEntities)
        {
            if (node.ContentType.Alias.Equals("productPage"))
            {
                var productSku = node.GetValue<string>("sku");
                var product = _productManagementService.GetProduct(productSku);

                var options = new JsonSerializerOptions { WriteIndented = false };
                string jsonResponse = JsonSerializer.Serialize(product, options);
                // await _queueService.SendMessage(jsonResponse, "website-prod-product");
            }
        }
    }
}