using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Umbraco.Commerce.Core.Api;
using Umbraco.Commerce.Core.Models;
using Umbraco.Commerce.Core.ShippingProviders;

namespace WRA.Umbraco.ShippingProviders;
[ShippingProvider("shippingProvider", "Custom Shipping", "Custom Shipping")]
public class ShippingProvider : ShippingProviderBase<PickUpProviderSettings>
{
    public ShippingProvider(UmbracoCommerceContext umbracoCommerce)
        : base(umbracoCommerce)
    { }

    public async override Task<ShippingRatesResult> GetShippingRatesAsync(ShippingProviderContext context, CancellationToken cancellationToken = default(CancellationToken))
    {
        var result = new ShippingRatesResult();
        var options = new List<ShippingRate>();
        var currencyID = context.Order.CurrencyId;
        //options.Add(new ShippingRate(new Price(0.00m, 0.00m, currencyID), new ShippingOption("1", "Pickup"), null));
        options.Add(new ShippingRate(new Price(19.99m, 0.00m, currencyID), new ShippingOption("2", "UPS Ground"), null));
        result.Rates = options;
        return result;
    }
}

public class PickUpProviderSettings
{
    [ShippingProviderSetting(Name = "API Key",
        Description = "The API key to the shipping opperators API",
        SortOrder = 100)]
    public string ApieKey { get; set; }
}