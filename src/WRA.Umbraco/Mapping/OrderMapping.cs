using Umbraco.Cms.Core.Mapping;
using Umbraco.Commerce.Core.Models;
using Umbraco.Commerce.Extensions;
using WRA.Umbraco.Extensions;
using WRA.Umbraco.Helpers.Constants;
using WRA.Umbraco.Repositories;
using WRA.Umbraco.Web.Dtos.External;

namespace WRA.Umbraco.Mapping;

public class OrderMapping(
    MemberRepository memberRepository,
    MappingHelper mappingHelper
    ) : IMapDefinition
{
    public void DefineMaps(IUmbracoMapper mapper)
    {
        mapper.Define<OrderReadOnly, OrderEvent>((_, _) => new OrderEvent(), UmbracoOrderToOrderEvent);
    }

    private void UmbracoOrderToOrderEvent(OrderReadOnly source, OrderEvent target, MapperContext context)
    {
        var memberAttachedToOrder = memberRepository.GetbyKey(source.CustomerInfo.CustomerReference.SafeGuid());
        if (memberAttachedToOrder != null)
        {
            var companyOnMember =
                mappingHelper.GetRelatedContent(memberAttachedToOrder, GlobalConstants.Member.Company);
            if (companyOnMember != null)
            {
                target.Company = companyOnMember.Value(GlobalConstants.ExternalId).SafeGuid();
                target.Address1 = memberAttachedToOrder.GetValue<string>(GlobalConstants.Member.AddressLine1) ??
                                  source.Properties[CommerceConstants.Billing.AddressLine1];
                target.Address2 = memberAttachedToOrder.GetValue<string>(GlobalConstants.Member.AddressLine2) ??
                                  source.Properties[CommerceConstants.Billing.AddressLine2];
                target.City = memberAttachedToOrder.GetValue<string>(GlobalConstants.Member.City) ??
                              source.Properties[CommerceConstants.Billing.City];
                target.State = memberAttachedToOrder.GetValue<string>(GlobalConstants.Member.State) ??
                    source.Properties[CommerceConstants.Billing.State];
                target.Zip = memberAttachedToOrder.GetValue<string>(GlobalConstants.Member.ZipCode) ??
                              source.Properties[CommerceConstants.Billing.ZipCode];
                target.WorkPhone = memberAttachedToOrder.GetValue<string>(GlobalConstants.Member.WorkPhone) ?? string.Empty;
                target.CellPhone = memberAttachedToOrder.GetValue<string>(GlobalConstants.Member.CellPhone) ?? string.Empty;
                target.HomePhone = memberAttachedToOrder.GetValue<string>(GlobalConstants.Member.HomePhone) ?? string.Empty;
            }
        }

        foreach (var orderLine in source.OrderLines)
        {
            var adjustments = orderLine.TotalPrice.Adjustments;
            var externalOrderLine = new ExternalOrderLine
            {
                Sku = orderLine.Sku,
                Quantity = orderLine.Quantity,
                Price = orderLine.TotalPrice.Value,
                Tax = orderLine.TotalPrice.Value.Tax,
                Discount = orderLine.TotalPrice.TotalAdjustment.WithoutTax,
                BasePrice = orderLine.BasePrice,
                UnitPrice = orderLine.UnitPrice,
                Total = orderLine.TotalPrice
            };
            target.OrderLines.Add(externalOrderLine);
        }

        target.Id = source.Id;
        target.OrderDate = source.CreateDate;
        target.ShippingAddress = OrderPropertyHelper.GetShippingAddress(source);
        target.BillingAddress = OrderPropertyHelper.GetBillingAddress(source);
        target.SubTotalAmount = source.SubtotalPrice;
        target.TaxAmount = source.TotalPrice.Value.Tax;
        target.DiscountAmount = source.TotalPrice.TotalAdjustment.WithoutTax;
        target.NetTotalAmount = source.TotalPrice.Value;
    }
}