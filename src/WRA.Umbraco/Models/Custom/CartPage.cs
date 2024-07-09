using Umbraco.Commerce.Core.Models;
using WRA.Umbraco.Extensions;

namespace WRA.Umbraco.Models
{
    public partial class CartPage
    {
        public CheckoutPage? CheckoutPage => this.GetHomePage().CheckoutPage;

        public OrderReadOnly Order => this.GetCurrentOrder();
    }
}
