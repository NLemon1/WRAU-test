
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Commerce.Core.Models;

namespace WRA.Umbraco.Models;
public partial class BundlePage
{
    public string BundleReferece => this.Key.ToString();
}
