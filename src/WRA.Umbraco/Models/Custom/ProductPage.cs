using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Commerce.Core.Models;
using WRA.Umbraco.Extensions;

namespace WRA.Umbraco.Models
{
    public partial class ProductPage
    {
        public CollectionPage? Collection => this.Parent as CollectionPage;
        public IProductSnapshot ProductSnapshot => this.AsProduct() ?? throw new System.InvalidOperationException("ProductPage must be a product");
        public IPublishedContent? PrimaryImage => this.Images?.FirstOrDefault();
        private Guid CurrencyId => ProductSnapshot.Prices.FirstOrDefault()?.CurrencyId ?? this.GetStore().BaseCurrencyId!.Value;
        public ProductPrice MemberPricing => this.MemberPrice.GetPriceFor(CurrencyId);
        public ProductPrice NonMemberPricing => this.Price.GetPriceFor(CurrencyId);
        public IEnumerable<ProductVariant> ChildVariants => this.Children.OfType<ProductVariant>();
        public ProductPrice? DoorPricing => this.DoorPrice?.GetPriceFor(CurrencyId);
    }
}