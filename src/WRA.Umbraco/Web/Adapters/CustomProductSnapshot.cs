
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Commerce.Cms.Adapters;
using Umbraco.Commerce.Core.Models;
using WRA.Umbraco.Models;

public class CustomProductSnapshot : UmbracoProductSnapshot
{
    private readonly UmbracoProductSnapshot _snapshot;
    private List<ProductPrice> memberPricing;

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

        _snapshot = snapshot;
        memberPricing = new List<ProductPrice>();

        if (memberPrice)
        {
            var product = content as IProductComp;


            foreach (ProductPrice productPrice in snapshot.Prices)
            {
                if (product.MemberPrice != null && product.MemberPrice.Any() && memberPrice)
                {
                    memberPricing.Add(product.MemberPrice.GetPriceFor(productPrice.CurrencyId));
                }
            }
        }
    }

    public override IEnumerable<ProductPrice> Prices => memberPricing.Any() ? memberPricing : _snapshot.Prices;
}



