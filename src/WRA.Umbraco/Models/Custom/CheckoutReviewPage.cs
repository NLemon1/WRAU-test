using Umbraco.Commerce.Core.Api;
using Umbraco.Commerce.Core.Models;

namespace WRA.Umbraco.Models
{
    public partial class CheckoutReviewPage : IOrderReviewPage
    {
        public CountryReadOnly? PaymentCountry
        {
            get
            {
                var countryId = Order.PaymentInfo.CountryId;
                return countryId != null ? UmbracoCommerceApi.Instance.GetCountry(countryId.Value) : null;
            }
        }

        public CountryReadOnly? ShippingCountry
        {
            get
            {
                var shippingInfoCountryId = Order.ShippingInfo.CountryId;
                return shippingInfoCountryId != null ? UmbracoCommerceApi.Instance.GetCountry(shippingInfoCountryId.Value) : null;
            }
        }
    }
}