using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
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
using Umbraco.Cms.Core.Events;
//using GlobalPayments.Api.Services;
//using GlobalPayments.Api;

namespace WRA.Umbraco.Controllers;

public class CheckoutSurfaceController : SurfaceController
{
    private readonly IUmbracoCommerceApi _commerceApi;

    public CheckoutSurfaceController(IUmbracoContextAccessor umbracoContextAccessor, IUmbracoDatabaseFactory databaseFactory,
        ServiceContext services, AppCaches appCaches, IProfilingLogger profilingLogger, IPublishedUrlProvider publishedUrlProvider,
        IUmbracoCommerceApi commerceApi)
        : base(umbracoContextAccessor, databaseFactory, services, appCaches, profilingLogger, publishedUrlProvider)
    {
        _commerceApi = commerceApi;
    }


    // public IActionResult CaptureCreditCartPayment(object model)
    // {
    //     ServicesContainer.ConfigureService(new PorticoConfig
    //     {
    //         SecretApiKey = "skapi_cert_MTyMAQBiHVEAewvIzXVFcmUd2UcyBge_eCpaASUp0A",
    //         DeveloperId = "000000",
    //         VersionNumber = "0000",
    //         ServiceUrl = "https://cert.api2.heartlandportico.com"
    //     });
    // }
    public IActionResult ApplyDiscountOrGiftCardCode(DiscountOrGiftCardCodeDto model)
    {
        try
        {
            _commerceApi.Uow.Execute(uow =>
            {
                var store = CurrentPage.GetStore();
                var order = _commerceApi.GetOrCreateCurrentOrder(store.Id)
                    .AsWritable(uow)
                    .Redeem(model.Code);

                _commerceApi.SaveOrder(order);

                uow.Complete();
            });
        }
        catch (ValidationException ex)
        {
            ModelState.AddModelError("", "Failed to redeem discount code");

            return CurrentUmbracoPage();
        }

        return RedirectToCurrentUmbracoPage();
    }

    public IActionResult RemoveDiscountOrGiftCardCode(DiscountOrGiftCardCodeDto model)
    {
        try
        {
            _commerceApi.Uow.Execute(uow =>
            {
                var store = CurrentPage.GetStore();
                var order = _commerceApi.GetOrCreateCurrentOrder(store.Id)
                    .AsWritable(uow)
                    .Unredeem(model.Code);

                _commerceApi.SaveOrder(order);

                uow.Complete();
            });
        }
        catch (ValidationException ex)
        {
            ModelState.AddModelError("", "Failed to redeem discount code");

            return CurrentUmbracoPage();
        }

        return RedirectToCurrentUmbracoPage();
    }

    public IActionResult UpdateOrderInformation(UpdateOrderInformationDto model)
    {
        bool shippingSameAsBilling = model.ShippingSameAsBilling;
        try
        {
            _commerceApi.Uow.Execute(uow =>
            {
                var store = CurrentPage.GetStore();
                var order = _commerceApi.GetOrCreateCurrentOrder(store.Id)
                .AsWritable(uow);

                if (model.ShippingAddress != null)
                {
                    // set shipping info
                    order.SetProperties(CreateShippingInfo(model.ShippingAddress));
                }

                if (shippingSameAsBilling)
                {
                    // set billing info
                    order.SetProperties(CreateBillingInfo(model.BillingAddress));
                }

                if (model?.BillingAddress?.Country != Guid.Empty)
                {
                    order.SetPaymentCountryRegion(model.ShippingAddress.Country, null);
                }
                // order.SetShippingCountryRegion(model.ShippingSameAsBilling ? model.BillingAddress.Country : model.ShippingAddress.Country, null);

                _commerceApi.SaveOrder(order);

                uow.Complete();
            });
        }
        catch (ValidationException ex)
        {
            ModelState.AddModelError("", "Failed to update information");

            return CurrentUmbracoPage();
        }

        if (model.NextStep.HasValue)
            return RedirectToUmbracoPage(model.NextStep.Value);

        return RedirectToCurrentUmbracoPage();
    }

    private Dictionary<string, string> CreateShippingInfo(OrderAddressDto address)
    {
        return new Dictionary<string, string>
            {
                    // { Constants.Properties.Customer.EmailPropertyAlias, model.Email },
                    // { "marketingOptIn", model.MarketingOptIn ? "1" : "0" },

                    { Constants.Properties.Customer.FirstNamePropertyAlias, address.FirstName },
                    { Constants.Properties.Customer.LastNamePropertyAlias, address.LastName },
                    { "shippingAddressLine1", address.Line1 },
                    { "shippingAddressLine2", address.Line2 },
                    { "shippingCity", address.City },
                    { "shippingState", address.State },
                    { "shippingZipCode", address.ZipCode },
                    { "shippingFirstName", address.FirstName },
                    { "shippingLastName", address.LastName },
                    // { "shippingCountry", address.Country },
            };

    }
    private Dictionary<string, string> CreateBillingInfo(OrderAddressDto address)
    {
        return new Dictionary<string, string>
            {
                    // { Constants.Properties.Customer.EmailPropertyAlias, model.Email },
                    // { "marketingOptIn", model.MarketingOptIn ? "1" : "0" },

                    { "billingAddressLine1", address.Line1 },
                    { "billingAddressLine2", address.Line2 },
                    { "billingCity", address.City },
                    { "billingState", address.State },
                    { "billingZipCode", address.ZipCode },
                    { "billingFirstName", address.FirstName },
                    { "billingLastName", address.LastName },
                    //{ "billingTelephone", model.BillingAddress.Telephone },
            };

    }

    public IActionResult UpdateOrderShippingMethod(UpdateOrderShippingMethodDto model)
    {
        try
        {
            _commerceApi.Uow.Execute(uow =>
            {
                var store = CurrentPage.GetStore();
                var order = _commerceApi.GetOrCreateCurrentOrder(store.Id)
                    .AsWritable(uow);

                order.SetShippingMethod(model.ShippingMethod);

                _commerceApi.SaveOrder(order);

                uow.Complete();
            });
        }
        catch (ValidationException ex)
        {
            ModelState.AddModelError("", "Failed to set order shipping method");

            return CurrentUmbracoPage();
        }

        if (model.NextStep.HasValue)
            return RedirectToUmbracoPage(model.NextStep.Value);

        return RedirectToCurrentUmbracoPage();
    }

    public IActionResult UpdateOrderPaymentMethod(UpdateOrderPaymentMethodDto model)
    {
        try
        {
            _commerceApi.Uow.Execute(uow =>
            {
                var store = CurrentPage.GetStore();
                var order = _commerceApi.GetOrCreateCurrentOrder(store.Id)
                    .AsWritable(uow)
                    .SetPaymentMethod(model.PaymentMethod)
                    .SetProperties(new Dictionary<string, string>(){
                        { "paymentReference", model.PaymentReference }
                    });

                _commerceApi.SaveOrder(order);

                uow.Complete();
            });
        }
        catch (ValidationException ex)
        {
            ModelState.AddModelError("", "Failed to set order payment method");

            return CurrentUmbracoPage();
        }

        if (model.NextStep.HasValue)
            return RedirectToUmbracoPage(model.NextStep.Value);

        return RedirectToCurrentUmbracoPage();
    }
}
