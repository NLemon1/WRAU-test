using Umbraco.Commerce.Core.Models;
using WRA.Umbraco.Extensions;

namespace WRA.Umbraco.Models
{
    public partial class SubCategoryPage
    {
        public IEnumerable<BundlePage> ProductBundles { get; set; } = [];
        public IEnumerable<ProductPage> Products { get; set; } = [];

        public OrderReadOnly Order => this.GetOrCreateOrder();
    }
}