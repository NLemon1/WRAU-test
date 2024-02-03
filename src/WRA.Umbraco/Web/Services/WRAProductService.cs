
using Umbraco.Cms.Core;
using Umbraco.Commerce.Core.Services;

namespace WRA.Umbraco.Services;
public class WRAProductService
{
    readonly IProductService _umbracoProductService;
    readonly IPublishedContentQuery _publishedContentQuery;
    readonly SearchService _searchService;

    public WRAProductService(
        IProductService umbracoProductService,
        IPublishedContentQuery publishedContentQuery,
        SearchService searchService
    )
    {

    }
}