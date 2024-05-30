using global::Umbraco.Commerce.Core.Models;
using global::Umbraco.Commerce.Core.Services;
using Microsoft.Extensions.Logging;
using NUglify.JavaScript.Syntax;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Umbraco.Cms.Core.PropertyEditors;
using Umbraco.Cms.Core.Security;
using Umbraco.Cms.Web.Common.Security;
using WRA.Umbraco.Web.Dtos.External;
using WRA.Umbraco.Web.Dtos.MyWRA;

namespace WRA.Umbraco.Web.Services;
public class MemberMarketingSubscriptionService
{
    private readonly WraExternalApiService _externalServiceClient;
    private readonly ILogger<MemberMarketingSubscriptionService> _logger;

    private static readonly JsonSerializerOptions SerializationOptions = new()
    {
        PropertyNameCaseInsensitive = true
    };
    public MemberMarketingSubscriptionService(
        WraExternalApiService externalServiceClient,
        ILogger<MemberMarketingSubscriptionService> logger)
    {
        _externalServiceClient = externalServiceClient;
        _logger = logger;
    }

    public async Task<List<ExternalMemberMarketingSubscriptionDto>> GetMemberMarketingSubscriptions(string externalMemberID)
    {
        try
        {
            var memberSubscriptionResponse = await _externalServiceClient.GetMemberMarketingSubscriptions(externalMemberID);
            if (memberSubscriptionResponse.Content == null) return new List<ExternalMemberMarketingSubscriptionDto>();
            var memberSubscriptions =
                JsonSerializer.Deserialize<List<ExternalMemberMarketingSubscriptionDto>>(
                    memberSubscriptionResponse.Content,
                    SerializationOptions);
            return memberSubscriptions;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to fetch member subscriptions.");
            return new List<ExternalMemberMarketingSubscriptionDto>();
        }
    }

    public async void UpdateMarketingSubscription(MemberMarketingSubscriptionPreferenceDto subscription)
    {
        try
        {
            await _externalServiceClient.UpdateMemberMarketingSubscription(subscription.SubscriptionID, subscription.IsActive);

        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to update member subscriptions.");
        }
    }
}