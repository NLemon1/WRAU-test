
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Core.Scoping;
using Umbraco.Commerce.Cms.Adapters;
using Umbraco.Commerce.Core.Models;
using WRA.Umbraco.Models;

public class CustomProductSnapshot : UmbracoProductSnapshot
{
    private readonly UmbracoProductSnapshot _snapshot;
    private List<ProductPrice> memberPricing;
    private ICoreScopeProvider coreScopeProvider;

    public CustomProductSnapshot(
        IPublishedContent content,
        IPublishedElement variantContent,
        string languageIsoCode,
        string productReference,
        string productVariantReference,
        Guid storeId,
        bool memberPrice = false
        )
             : base(
                content,
                variantContent,
                languageIsoCode,
                productReference,
                productVariantReference,
                storeId)
    {
        UmbracoProductSnapshot snapshot = new UmbracoProductSnapshot(
            content, variantContent, languageIsoCode, productReference, productVariantReference, storeId);

        // get the default snapshot from the base class to start..
        _snapshot = snapshot;
        memberPricing = new List<ProductPrice>();

        // If the product adapter requests member pricing...
        if (memberPrice)
        {
            using var scope = coreScopeProvider.CreateCoreScope(autoComplete: true);

            // cast as our product composition..
            var product = content as IProductComp;
            // for all pricing pairs (currencyid : amount), 
            // remove and replace with the MemberPrice field that exists on product compositions
            foreach (ProductPrice productPrice in snapshot.Prices)
            {
                if (product?.MemberPrice != null && product.MemberPrice.Any() && memberPrice)
                {
                    memberPricing.Add(product.MemberPrice.GetPriceFor(productPrice.CurrencyId));
                }
            }
        }
    }

    public override IEnumerable<ProductPrice> Prices => memberPricing.Any() ? memberPricing : _snapshot.Prices;
}



