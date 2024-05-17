using global::Umbraco.Commerce.Core.Models;
using global::Umbraco.Commerce.Core.Services;
using Microsoft.Extensions.Logging;
using NUglify.JavaScript.Syntax;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Umbraco.Cms.Core.Security;
using Umbraco.Cms.Web.Common.Security;
using WRA.Umbraco.Web.Dtos.External;
using WRA.Umbraco.Web.Dtos.MyWRA;

namespace WRA.Umbraco.Web.Services;
public class MemberDonationService
{
    private readonly WraExternalApiService _externalServiceClient;
    private readonly ILogger<MemberDonationService> _logger;

    private static readonly JsonSerializerOptions SerializationOptions = new()
    {
        PropertyNameCaseInsensitive = true
    };
    public MemberDonationService(
        WraExternalApiService externalServiceClient,
        ILogger<MemberDonationService> logger)
    {
        _externalServiceClient = externalServiceClient;
        _logger = logger;
    }

    public async Task<List<ExternalMemberDonationdDto>> GetMemberDonations(string externalMemberID)
    {
        try
        {
            var memberDonationResponse = await _externalServiceClient.GetMemberDonations(externalMemberID);
            if (memberDonationResponse.Content == null) return new List<ExternalMemberDonationdDto>();
            var memberDonations =
                JsonSerializer.Deserialize<List<ExternalMemberDonationdDto>>(
                    memberDonationResponse.Content,
                    SerializationOptions);
            return memberDonations;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to fetch member donations.");
            return new List<ExternalMemberDonationdDto>();
        }
    }
}