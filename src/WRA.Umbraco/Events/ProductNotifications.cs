using Umbraco.Cms.Core.Events;
using Umbraco.Cms.Core.Notifications;
using WRA.Umbraco.Services;

namespace WRA.Umbraco.Events;

public class ProductNofitication : INotificationHandler<ContentPublishedNotification>
{
    readonly WRAProductService _productService;
    public ProductNofitication(WRAProductService wRAProductService)
    {
        _productService = wRAProductService;
    }
    public void Handle(ContentPublishedNotification notification)
    {
        foreach (var node in notification.PublishedEntities)
        {
            if (node.ContentType.Alias.Equals("productPage"))
            {
                var newsArticleTitle = node.GetValue<string>("title");
                if (!string.IsNullOrWhiteSpace(newsArticleTitle) && newsArticleTitle.Equals(newsArticleTitle.ToUpper()))
                {

                }
            }
        }
    }
}