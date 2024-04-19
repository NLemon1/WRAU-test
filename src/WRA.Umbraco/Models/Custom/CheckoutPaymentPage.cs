using Umbraco.Commerce.Core.Api;
using Umbraco.Commerce.Core.Models;

namespace WRA.Umbraco.Models
{
    public partial class CheckoutPaymentPage
    {
        public CountryReadOnly? PaymentCountry => Order.PaymentInfo.CountryId.HasValue
            ? UmbracoCommerceApi.Instance.GetCountry(Order.PaymentInfo.CountryId.Value)
            : null;
    }
}