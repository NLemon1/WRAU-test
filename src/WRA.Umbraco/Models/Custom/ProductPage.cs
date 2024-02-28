using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore.ChangeTracking.Internal;
using Microsoft.Extensions.Logging;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Commerce.Cms.Models;
using Umbraco.Commerce.Core.Models;

namespace WRA.Umbraco.Models
{
    public partial class ProductPage
    {

        public CollectionPage Collection => this.Parent as CollectionPage;
        public IProductSnapshot ProductSnapshot => this.AsProduct();
        public IPublishedContent PrimaryImage => this.Images.FirstOrDefault();
        public Guid CurrencyId => ProductSnapshot.Prices.FirstOrDefault().CurrencyId;
        public ProductPrice MemberPricing => this.MemberPrice.GetPriceFor(CurrencyId);
        public ProductPrice NonMemberPricing => this.Price.GetPriceFor(CurrencyId);
        public IEnumerable<ProductVariant> ChildVariants => this.Children.OfType<ProductVariant>();
        public ProductPrice DoorPricing => this.DoorPrice?.GetPriceFor(CurrencyId);

    }
}