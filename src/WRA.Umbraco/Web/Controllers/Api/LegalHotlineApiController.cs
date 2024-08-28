using System.Web.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Umbraco.Cms.Api.Common.Attributes;
using WRA.UmbracoBridgeServices;

namespace WRA.Umbraco.Web.Controllers.Api;

/// <summary>
/// Provides endpoint for creating legal hotline calls.
/// </summary>
[ApiController]
[MapToApi("bridge-api")]
[Route("legal-hotline")]
public class LegalHotlineApiController(IUmbracoBridgeServiceClient bridgeServiceClient, ILogger logger) : ControllerBase
{
    private readonly IUmbracoBridgeServiceClient _bridgeServiceClient = bridgeServiceClient;
    private readonly ILogger _logger = logger.ForContext<LegalHotlineApiController>();

    /// <summary>
    /// Creates a legal hotline call and adds it to the hotline queue for staff attorneys to answer.
    /// </summary>
    /// <param name="request">The request object containing the details for the new legal hotline call.</param>
    /// <returns>The call number associated with the legal hotline call (This serves as a secondary Id in the legal hotline application).</returns>
    /// <response code="200">Successfully created a hotline call with the call. (Call number returned).</response>
    /// <response code="500">An internal server error was thrown.</response>
    [HttpPost]
    public async Task<ActionResult<int>> CreateLegalHotlineCallAsync([FromBody] CreateLegalHotlineCallRequest request)
    {
        using LoggerActivity? activity = _logger.StartActivity(LogEventLevel.Information, "Umbraco Cloud Web - {Request}", nameof(CreateLegalHotlineCallAsync));
        try
        {
            int? result = await _bridgeServiceClient.LegalHotlineCall_CreateLegalHotlineCallAsync(request);
            activity.Complete();
            return Ok(result);
        }
        catch (Exception ex)
        {
            _logger.Error(ex, "Error retrieving housing statistics from the bridge api.");
            activity.Complete(LogEventLevel.Error, ex);
            return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        }
    }

}
