using System.Net;
using System.Web.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Umbraco.Cms.Api.Common.Attributes;
using WRA.Umbraco.Web.ModelBinders;
using WRA.UmbracoBridgeServices;

namespace WRA.Umbraco.Web.Controllers.Api;

/// <summary>
/// Provides endpoint for member search and filtering.
/// </summary>
[ApiController]
[MapToApi("bridge-api")]
[Route("member-search")]
public class MemberSearchApiController(IUmbracoBridgeServiceClient bridgeServiceClient, ILogger logger) : ControllerBase
{
    private readonly IUmbracoBridgeServiceClient _bridgeServiceClient = bridgeServiceClient;
    private readonly ILogger _logger = logger.ForContext<MemberSearchApiController>();

    /// <summary>
    /// Search for a member using keywords, filters, and pagination.
    /// </summary>
    /// <returns>Returns a paginated list of members who match the search and filter criteria. See <see cref="PaginationResponseOfMemberDto"/>.</returns>
    /// <remarks>
    /// <para>
    /// Sample request:
    ///
    ///     POST /member/search
    ///     {
    ///         "advancedSearch": {
    ///             "fields": ["Address1"],
    ///             "keyword": "1158"
    ///         },
    ///         "advancedFilter": {
    ///             "logic": "and",
    ///             "filters": [
    ///                 {
    ///                     "field": "MemberTypeId",
    ///                     "operator": "eq",
    ///                     "value": "8655DD5E-5703-4BDA-1940-08DBFA99C6BB"
    ///                 }
    ///             ]
    ///         }
    ///     }
    /// </para>
    /// </remarks>
    [HttpPost("search")]
    public async Task<ActionResult<PaginationResponseOfMemberDto>> SearchMembersAsync([FromNewtonsoftJson] SearchMembersRequest request)
    {
        using LoggerActivity? activity = _logger.StartActivity(LogEventLevel.Information, "Umbraco Cloud Web - {Request}", nameof(SearchMembersAsync));
        try
        {
            var result = await _bridgeServiceClient.Member_SearchMembersAsync(request);
            activity.Complete();
            return Ok(result);
        }
        catch (ApiException ex) when (ex.StatusCode == Convert.ToInt32(HttpStatusCode.NotFound))
        {
            activity.Complete(LogEventLevel.Warning);
            return NotFound();
        }
        catch (Exception ex)
        {
            _logger.Error(ex, "Error searching members from umbraco cloud web api.");
            activity.Complete(LogEventLevel.Error, ex);
            return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        }
    }
}