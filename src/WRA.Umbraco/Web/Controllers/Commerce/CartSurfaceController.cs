using Microsoft.AspNetCore.Mvc;
using Umbraco.Cms.Core.Cache;
using Umbraco.Cms.Core.Logging;
using Umbraco.Cms.Core.Routing;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Core.Web;
using Umbraco.Cms.Infrastructure.Persistence;
using Umbraco.Cms.Web.Website.Controllers;
using Umbraco.Commerce.Common.Validation;
using Umbraco.Commerce.Core.Api;
using WRA.Umbraco.Dtos;
using Umbraco.Commerce.Extensions;
using WRA.Umbraco.Extensions;

namespace WRA.Umbraco.Controllers;

public class CartSurfaceController : SurfaceController
{
    private readonly IUmbracoCommerceApi _commerceApi;

    public CartSurfaceController(
        IUmbracoContextAccessor umbracoContextAccessor,
        IUmbracoDatabaseFactory databaseFactory,
        ServiceContext services,
        AppCaches appCaches,
        IProfilingLogger profilingLogger,
        IPublishedUrlProvider publishedUrlProvider,
        IUmbracoCommerceApi commerceApi)
        : base(
            umbracoContextAccessor,
            databaseFactory,
            services,
            appCaches,
            profilingLogger,
            publishedUrlProvider)
    {
        _commerceApi = commerceApi;
    }

    [HttpPost]
    public IActionResult AddToCart(AddToCartDto postModel)
    {
        try
        {
            _commerceApi.Uow.Execute(uow =>
            {
                var store = CurrentPage!.GetStore();
                var order = _commerceApi.GetOrCreateCurrentOrder(store.Id)
                    .AsWritable(uow)
                    .AddProduct(postModel.ProductReference, postModel.ProductVariantReference, 1);

                _commerceApi.SaveOrder(order);

                uow.Complete();
            });
        }
        catch (ValidationException)
        {
            ModelState.AddModelError("productReference", "Failed to add product to cart");

            return CurrentUmbracoPage();
        }

        TempData["addedProductReference"] = postModel.ProductReference;

        return RedirectToCurrentUmbracoPage();
    }

    [HttpPost]
    public IActionResult AddBundleToCart(AddBundleToCartDto postModel)
    {
        string bundleReference = postModel.BundleReference;
        int defaultQty = 1;
        try
        {
            _commerceApi.Uow.Execute(uow =>
            {
                var store = CurrentPage!.GetStore();
                var order = _commerceApi.GetOrCreateCurrentOrder(store.Id)
                    .AsWritable(uow)
                    .AddProduct(bundleReference, defaultQty, bundleReference);

                // the first product is already added as the "main" bundle item, so we skip it here.
                foreach (string bp in postModel.BundledProducts)
                {
                    order.AddProductToBundle(bundleReference, bp, defaultQty);
                }

                _commerceApi.SaveOrder(order);

                uow.Complete();
            });
        }
        catch (ValidationException)
        {
            ModelState.AddModelError("bundleReference", "Failed to add bundle to cart");

            return CurrentUmbracoPage();
        }

        TempData["addedBundleReference"] = postModel.BundleReference;

        return RedirectToCurrentUmbracoPage();
    }

    [HttpPost]
    public IActionResult UpdateCart(UpdateCartDto postModel)
    {
        try
        {
            _commerceApi.Uow.Execute(uow =>
            {
                var store = CurrentPage!.GetStore();
                var order = _commerceApi.GetOrCreateCurrentOrder(store.Id)
                    .AsWritable(uow);

                foreach (var orderLine in postModel.OrderLines)
                {
                    order.WithOrderLine(orderLine.Id)
                        .SetQuantity(orderLine.Quantity);
                }

                _commerceApi.SaveOrder(order);

                uow.Complete();
            });
        }
        catch (ValidationException)
        {
            ModelState.AddModelError("productReference", "Failed to update cart");

            return CurrentUmbracoPage();
        }

        TempData["cartUpdated"] = "true";

        return RedirectToCurrentUmbracoPage();
    }

    [HttpGet]
    public IActionResult RemoveFromCart(RemoveFromCartDto postModel)
    {
        try
        {
            _commerceApi.Uow.Execute(uow =>
            {
                if (CurrentPage != null)
                {
                    var store = CurrentPage.GetStore();
                    var order = _commerceApi.GetOrCreateCurrentOrder(store.Id)
                        .AsWritable(uow)
                        .RemoveOrderLine(postModel.OrderLineId);

                    _commerceApi.SaveOrder(order);
                }

                uow.Complete();
            });
        }
        catch (ValidationException)
        {
            ModelState.AddModelError("productReference", "Failed to remove cart item");

            return CurrentUmbracoPage();
        }

        return RedirectToCurrentUmbracoPage();
    }
}