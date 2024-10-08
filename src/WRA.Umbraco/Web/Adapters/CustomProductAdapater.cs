using Examine;
using Microsoft.Extensions.DependencyInjection;
using Umbraco.Cms.Core.Security;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Core.Web;
using Umbraco.Commerce.Cms.Adapters;
using Umbraco.Commerce.Cms.Content;
using Umbraco.Commerce.Core.Models;

namespace WRA.Umbraco.Web.Adapters;

public class CustomProductAdapter : UmbracoProductAdapter
{
    private readonly IServiceScopeFactory _scopeFactory;

    public CustomProductAdapter(
        IUmbracoContextFactory umbracoContextFactory,
        IContentService contentService,
        PublishedContentWrapperFactory publishedContentWrapperFactory,
        IExamineManager examineManager,
        IServiceScopeFactory scopeFactory)
     : base(umbracoContextFactory, contentService, publishedContentWrapperFactory, examineManager)
    {
        _scopeFactory = scopeFactory;
    }

    public override IProductSnapshot? GetProductSnapshot(Guid storeId, string productReference, string? productVariantReference, string languageIsoCode)
    {
        if (!TryGetProductNode(productReference, productVariantReference, out var productNode, out var productVariantNode))
        {
            return null;
        }

        // you cannot inject scoped services into a singleton (which this class is)..
        // so lets get the services via the base scope provider!
        using var scope = _scopeFactory.CreateScope();
        var mm = scope.ServiceProvider.GetRequiredService<IMemberManager>();

        // get the current member (customer/visitor) logged in...
        var member = mm.GetCurrentMemberAsync().GetAwaiter().GetResult();
        bool useMemberPricing = false;

        if (member != null)
        {
            // get all member groups (roles) tied to the request user.
            var memberRoles = mm.GetRolesAsync(member).GetAwaiter().GetResult();

            // if they are part of the "member pricing" group, then pass the idicator.
            if (memberRoles.Any(r => r.Equals("Member Pricing", StringComparison.OrdinalIgnoreCase)))
            {
                useMemberPricing = true;
            }
        }

        // now generate the snapshow based on our custom implementation..
        return new CustomProductSnapshot(
            productNode,
            productVariantNode,
            languageIsoCode,
            productReference,
            productVariantReference ?? string.Empty,
            storeId,
            memberPrice: useMemberPricing);
    }

    public override IProductSnapshot? GetProductSnapshot(Guid storeId, string productReference, string languageIsoCode)
    {
        return GetProductSnapshot(storeId, productReference, null, languageIsoCode);
    }
}
