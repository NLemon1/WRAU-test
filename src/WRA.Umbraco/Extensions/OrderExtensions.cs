using GlobalPayments.Api.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Umbraco.Commerce.Core.Models;
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
}
