using System.Collections.Generic;
using Umbraco.Commerce.Core.Api;
using Umbraco.Commerce.Core.Models;

namespace WRA.Umbraco.Models
{
    public partial class CheckoutPaymentMethodPage
    {
        public CountryReadOnly PaymentCountry => Order.PaymentInfo.CountryId.HasValue
            ? UmbracoCommerceApi.Instance.GetCountry(Order.PaymentInfo.CountryId.Value)
            : null;

        public IEnumerable<PaymentMethodReadOnly> PaymentMethods => UmbracoCommerceApi.Instance.GetPaymentMethods(this.GetStore().Id);
    }
}