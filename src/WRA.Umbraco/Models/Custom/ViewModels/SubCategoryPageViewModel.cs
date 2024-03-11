using Umbraco.Cms.Core.Models.PublishedContent;
using WRA.Umbraco.Models;


namespace WRA.Umbraco.Models.ViewModels;
public class SubCategoryPageViewModel : SubCategoryPage
{
    // The ProductPage model accepts an IPublishedContent item as a constructor
    public SubCategoryPageViewModel(IPublishedContent content, IPublishedValueFallback publishedValueFallback) : base(content, publishedValueFallback)
    {
    }

    public IEnumerable<BundlePage> ProductBundles { get; set; }
    public IEnumerable<ProductPage> Products { get; set; }
}