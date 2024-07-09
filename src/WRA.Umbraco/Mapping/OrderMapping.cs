using Umbraco.Cms.Core.Mapping;
using Umbraco.Commerce.Core.Api;
using Umbraco.Commerce.Core.Models;
using Umbraco.Commerce.Core.Services;
using Umbraco.Commerce.Extensions;
using WRA.Umbraco.Contracts;
using WRA.Umbraco.Dtos;
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
        mapper.Define<OrderReadOnly, UmbracoOrderComplete>((_, _) => new UmbracoOrderComplete(), UmbracoOrderToOrderEvent);
    }

    private void UmbracoOrderToOrderEvent(OrderReadOnly source, UmbracoOrderComplete target, MapperContext context)
    {
        // var country = countryService.GetCountry(source.)
        var memberAttachedToOrder = memberRepository.GetbyKey(source.CustomerInfo.CustomerReference.SafeGuid());
        if (memberAttachedToOrder != null)
        {
            var companyOnMember =
                mappingHelper.GetRelatedContent(memberAttachedToOrder, GlobalConstants.Member.Company);
            if (companyOnMember != null)
            {
                target.CompanyId = companyOnMember.Value(GlobalConstants.ExternalId).SafeGuid();
            }

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

        foreach (var orderLine in source.OrderLines)
        {
            var externalOrderLine = new UmbracoOrderLineItemDto
            {
                Sku = orderLine.Sku,
                Quantity = orderLine.Quantity,
                Price = orderLine.TotalPrice.Value,
                Tax = orderLine.TotalPrice.Value.Tax,
                Discount = orderLine.TotalPrice.TotalAdjustment.WithoutTax,
                BasePrice = orderLine.BasePrice,
                UnitPrice = orderLine.UnitPrice,
                Total = orderLine.TotalPrice,
                UmbracoOrderId = source.Id,
                LineItemId = orderLine.Id,
            };
            target.OrderLines.Add(externalOrderLine);
        }

        target.FirstName = source.Properties[umbracoCommerceConstants.Properties.Customer.FirstNamePropertyAlias];
        target.LastName = source.Properties[umbracoCommerceConstants.Properties.Customer.LastNamePropertyAlias];
        target.Id = source.Id;
        target.OrderNumber = source.OrderNumber;
        target.OrderDate = source.CreateDate;
        if (memberAttachedToOrder != null)
        {
            target.MemberId = memberAttachedToOrder.GetValue<Guid>(GlobalConstants.ExternalId);
        }

        target.ShippingAddress = OrderPropertyHelper.GetShippingAddress(source);
        target.ShippingAddress.MemberId = target.MemberId;
        target.BillingAddress = OrderPropertyHelper.GetBillingAddress(source);
        target.BillingAddress.MemberId = target.MemberId;
        target.SubTotalAmount = source.SubtotalPrice;
        target.TaxAmount = source.TotalPrice.Value.Tax;
        target.DiscountAmount = source.TotalPrice.TotalAdjustment.WithoutTax;
        target.NetTotalAmount = source.TotalPrice.Value;
    }
}