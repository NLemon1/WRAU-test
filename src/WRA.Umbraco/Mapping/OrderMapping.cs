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
                target.Phone = memberAttachedToOrder.GetValue<string>(GlobalConstants.Member.Telephone) ?? string.Empty;
            }
        }

        foreach (var adjustment in source.TotalPrice.Adjustments)
        {
            // if (adjustment.Name == )
            // {
            //     target.DiscountAmount = adjustment.Value;
            // }

        }
        target.Id = source.Id;
        target.OrderDate = source.CreateDate;
        target.ShippingAddress = OrderHelper.GetShippingAddress(source);
        target.BillingAddress = OrderHelper.GetBillingAddress(source);
        target.SubTotalAmount = source.SubtotalPrice;
        target.TaxAmount = source.TaxRate.Value;
        target.DiscountAmount = source.TotalPrice.TotalAdjustment.WithoutTax;
        target.NetTotalAmount = source.TotalPrice.Value;
    }

}