using Umbraco.Commerce.Core.Models;

namespace WRA.Umbraco.Models
{
    public partial class CartPage
    {
        public CheckoutPage CheckoutPage => this.GetHomePage().CheckoutPage;

        public OrderReadOnly Order => this.GetCurrentOrder();
    }
}
