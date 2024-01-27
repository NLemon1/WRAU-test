
using Umbraco.Commerce.Core.Models;

namespace WRA.Umbraco.Models;

public partial class CheckoutPage
{
    public OrderReadOnly Order => this.GetCurrentOrder();

    public IEnumerable<CheckoutStepPage> Steps => Children.OfType<CheckoutStepPage>();
}