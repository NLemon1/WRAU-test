using Umbraco.Cms.Core.Models.PublishedContent;
using WRA.Umbraco.Models;

namespace WRA.Umbraco.Models.ViewModels;
public class BasicContentViewModel : BasicContent
{
    public bool MemberCanViewPage { get; set; }
    public BasicContentViewModel(IPublishedContent content, IPublishedValueFallback publishedValueFallback)
        : base(content, publishedValueFallback)
    {

    }
}