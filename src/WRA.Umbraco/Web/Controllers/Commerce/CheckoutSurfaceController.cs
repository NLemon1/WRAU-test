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
using Umbraco.Commerce.Core.Models;
using WRA.Umbraco;
using WRA.Umbraco.Extensions;

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
        if (model.ShippingAddress == null)
        {
            ModelState.AddModelError("", "No shipping information provided.");

            return CurrentUmbracoPage();
        }

        bool shippingSameAsBilling = model.ShippingSameAsBilling;
        try
        {
            _commerceApi.Uow.Execute(uow =>
            {
                var store = CurrentPage.GetStore();
                var order = _commerceApi.GetOrCreateCurrentOrder(store.Id)
                .AsWritable(uow)
                .SetProperties(new Dictionary<string, string>
                {
                    { Constants.Properties.Customer.EmailPropertyAlias, model.Email }
                });
                if (model.ShippingAddress != null)
                {
                    // set shipping info
                    order.SetProperties(CreateShippingInfo(model.ShippingAddress));
                    order.SetShippingCountryRegion(model.ShippingAddress.Country, null);
                }
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

    public IActionResult UpdateOrderBillingAddress(UpdateOrderInformationDto model, bool shippingSameAsBilling = false)
    {
        try
        {
            var address = shippingSameAsBilling ? model.ShippingAddress : model.BillingAddress;
            _commerceApi.Uow.Execute(uow =>
            {
                var store = CurrentPage.GetStore();
                var order = _commerceApi.GetOrCreateCurrentOrder(store.Id)
                    .AsWritable(uow)
                    .SetProperties(CreateBillingInfo(address));

                order.SetPaymentCountryRegion(address.Country, null);

                _commerceApi.SaveOrder(order);

                uow.Complete();
            });
        }
        catch (ValidationException ex)
        {
            ModelState.AddModelError("", "Failed to update billing address");

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
                    { Constants.Properties.Customer.FirstNamePropertyAlias, address.FirstName },
                    { Constants.Properties.Customer.LastNamePropertyAlias, address.LastName },
                    { "shippingAddressLine1", address.Line1 },
                    { "shippingAddressLine2", address.Line2 },
                    { "shippingCity", address.City },
                    { "shippingState", address.State },
                    { "shippingZipCode", address.ZipCode },
                    { "shippingFirstName", address.FirstName },
                    { "shippingLastName", address.LastName }
            };

    }
    private Dictionary<string, string> CreateBillingInfo(OrderAddressDto address)
    {
        return new Dictionary<string, string>
            {
                    // { Constants.Properties.Customer.EmailPropertyAlias, model.Email },
                    { Constants.Properties.Customer.FirstNamePropertyAlias, address.FirstName },
                    { Constants.Properties.Customer.LastNamePropertyAlias, address.LastName },
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

    public IActionResult UpdateOrderBillingAndPayment(UpdateOrderPaymentMethodDto model)
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

                var address = model.ShippingSameAsBilling ? order.ShippingAddressDto() : model.BillingAddress;
                order.SetProperties(CreateBillingInfo(address));

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
