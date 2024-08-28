using Umbraco.Cms.Core.Models.PublishedContent;

namespace WRA.Umbraco.Models.Custom.ViewModels;
public class BasicContentViewModel(IPublishedContent content, IPublishedValueFallback publishedValueFallback)
    : BasicContent(content, publishedValueFallback)
{
    public bool MemberCanViewPage { get; set; }
}