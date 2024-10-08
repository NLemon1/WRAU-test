namespace WRA.Umbraco.Models
{
    public partial class Home
    {
        // public SearchPage SearchPage => this.Children.OfType<SearchPage>().FirstOrDefault();

        public CartPage? CartPage => this.Children.OfType<CartPage>().FirstOrDefault();

        public IEnumerable<CategoryPage>? CategoryPages => this.Children.FirstOrDefault(x => x.ContentType.Alias == CategoriesPage.ModelTypeAlias)?.Children.OfType<CategoryPage>();

        public CheckoutPage? CheckoutPage => this.Children.OfType<CheckoutPage>().FirstOrDefault();
    }
}
