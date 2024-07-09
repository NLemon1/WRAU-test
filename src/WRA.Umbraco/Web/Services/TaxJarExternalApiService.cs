using Hangfire.Common;
using MassTransit.SagaStateMachine;
using Microsoft.Extensions.Logging;
using RestSharp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Taxjar;
using Umbraco.Commerce.Core.Api;
using Umbraco.Commerce.Core.Models;
using WRA.Umbraco.Configuration;
using WRA.Umbraco.Extensions;
using WRA.Umbraco.Repositories;
using WRA.Umbraco.Web.Dtos.External;
using static Umbraco.Commerce.Cms.Constants.Trees;

namespace WRA.Umbraco.Web.Services;
public class TaxJarExternalApiService(TaxJarApiSettings settings, ILogger<TaxJarExternalApiService> logger, ProductPageRepository productPageRepository, ICommerceApi commerceApi)
{
    private static readonly JsonSerializerOptions SerializationOptions = new()
    {
        PropertyNameCaseInsensitive = true,
        PropertyNamingPolicy = JsonNamingPolicy.SnakeCaseLower
    };

    public TaxResponse GetTaxForOrder(OrderReadOnly order)
    {
        try
        {
            RestClientOptions restClientOptions = new RestClientOptions(settings.BaseUrl)
            {
                UserAgent = this.GetUserAgent(),
            };
            var client = new RestClient(restClientOptions);
            var request = new RestRequest("taxes", Method.Post);
            request.AddHeader("Authorization", "Bearer " + settings.ApiKey);
            request.AddHeader("Content-Type", "application/json");
            var json = ConstructTaxJarTaxRequest(order);
            request.AddBody(JsonSerializer.Serialize(json));
            var response = client.Post(request);
            if (response.Content == null) return new TaxResponse();
            var taxes =
                JsonSerializer.Deserialize<TaxResponse>(
                    response.Content,
                    SerializationOptions) ?? new TaxResponse();
            return taxes;
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Failed to get tax for order.");
            return new TaxResponse();

        }
    }

    private object ConstructTaxJarTaxRequest(OrderReadOnly order)
    {
        // Default to WRA address for pickup/nonship orders
        var address1 = "4801 Forest Run Rd.";
        string city = "Madison";
        string state = "WI";
        string zipCode = "53704";
        if (order.ShippingInfo.ShippingMethodId != null)
        {
            var shippingMethod = commerceApi.GetShippingMethod(order.ShippingInfo.ShippingMethodId.Value);

            if (shippingMethod.Alias != "pickup" && shippingMethod.Alias != "noShipping")
            {
                address1 = order.Properties["shippingAddressLine1"].SafeString();
                city = order.Properties["shippingCity"].SafeString();
                state = order.Properties["shippingState"].SafeString();
                zipCode = order.Properties["shippingZipCode"].SafeString();
            }
        }

        var lines = new List<object>();
        foreach (var product in order.OrderLines)
        {
            var productPage = productPageRepository.GetBySku(product.Sku);
            lines.Add(new
            {
                id = product.Id,
                quantity = product.Quantity,
                product_tax_code = productPage.SalesTaxCategoryCode,
                unit_price = product.BasePrice.WithoutAdjustments.WithoutTax,
            });
        }

        var request = new
        {
            from_country = "US",
            from_zip = "53704",
            from_state = "WI",
            from_city = "Madison",
            from_street = "4801 Forest Run Rd.",
            to_country = "US",
            to_zip = zipCode,
            to_state = state,
            to_city = city,
            to_street = address1,
            amount = order.SubtotalPrice.WithoutAdjustments.WithoutTax,
            shipping = order.ShippingInfo.TotalPrice.WithoutAdjustments.WithoutTax,
            nexus_addresses = new[]
            {
                new
                {
                  id = "Main Location",
                  country = "US",
                  zip = "53704",
                  state = "WI",
                  city = "Madison",
                  street = "4801 Forest Run Rd.",
                }
            },
            line_items = lines.ToArray()
        };
        return request;
    }

    private string GetUserAgent()
    {
        string platform = RuntimeInformation.OSDescription;
        string arch = RuntimeInformation.OSArchitecture.ToString();
        string framework = RuntimeInformation.FrameworkDescription;

        string version = GetType().Assembly.GetName().Version.ToString(3);

        return $"TaxJar/.NET ({platform}; {arch}; {framework}) taxjar.net/{version}";
    }

}
