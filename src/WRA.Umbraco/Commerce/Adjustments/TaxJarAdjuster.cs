using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.Operations;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Taxjar;
using Umbraco.Commerce.Common;
using Umbraco.Commerce.Common.Logging;
using Umbraco.Commerce.Core.Adjusters;
using Umbraco.Commerce.Core.Calculators;
using Umbraco.Commerce.Core.Models;
using Umbraco.Commerce.Core.Services;
using Umbraco.Commerce.Extensions;
using WRA.Umbraco.Extensions;
using WRA.Umbraco.Web.Dtos.External;
using WRA.Umbraco.Web.Services;

namespace WRA.Umbraco.Commerce.Adjustments;
public class TaxJarAdjuster(IMemoryCache memoryCache,  IUnitOfWorkProvider unitOfWorkProvider, IServiceScopeFactory scopeFactory) : PriceAdjusterBase
{
    public override void ApplyPriceAdjustments(PriceAdjusterArgs args)
    {
        using var scope = scopeFactory.CreateScope();
        var taxJarService = scope.ServiceProvider.GetRequiredService<TaxJarExternalApiService>();

        string address1 = args.Order.Properties["shippingAddressLine1"].SafeString();
        if (!string.IsNullOrEmpty(address1) && args.Order != null && args.Order.OrderLines.Count > 0 && args.Order.ShippingInfo.ShippingMethodId.HasValue)
        {
            // get the rest of the address

            string zipCode = args.Order.Properties["shippingZipCode"].SafeString();
            string cacheKey = "Tax-" + args.Order.CartNumber + "-" + zipCode + "-" + args.Order.OrderLines.Sum(s => s.Quantity) + "-" + args.Order.OrderLines.Sum(o => o.BasePrice.WithoutAdjustments.WithoutTax);
            var cacheData = memoryCache.Get<TaxResponse>(cacheKey);
            if (cacheData == null || cacheData.Tax == null)
            {
                var expirationTime = DateTimeOffset.Now.AddMinutes(5.0);
                cacheData = taxJarService.GetTaxForOrder(args.Order);
                memoryCache.Set(cacheKey, cacheData, expirationTime);
            }

            if (cacheData != null)
            {
                var price = new Price(0, cacheData.Tax.AmountToCollect, args.Order.CurrencyId);
                var adjustment = new TaxJarAdjustment("Tax", "TAX", price);

                // Add the adjustment to the total price
                args.TotalPriceAdjustments.Add(adjustment);
            }
        }
    }
}
