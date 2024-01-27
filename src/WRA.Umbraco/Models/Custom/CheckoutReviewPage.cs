using Umbraco.Commerce.Core.Api;
using Umbraco.Commerce.Core.Models;

namespace WRA.Umbraco.Models
{
    public partial class CheckoutReviewPage : IOrderReviewPage
    {
        public CartPage CartPage => this.GetHome().CartPage;
        public CountryReadOnly PaymentCountry => UmbracoCommerceApi.Instance.GetCountry(this.Order.PaymentInfo.CountryId.Value);

        public CountryReadOnly ShippingCountry => UmbracoCommerceApi.Instance.GetCountry(this.Order.ShippingInfo.CountryId.Value);
    }
}