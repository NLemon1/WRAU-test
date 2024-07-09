using Hangfire;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using Microsoft.Extensions.Logging;
using Umbraco.Cms.Core.Cache;
using Umbraco.Cms.Core.Models;
using Umbraco.Cms.Core.Scoping;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Core.Web;
using WRA.Umbraco.Contracts;
using WRA.Umbraco.Extensions;
using WRA.Umbraco.Helpers.Constants;
using WRA.Umbraco.Models;
using WRA.Umbraco.Repositories;
using WRA.Umbraco.Web.Dtos.External;
using Microsoft.Extensions.DependencyInjection;
using Umbraco.Commerce.Common;

namespace WRA.Umbraco.Web.Services;
public class WraShippingService(
    ILogger<WraShippingService> logger,
    IServiceScopeFactory scopeFactory)
{
    private static readonly JsonSerializerOptions SerializationOptions = new()
    {
        PropertyNameCaseInsensitive = true
    };

    public ExternalShippingRateDto? GetShippingRate(ShippingRateRequestDto request)
    {
        using var scope = scopeFactory.CreateScope();
        var myService = scope.ServiceProvider.GetRequiredService<WraExternalApiService>();
        try
        {
            var shippingRatesResponse = myService.GetShippingRates(request);
            if (shippingRatesResponse.Content == null) return new ExternalShippingRateDto();
            var shippingRate =
                JsonSerializer.Deserialize<ExternalShippingRateDto>(
                    shippingRatesResponse.Content,
                    SerializationOptions);
            return shippingRate;
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Failed to fetch shipping rates.");
            return new ExternalShippingRateDto();
        }
    }
}
