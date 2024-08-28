using System.Web.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Umbraco.Cms.Api.Common.Attributes;
using WRA.UmbracoBridgeServices;

namespace WRA.Umbraco.Web.Controllers.Api;

/// <summary>
/// Endpoints for retrieving member ethics training status for a company or association.
/// </summary>
[ApiController]
[MapToApi("bridge-api")]
[Route("member-ethics-training")]
internal class MemberEthicsTrainingApiController(IUmbracoBridgeServiceClient bridgeServiceClient, ILogger logger) : ControllerBase
{
    private readonly IUmbracoBridgeServiceClient _bridgeServiceClient = bridgeServiceClient;
    private readonly ILogger _logger = logger.ForContext<MemberEthicsTrainingApiController>();

    /// <summary>
    /// Retrieve member ethics training for a company by the administrators memberId.
    /// </summary>
    /// <param name="memberId">The Id of the member.</param>
    /// <returns>Returns a list of <see cref="CompanyMemberEthicsTrainingStatusDto"/>.</returns>
    /// <response code="200"> the list of company member ethics statuses.</response>
    /// <response code="404">No member ethics statuses could be found for the provided memberId.</response>
    /// <response code="500">An internal server error was encountered.</response>
    /// <remarks>
    /// Sample request:
    ///
    ///     Guid: 96734B4C-F4D4-4D66-AC2C-AF5A643F7456
    /// </remarks>
    [HttpGet("company/{memberId:guid}")]
    public async Task<ActionResult<List<CompanyMemberEthicsTrainingStatusDto>>> GetCompanyMemberEthicsTrainingStatusesListAsync(DefaultIdType memberId)
    {
        using LoggerActivity? activity = _logger.StartActivity(LogEventLevel.Information, "Umbraco Cloud Web - {Request}", nameof(GetCompanyMemberEthicsTrainingStatusesListAsync));
        try
        {
            _logger.Debug("Requesting office closure list from the common calendar.");
            ICollection<CompanyMemberEthicsTrainingStatusDto>? result = await _bridgeServiceClient.MemberEthicsTraining_GetCompanyMemberEthicsTrainingStatusesListAsync(memberId);
            _logger.Debug("Retrieved the office closure list successfully from the common calendar.");
            activity.Complete();
            return Ok(result);
        }
        catch (ApiException ex) when (ex.StatusCode == Convert.ToInt32(System.Net.HttpStatusCode.NotFound))
        {
            activity.Complete(LogEventLevel.Warning);
            return NotFound();
        }
        catch (Exception ex)
        {
            _logger.Error(ex, "Error retrieving office closures from the common calendar.");
            activity.Complete(LogEventLevel.Error, ex);
            return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        }
    }

}
