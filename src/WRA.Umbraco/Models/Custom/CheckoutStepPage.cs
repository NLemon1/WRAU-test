using Umbraco.Cms.Core.DynamicRoot.Origin;
using Umbraco.Commerce.Core.Api;
using Umbraco.Commerce.Core.Models;
using WRA.Umbraco.Extensions;

namespace WRA.Umbraco.Models;

public partial class CheckoutStepPage
{
    public CartPage? CartPage => this.GetHome().CartPage;
    public CheckoutPage? CheckoutPage => this.GetCheckoutPage();
    public virtual OrderReadOnly Order => this.GetCurrentOrder();
    public string ReadableShippingAddress => Order.ReadableShippingAddress();

    public string? MemberAttachedToOrder => Order.CustomerInfo.CustomerReference;

    public CheckoutStepPage? CurrentStep => CheckoutPage?.Steps?.FirstOrDefault(x => x.Id == this.Id);

    public CheckoutStepPage? PreviousStep => CheckoutPage.Steps.TakeWhile(x => !x.Id.Equals(this.Id)).LastOrDefault();

    public CheckoutStepPage? NextStep => CheckoutPage.Steps.SkipWhile(x => !x.Id.Equals(this.Id)).Skip(1).FirstOrDefault();

    public PaymentMethodReadOnly? PaymentMethod => Order?.PaymentInfo.PaymentMethodId != null
? UmbracoCommerceApi.Instance.GetPaymentMethod(Order.PaymentInfo.PaymentMethodId.Value)
        : null;
    public ShippingMethodReadOnly? ShippingMethod => Order?.ShippingInfo.ShippingMethodId != null
        ? UmbracoCommerceApi.Instance.GetShippingMethod(Order.ShippingInfo.ShippingMethodId.Value)
        : null;
}