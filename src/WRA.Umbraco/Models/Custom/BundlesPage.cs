using WRA.Umbraco.Extensions;

namespace WRA.Umbraco.Models;

public partial class BundlesPage
{
    public IEnumerable<BundlePage> Bundles => Children.OfType<BundlePage>();

    public Guid DefaultCurrency => this.GetStore().BaseCurrencyId!.Value;
    public IEnumerable<ProductPage> ProductsOnBundle(BundlePage bundle)
    {
        if (bundle.BundledProducts != null) return bundle.BundledProducts.OfType<ProductPage>();
        return Enumerable.Empty<ProductPage>();
    }
}