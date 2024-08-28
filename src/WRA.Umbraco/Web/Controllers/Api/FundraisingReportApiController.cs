using System.Net;
using System.Web.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Umbraco.Cms.Api.Common.Attributes;
using WRA.UmbracoBridgeServices;

namespace WRA.Umbraco.Web.Controllers.Api;

/// <summary>
/// Endpoints for retrieving available report lists, and the reports themselves in various file formats.
/// </summary>
[ApiController]
[MapToApi("bridge-api")]
[Route("fundraising-reports")]
public class FundraisingReportApiController(IUmbracoBridgeServiceClient bridgeServiceClient, ILogger logger) : ControllerBase
{
    private readonly IUmbracoBridgeServiceClient _bridgeServiceClient = bridgeServiceClient;
    private readonly ILogger _logger = logger.ForContext<FundraisingReportApiController>();

    /// <summary>
    /// Get a list of fundraising reports available to the member.
    /// </summary>
    /// <param name="memberId">The ID of the member.</param>
    /// <returns>Returns a list of <see cref="FundraisingReportDto"/>.</returns>
    /// <response code="200">Returns the list of fundraising reports.</response>
    /// <response code="404">If no reports are found for the given member.</response>
    /// <response code="500">If there was an internal server error.</response>
    /// <remarks>
    /// Sample request:
    ///
    ///     CF68806A-17EE-4B25-B737-196BF0C177E5
    /// </remarks>
    [HttpGet("fundraising/{memberId:guid}")]
    public async Task<ActionResult<List<FundraisingReportDto>>> GetFundraisingReportListAsync(Guid memberId)
    {
        using LoggerActivity? activity = _logger.StartActivity(LogEventLevel.Information, "Umbraco Cloud Web - {Request}", nameof(GetFundraisingReportListAsync));
        try
        {
            activity.AddProperty("MemberId", memberId);
            ICollection<FundraisingReportDto>? result = await _bridgeServiceClient.FundraisingReports_GetFundraisingReportListAsync(memberId);
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
            _logger.Error(ex, "Error retrieving fundraising reports for memberId: {MemberId}.", memberId);
            activity.Complete(LogEventLevel.Error, ex);
            return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        }
    }

    /// <summary>
    /// Get a specific fundraising report for a member by reportId and fileType.
    /// </summary>
    /// <param name="request">The report request.</param>
    /// <returns>Returns the <see cref="FundraisingReportDto"/>.</returns>
    /// <response code="200">Returns the fundraising report.</response>
    /// <response code="404">If no report is found for the given parameters.</response>
    /// <response code="500">If there was an internal server error.</response>
    /// <remarks>
    /// Valid Mime Types: (pdf,csv,excelopenxml,txt)
    ///
    ///     {
    ///         "memberId": "CF68806A-17EE-4B25-B737-196BF0C177E5",
    ///         "reportId": 9,
    ///         "useMemberChapter": true,
    ///         "mimeType": "pdf",
    ///         "reportParameters": {
    ///             "BeginDate": "2024-01-01",
    ///             "EndDate": "2024-05-30"
    ///         }
    ///     }
    /// </remarks>
    [HttpPost("report")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(FileStreamResult))]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetFundraisingReportAsync(GetFundraisingReportRequest request)
    {
        using LoggerActivity? activity = _logger.StartActivity(LogEventLevel.Information, "Umbraco Cloud Web - {Request}", nameof(GetFundraisingReportAsync));
        try
        {
            activity.AddProperty("MemberId", request.MemberId);
            activity.AddProperty("ReportId", request.ReportId);
            activity.AddProperty("FileType", request.MimeType);

            _logger.Debug("Retrieving fundraising report for memberId: {MemberId}, reportId: {ReportId}, fileType: {FileType}.", request.MemberId, request.ReportId, request.MimeType);
            FileResponse? result = await _bridgeServiceClient.FundraisingReports_GetFundraisingReportAsync(request);
            if (result == null || result.StatusCode == Convert.ToInt32(HttpStatusCode.NotFound))
            {
                _logger.Warning("No fundraising report found for memberId: {MemberId}, reportId: {ReportId}, fileType: {FileType}.", request.MemberId, request.ReportId, request.MimeType);
                activity.Complete(LogEventLevel.Warning);
                return NotFound();
            }

            _logger.Debug("Fundraising report retrieved successfully for memberId: {MemberId}, reportId: {ReportId}, fileType: {FileType}.", request.MemberId, request.ReportId, request.MimeType);
            activity.Complete();

            string contentType = result.Headers.TryGetValue("Content-Type", out IEnumerable<string>? contentTypes) ? contentTypes.First() : (request.MimeType ?? "application/octet-stream");

            return new FileStreamResult(result.Stream, contentType);
        }
        catch (Exception ex)
        {
            _logger.Error(ex, "Error retrieving fundraising report for memberId: {MemberId}, reportId: {ReportId}, fileType: {FileType}.", request.MemberId, request.ReportId, request.MimeType);
            activity.Complete(LogEventLevel.Error, ex);
            return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        }
    }
}
