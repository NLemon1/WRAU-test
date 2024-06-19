using GlobalPayments.Api.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Emit;
using System.Text;
using System.Threading.Tasks;
using Umbraco.Commerce.Core.Models;
using Umbraco.Commerce.Extensions;
using WRA.Umbraco.Dtos;
using WRA.Umbraco.Models;
using WRA.Umbraco.Web.Dtos.External;

namespace WRA.Umbraco.Extensions;
public static class OrderExtensions
{
    //public static OrderHistoryDto AsDto(this OrderReadOnly order)
    //{
    //    return new OrderHistoryDto(
    //        order.OrderNumber,
    //        order.CreateDate,
    //        order.TotalPrice.Value.WithTax,
    //        order.OrderStatusCode.ToString(),
    //        order.OrderLines.ToList()); // Set up DTO for product lines
    //}

    public static ShippingRateRequestDto AsShippingRateRequestDto(this OrderReadOnly order)
    {
        var result = new ShippingRateRequestDto();
        result.MemberID = new Guid().ToString();
        result.OrderNumber = order.CartNumber;
        result.ToAddress.Address1 = order.Properties["shippingAddressLine1"].SafeString();
        result.ToAddress.City = order.Properties["shippingCity"].SafeString();
        result.ToAddress.State = order.Properties["shippingState"].SafeString();
        result.ToAddress.Zip = order.Properties["shippingZipCode"].SafeString();
        result.ToAddress.Country = "US";
        result.FromAddress.Address1 = "4801 Forest Run Rd.";
        result.FromAddress.City = "Madison";
        result.FromAddress.State = "WI";
        result.FromAddress.Country = "US";
        result.FromAddress.Zip = "53704";
        result.Weight = order.OrderLines.Where(oi => oi.ProductMeasurements != null).Sum(oi => oi.ProductMeasurements.Weight);
        if (result.Weight == 0)
        {
            result.Weight = 1;
        }
        return result;
    }
}
