using Examine;
using Microsoft.Extensions.DependencyInjection;
using Umbraco.Cms.Core;
using Umbraco.Cms.Core.Models;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Core.PublishedCache;
using Umbraco.Cms.Core.Security;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Core.Web;
using Umbraco.Cms.Web.Common.Security;
using Umbraco.Commerce.Cms.Adapters;
using Umbraco.Commerce.Cms.Content;
using Umbraco.Commerce.Cms.Models;
using Umbraco.Commerce.Core.Adapters;
using Umbraco.Commerce.Core.Api;
using Umbraco.Commerce.Core.Models;
using Umbraco.Commerce.Core.Services;
using Umbraco.Commerce.Extensions;
using WRA.Umbraco;
using WRA.Umbraco.Models;
using WRA.Umbraco.Services;

public class CustomProductAdapater : UmbracoProductAdapter
{
    // protected readonly IUmbracoContextFactory _umbracoContextFactory;
    // private readonly IPublishedContentQuery _publishedContentQuery;
    // private readonly SearchService _searchService;
    // protected readonly IExamineManager _examineManager;
    // protected readonly PublishedContentWrapperFactory _publishedContentWrapperFactory;
    // protected readonly IContentService _contentService;
    private readonly IServiceScopeFactory _scopeFactory;


    public CustomProductAdapater(
        IUmbracoContextFactory umbracoContextFactory,
        IContentService contentService,
        PublishedContentWrapperFactory publishedContentWrapperFactory,
        IExamineManager examineManager,
        IServiceScopeFactory scopeFactory
)
     : base(umbracoContextFactory, contentService, publishedContentWrapperFactory, examineManager)
    {
        _scopeFactory = scopeFactory;
    }

    public override IProductSnapshot GetProductSnapshot(Guid storeId, string productReference, string productVariantReference, string languageIsoCode)
    {
        if (!TryGetProductNode(productReference, productVariantReference, out var productNode, out var productVariantNode))
        {
            return null;
        }


        using var scope = _scopeFactory.CreateScope();
        IMemberService memberService = scope.ServiceProvider.GetRequiredService<IMemberService>();
        IMemberManager mm = scope.ServiceProvider.GetRequiredService<IMemberManager>();



        var member = mm.GetCurrentMemberAsync().GetAwaiter().GetResult();
        // var member = memberService.GetCurrentMemberAsync().GetAwaiter().GetResult();
        bool useMemberPricing = false;

        if (member != null)
        {
            var memberRoles = mm.GetRolesAsync(member).GetAwaiter().GetResult();

            if (memberRoles.Any(r => r.Equals("Member Pricing", StringComparison.OrdinalIgnoreCase)))
            {
                useMemberPricing = true;
            }

        }
        return new CustomProductSnapshot(
            productNode,
            productVariantNode,
            languageIsoCode,
            productReference,
            productVariantReference,
            storeId,
            memberPrice: useMemberPricing
            );
    }
    public override IProductSnapshot GetProductSnapshot(Guid storeId, string productReference, string languageIsoCode)
    {
        return GetProductSnapshot(storeId, productReference, null, languageIsoCode);
    }






}
