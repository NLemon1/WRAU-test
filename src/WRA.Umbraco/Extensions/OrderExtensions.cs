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
    public static ShippingRateRequestDto AsShippingRateRequestDto(this OrderReadOnly order)
    {
        var result = new ShippingRateRequestDto
        {
            MemberID = Guid.NewGuid().ToString(),
            OrderNumber = order.CartNumber,
            ToAddress =
            {
                Address1 = order.Properties["shippingAddressLine1"].SafeString(),
                City = order.Properties["shippingCity"].SafeString(),
                State = order.Properties["shippingState"].SafeString(),
                Zip = order.Properties["shippingZipCode"].SafeString(),
                Country = "US"
            },
            FromAddress =
            {
                Address1 = "4801 Forest Run Rd.",
                City = "Madison",
                State = "WI",
                Country = "US",
                Zip = "53704"
            },
            Weight = order.OrderLines.Where(oi => oi.ProductMeasurements != null).Sum(oi => oi.ProductMeasurements.Weight)
        };
        if (result.Weight == 0)
        {
            result.Weight = 1;
        }

        return result;
    }
}
