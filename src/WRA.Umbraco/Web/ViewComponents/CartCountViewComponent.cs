using Microsoft.AspNetCore.Mvc;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Commerce.Core.Api;
using WRA.Umbraco.Extensions;
using WRA.Umbraco.Models;

namespace WRA.Umbraco.ViewComponents;

[ViewComponent]
public class CartCountViewComponent : ViewComponent
{
    private readonly IUmbracoCommerceApi _commerceApi;

    public CartCountViewComponent(IUmbracoCommerceApi commerceApi)
    {
        _commerceApi = commerceApi;
    }

    public IViewComponentResult Invoke(IPublishedContent homePage)
    {
        var store = homePage.GetStore();
        var order = _commerceApi.GetCurrentOrder(store.Id);

        return View("CartCount", (int)(order?.TotalQuantity ?? 0));
    }
}