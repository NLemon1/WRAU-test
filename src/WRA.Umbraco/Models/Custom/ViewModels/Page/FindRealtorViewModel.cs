using Microsoft.AspNetCore.Mvc.Rendering;
using Umbraco.Cms.Core.Models.PublishedContent;

namespace WRA.Umbraco.Models.Custom.ViewModels;

// Inherits from PublishedContentWrapped so we get the inherited properties like SEO, Name from umbraco.
public class FindRealtorViewModel(IPublishedContent content, IPublishedValueFallback publishedValueFallback) : PublishedContentWrapped(content, publishedValueFallback)
{
    // Recaptcha is only required for users who are not logged in.
    public bool IsRecaptchaRequired { get; set; } = true;

    // Local Boards
    public SelectList? BoardList { get; set; }

    // States or Provinces
    public SelectList? StateList { get; set; }

    // Designations
    public MultiSelectList? DesignationList { get; set; }

    // Languages
    public SelectList? LanguageList { get; set; }

    // Search Request
    public FindRealtorSearchRequest? SearchRequest { get; set; }

}
