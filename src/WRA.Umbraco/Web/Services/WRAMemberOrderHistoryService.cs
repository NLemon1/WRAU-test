using global::Umbraco.Commerce.Core.Models;
using global::Umbraco.Commerce.Core.Services;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Umbraco.Cms.Core.Security;
using Umbraco.Cms.Web.Common.Security;
using WRA.Umbraco.Web.Dtos.External;

namespace WRA.Umbraco.Web.Services;
public class MemberOrderHistoryService
{
    private readonly WraExternalApiService _externalServiceClient;
    private readonly ILogger<MemberOrderHistoryService> _logger;

    private static readonly JsonSerializerOptions SerializationOptions = new()
    {
        PropertyNameCaseInsensitive = true
    };
    public MemberOrderHistoryService(IOrderService orderService, WraExternalApiService externalServiceClient, ILogger<MemberOrderHistoryService> logger)
    {
        _externalServiceClient = externalServiceClient;
        _logger = logger;
    }

    public async Task<List<OrderHistoryDto>> GetMemberOrderHistory(string externalMemberID)
    {
        List<OrderHistoryDto> externalOrders;
        try
        {
            externalOrders = await ExternalOrdersAsync(externalMemberID);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to fetch external orders.");
            externalOrders = new List<OrderHistoryDto>(); // continue with whatever was fetched locally
        }

        // var allOrders = completedOrders.Union(externalOrders, new OrderComparer()).ToList();
        return externalOrders;
    }

    private async Task<List<OrderHistoryDto>> ExternalOrdersAsync(string memberId)
    {
        try
        {
            var memberOrderHistoryResponse = await _externalServiceClient.GetMemberOrderHistory(memberId);
            if (memberOrderHistoryResponse.Content == null) return new List<OrderHistoryDto>();
            var memberOrderHistory =
                JsonSerializer.Deserialize<List<OrderHistoryDto>>(
                    memberOrderHistoryResponse.Content,
                    SerializationOptions) ?? [];

            return memberOrderHistory;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error calling WRAExternalServiceClient.GetMemberOrders");
            throw;
        }
    }
}