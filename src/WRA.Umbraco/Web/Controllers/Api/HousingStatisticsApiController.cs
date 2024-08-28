using System.Web.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Umbraco.Cms.Api.Common.Attributes;
using WRA.UmbracoBridgeServices;

namespace WRA.Umbraco.Web.Controllers.Api;

/// <summary>
/// Provides endpoint for retrieving the data necessary to generate the housing statistics reports.
/// </summary>
[ApiController]
[MapToApi("bridge-api")]
[Route("housing-statistics-data")]
public class HousingStatisticsApiController(IUmbracoBridgeServiceClient bridgeServiceClient, ILogger logger) : ControllerBase
{
    private readonly IUmbracoBridgeServiceClient _bridgeServiceClient = bridgeServiceClient;
    private readonly ILogger _logger = logger.ForContext<HousingStatisticsApiController>();

    /// <summary>
    /// Retrieve data for generating the housing statistics reports using google charts.
    /// </summary>
    /// <returns>A list of <see cref="HousingStatisticDto"/> containing data necessary to render the reports and charts.</returns>
    /// <response code="200">Returns the Housing statistics dto with populated datasets.</response>
    /// <response code="404">If no statistics could be found.</response>
    /// <response code="500">If there was an internal server error.</response>
    [HttpGet]
    public async Task<ActionResult<List<HousingStatisticDto>>> GetHousingStatisticListAsync()
    {

        using LoggerActivity? activity = _logger.StartActivity(LogEventLevel.Information, "Umbraco Cloud Web - {Request}", nameof(GetHousingStatisticListAsync));
        try
        {
            _logger.Debug("Retrieving housing statistics from the bridge api.");
            ICollection<HousingStatisticDto>? result = await _bridgeServiceClient.HousingStatistics_GetHousingStatisticListAsync();
            activity.Complete();
            return Ok(result);
        }
        catch (ApiException ex) when (ex.StatusCode == Convert.ToInt32(System.Net.HttpStatusCode.NotFound))
        {
            _logger.Debug(ex, "Housing statistics not found when calling the bridge api.");
            activity.Complete(LogEventLevel.Warning);
            return NotFound();
        }
        catch (Exception ex)
        {
            _logger.Error(ex, "Error retrieving housing statistics from the bridge api.");
            activity.Complete(LogEventLevel.Error, ex);
            return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        }
    }
}
