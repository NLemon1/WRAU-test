using Hangfire.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using WRA.Umbraco.Web.Dtos.External;


namespace WRA.Umbraco.Web.Services;
public class MemberCommitteesService
{
    private readonly WraExternalApiService _externalServiceClient;
    private readonly ILogger<MemberCommitteesService> _logger;

    private static readonly JsonSerializerOptions SerializationOptions = new()
    {
        PropertyNameCaseInsensitive = true
    };
    public MemberCommitteesService(
        WraExternalApiService externalServiceClient,
        ILogger<MemberCommitteesService> logger)
    {
        _externalServiceClient = externalServiceClient;
        _logger = logger;
    }
    public async Task<List<ExternalMemberCommitteeDto>> GetMemberCommittees(string externalMemberID)
    {
        try
        {
            var memberCommitteeResponse = await _externalServiceClient.GetMemberCommittees(externalMemberID);
            if (memberCommitteeResponse.Content == null) return new List<ExternalMemberCommitteeDto>();
            var memberCommittees =
                JsonSerializer.Deserialize<List<ExternalMemberCommitteeDto>>(
                    memberCommitteeResponse.Content,
                    SerializationOptions);
            return memberCommittees;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to fetch member committees.");
            return new List<ExternalMemberCommitteeDto>();
        }
    }
}
