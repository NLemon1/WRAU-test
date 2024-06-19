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

namespace WRA.Umbraco.Web.Services;
public class WRAShippingService
{
    private readonly WraExternalApiService _externalServiceClient;
    private readonly ILogger<WRAShippingService> _logger;

    private static readonly JsonSerializerOptions SerializationOptions = new()
    {
        PropertyNameCaseInsensitive = true
    };
    public WRAShippingService(
        WraExternalApiService externalServiceClient,
        ILogger<WRAShippingService> logger)
    {
        _externalServiceClient = externalServiceClient;
        _logger = logger;
    }
    public async Task<ExternalShippingRateDto> GetShippingRate(ShippingRateRequestDto request)
    {
        try
        {
            var shippingRatesResponse = await _externalServiceClient.GetShippingRates(request);
            if (shippingRatesResponse.Content == null) return new ExternalShippingRateDto();
            var shippingRate =
                JsonSerializer.Deserialize<ExternalShippingRateDto>(
                    shippingRatesResponse.Content,
                    SerializationOptions);
            return shippingRate;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to fetch shipping rates.");
            return new ExternalShippingRateDto();
        }
    }
}
