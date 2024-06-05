using WRA.Umbraco.Dtos;
using Umbraco.Commerce.Core;
using Umbraco.Commerce.Core.Models;
using WRA.Umbraco.Contracts;
using WRA.Umbraco.Helpers.Constants;

namespace WRA.Umbraco.Helpers;

public static class OrderPropertyHelper
{
    #region Shipping
    public static Dictionary<string, string> BuildShippingInfo(OrderAddressDto address)
    {
        return new Dictionary<string, string>
        {
            // { Constants.Properties.Customer.EmailPropertyAlias, model.Email },
            { CommerceConstants.Shipping.AddressLine1, address.Line1 },
            { CommerceConstants.Shipping.AddressLine2, address.Line2 },
            { CommerceConstants.Shipping.City, address.City },
            { CommerceConstants.Shipping.State, address.State },
            { CommerceConstants.Shipping.ZipCode, address.ZipCode },
            { CommerceConstants.Shipping.FirstName, address.FirstName },
            { CommerceConstants.Shipping.LastName, address.LastName }
        };
    }
    public static UmbracoOrderAddressDto GetShippingAddress(OrderReadOnly order)
    {
        return new UmbracoOrderAddressDto
        {
            FirstName = order.Properties[CommerceConstants.Shipping.FirstName],
            LastName = order.Properties[CommerceConstants.Shipping.LastName],
            Line1 = order.Properties[CommerceConstants.Shipping.AddressLine1],
            Line2 = order.Properties[CommerceConstants.Shipping.AddressLine2],
            City = order.Properties[CommerceConstants.Shipping.City],
            State = order.Properties[CommerceConstants.Shipping.State],
            ZipCode = order.Properties[CommerceConstants.Shipping.ZipCode]
        };
    }
    #endregion

    #region  Billing

    public static Dictionary<string, string> BuildBillingInfo(OrderAddressDto address)
    {
        return new Dictionary<string, string>
        {
            // { Constants.Properties.Customer.EmailPropertyAlias, model.Email },
            { CommerceConstants.Billing.FirstName, address.FirstName },
            { CommerceConstants.Billing.LastName, address.LastName },
            { CommerceConstants.Billing.AddressLine1, address.Line1 },
            { CommerceConstants.Billing.AddressLine2, address.Line2 },
            { CommerceConstants.Billing.City, address.City },
            { CommerceConstants.Billing.State, address.State },
            { CommerceConstants.Billing.ZipCode, address.ZipCode }

            // { "billingTelephone", model.BillingAddress.Telephone },
        };
    }

    public static UmbracoOrderAddressDto GetBillingAddress(OrderReadOnly order)
    {
        return new UmbracoOrderAddressDto
        {
            FirstName = order.Properties[CommerceConstants.Billing.FirstName],
            LastName = order.Properties[CommerceConstants.Billing.LastName],
            Line1 = order.Properties[CommerceConstants.Billing.AddressLine1],
            Line2 = order.Properties[CommerceConstants.Billing.AddressLine2],
            City = order.Properties[CommerceConstants.Billing.City],
            State = order.Properties[CommerceConstants.Billing.State],
            ZipCode = order.Properties[CommerceConstants.Billing.ZipCode]
        };
    }
    #endregion

    public static OrderAddressDto ShippingAddressToBilling(this Order order)
    {
        return new OrderAddressDto
        {
            FirstName = order.Properties[CommerceConstants.Shipping.FirstName],
            LastName = order.Properties[CommerceConstants.Shipping.LastName],
            Line1 = order.Properties[CommerceConstants.Shipping.AddressLine1],
            Line2 = order.Properties[CommerceConstants.Shipping.AddressLine2],
            City = order.Properties[CommerceConstants.Shipping.City],
            State = order.Properties[CommerceConstants.Shipping.State],
            ZipCode = order.Properties[CommerceConstants.Shipping.ZipCode]
        };
    }
}