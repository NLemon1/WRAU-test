using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore.ChangeTracking.Internal;
using Microsoft.Extensions.Logging;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Commerce.Cms.Models;
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