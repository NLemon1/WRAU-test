using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Umbraco.Commerce.Core.Api;
using Umbraco.Commerce.Core.Models;
using Umbraco.Commerce.Core.ShippingProviders;
using WRA.Umbraco.Extensions;
using WRA.Umbraco.Web.Dtos.External;
using WRA.Umbraco.Web.Services;

namespace WRA.Umbraco.ShippingProviders;
[ShippingProvider("upsProvider", "UPS Shipping", "UPS Shipping provider")]
public class UpsProvider : ShippingProviderBase<UpsProviderSettings>
{
    private readonly IServiceScopeFactory _scopeFactory;
    public override bool SupportsRealtimeRates => true;
    public UpsProvider(UmbracoCommerceContext umbracoCommerce, IServiceScopeFactory scopeFactory)
        : base(umbracoCommerce)
    {
        _scopeFactory = scopeFactory;
    }

    // #todolightburn: No await?
    public async override Task<ShippingRatesResult> GetShippingRatesAsync(ShippingProviderContext<UpsProviderSettings> context, CancellationToken cancellationToken = default(CancellationToken))
    {
        var result = new ShippingRatesResult();
        var options = new List<ShippingRate>();
        var currencyID = context.Order.CurrencyId;
        using (var scope = _scopeFactory.CreateScope())
        {
            var shippingService = scope.ServiceProvider.GetRequiredService<WraShippingService>();
            var response = shippingService.GetShippingRate(context.Order.AsShippingRateRequestDto());
            var price = context.Settings.FallbackRate;
            if (response != null && response.ShippingRate.HasValue)
            {
                price = response.ShippingRate.Value;
            }

            options.Add(new ShippingRate(new Price(price, 0.00m, currencyID), new ShippingOption("1", "UPS Ground"), null));
            result.Rates = options;
        }

        return result;
    }
}

public class UpsProviderSettings
{
    [ShippingProviderSetting(
        Name = "Fallback rate",
        Description = "The price to fallback to if real time rates calculation fails.",
        SortOrder = 100)]
    public decimal FallbackRate { get; set; }
}