using Microsoft.AspNetCore.Mvc;
using Umbraco.Cms.Core.Cache;
using Umbraco.Cms.Core.Logging;
using Umbraco.Cms.Core.Routing;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Core.Web;
using Umbraco.Cms.Infrastructure.Persistence;
using Umbraco.Cms.Web.Website.Controllers;
using Umbraco.Commerce.Common.Validation;
using Umbraco.Commerce.Core;
using Umbraco.Commerce.Core.Api;
using WRA.Umbraco.Dtos;
using Umbraco.Commerce.Extensions;
using WRA.Umbraco.Extensions;
namespace WRA.Umbraco.Controllers;

public class CheckoutSurfaceController(
    IUmbracoContextAccessor umbracoContextAccessor,
    IUmbracoDatabaseFactory databaseFactory,
    IProfilingLogger profilingLogger,
    IPublishedUrlProvider publishedUrlProvider,
    IUmbracoCommerceApi commerceApi,
    ServiceContext services,
    AppCaches appCaches)
    : SurfaceController(umbracoContextAccessor, databaseFactory, services, appCaches, profilingLogger,
        publishedUrlProvider)
{
    public IActionResult ApplyDiscountOrGiftCardCode(DiscountOrGiftCardCodeDto model)
    {
        try
        {
            commerceApi.Uow.Execute(uow =>
            {
                var store = CurrentPage.GetStore();
                var order = commerceApi.GetOrCreateCurrentOrder(store.Id)
                    .AsWritable(uow)
                    .Redeem(model.Code);

                commerceApi.SaveOrder(order);

                uow.Complete();
            });
        }
        catch (ValidationException)
        {
            ModelState.AddModelError(string.Empty, "Failed to redeem discount code");

            return CurrentUmbracoPage();
        }

        return RedirectToCurrentUmbracoPage();
    }

    public IActionResult RemoveDiscountOrGiftCardCode(DiscountOrGiftCardCodeDto model)
    {
        try
        {
            commerceApi.Uow.Execute(uow =>
            {
                var store = CurrentPage.GetStore();
                var order = commerceApi.GetOrCreateCurrentOrder(store.Id)
                    .AsWritable(uow)
                    .Unredeem(model.Code);

                commerceApi.SaveOrder(order);

                uow.Complete();
            });
        }
        catch (ValidationException)
        {
            ModelState.AddModelError(string.Empty, "Failed to redeem discount code");

            return CurrentUmbracoPage();
        }

        return RedirectToCurrentUmbracoPage();
    }

    public IActionResult UpdateOrderInformation(UpdateOrderInformationDto model)
    {
        if (model.ShippingAddress == null)
        {
            ModelState.AddModelError(string.Empty, "No shipping information provided.");

            return CurrentUmbracoPage();
        }

        bool shippingSameAsBilling = model.ShippingSameAsBilling;
        try
        {
            commerceApi.Uow.Execute(uow =>
            {
                var store = CurrentPage.GetStore();
                var order = commerceApi.GetOrCreateCurrentOrder(store.Id)
                .AsWritable(uow)
                .SetProperties(new Dictionary<string, string>
                {
                    { Constants.Properties.Customer.EmailPropertyAlias, model.Email }
                });
                if (model.ShippingAddress != null)
                {
                    // set shipping info
                    order.SetProperties(OrderPropertyHelper.BuildShippingInfo(model.ShippingAddress));
                    order.SetShippingCountryRegion(model.ShippingAddress.Country, null);
                }

                commerceApi.SaveOrder(order);

                uow.Complete();
            });
        }
        catch (ValidationException)
        {
            ModelState.AddModelError(string.Empty, "Failed to update information");

            return CurrentUmbracoPage();
        }

        if (model.NextStep.HasValue)
            return RedirectToUmbracoPage(model.NextStep.Value);

        return RedirectToCurrentUmbracoPage();
    }

    public IActionResult UpdateOrderBillingAddress(UpdateOrderInformationDto model, bool shippingSameAsBilling = false)
    {
        try
        {
            var address = shippingSameAsBilling ? model.ShippingAddress : model.BillingAddress;
            commerceApi.Uow.Execute(uow =>
            {
                var store = CurrentPage.GetStore();
                var order = commerceApi.GetOrCreateCurrentOrder(store.Id)
                    .AsWritable(uow)
                    .SetProperties(OrderPropertyHelper.BuildBillingInfo(address));

                order.SetPaymentCountryRegion(address.Country, null);

                commerceApi.SaveOrder(order);

                uow.Complete();
            });
        }
        catch (ValidationException)
        {
            ModelState.AddModelError(string.Empty, "Failed to update billing address");

            return CurrentUmbracoPage();
        }

        if (model.NextStep.HasValue)
            return RedirectToUmbracoPage(model.NextStep.Value);

        return RedirectToCurrentUmbracoPage();
    }

    public IActionResult UpdateOrderShippingMethod(UpdateOrderShippingMethodDto model)
    {
        try
        {
            commerceApi.Uow.Execute(uow =>
            {
                var store = CurrentPage.GetStore();
                var order = commerceApi.GetOrCreateCurrentOrder(store.Id)
                    .AsWritable(uow);

                order.SetShippingMethod(model.ShippingMethod);

                commerceApi.SaveOrder(order);

                uow.Complete();
            });
        }
        catch (ValidationException)
        {
            ModelState.AddModelError(string.Empty, "Failed to set order shipping method");

            return CurrentUmbracoPage();
        }

        if (model.NextStep.HasValue)
            return RedirectToUmbracoPage(model.NextStep.Value);

        return RedirectToCurrentUmbracoPage();
    }

    public IActionResult UpdateOrderBillingAndPayment(UpdateOrderPaymentMethodDto model)
    {
        try
        {
            commerceApi.Uow.Execute(uow =>
            {
                var store = CurrentPage.GetStore();
                var order = commerceApi.GetOrCreateCurrentOrder(store.Id)
                    .AsWritable(uow)
                    .SetPaymentMethod(model.PaymentMethod)
                    .SetProperties(new Dictionary<string, string>(){
                        { "paymentReference", model.PaymentReference }
                    });

                var address = model.ShippingSameAsBilling ? order.ShippingAddressDto() : model.BillingAddress;
                order.SetProperties(OrderPropertyHelper.BuildBillingInfo(address));

                commerceApi.SaveOrder(order);

                uow.Complete();
            });
        }
        catch (ValidationException)
        {
            ModelState.AddModelError(string.Empty, "Failed to set order payment method");

            return CurrentUmbracoPage();
        }

        if (model.NextStep.HasValue)
            return RedirectToUmbracoPage(model.NextStep.Value);

        return RedirectToCurrentUmbracoPage();
    }
}
