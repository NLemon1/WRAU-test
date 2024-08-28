using System.Web.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Umbraco.Cms.Api.Common.Attributes;
using WRA.UmbracoBridgeServices;

namespace WRA.Umbraco.Web.Controllers.Api;

/// <summary>
/// Provides methods for access agent event registrations for company and association administrators.
/// </summary>
[ApiController]
[MapToApi("bridge-api")]
[Route("agent-event-registration")]
public class AgentEventRegistrationApiController(IUmbracoBridgeServiceClient bridgeServiceClient, ILogger logger) : ControllerBase
{
    private readonly IUmbracoBridgeServiceClient _bridgeServiceClient = bridgeServiceClient;
    private readonly ILogger _logger = logger.ForContext<AgentEventRegistrationApiController>();

    /// <summary>
    /// Get a list of agent event registration records by meeting code.
    /// </summary>
    /// <param name="request">The request object containing the memberId of the admin and a meeting code.</param>
    /// <returns>A list of <see cref="AgentEventRegistrationDto"/> containing agent education history.</returns>
    /// <response code="200">Returns the list of agent event registration records.</response>
    /// <response code="404">If no progress is found for the given agent.</response>
    /// <response code="500">If there was an internal server error.</response>
    /// <remarks>
    /// Sample request:
    ///
    ///     POST /agent-event-registration/registrations/event
    ///     {
    ///         "memberId": "96734B4C-F4D4-4D66-AC2C-AF5A643F7456",
    ///         "meetingCode": "CE2324"
    ///     }
    /// </remarks>
    [HttpPost("registrations/event")]
    public async Task<ActionResult<List<AgentEventRegistrationDto>>> GetAgentEventRegistrationListByEventAsync(GetAgentEventRegistrationsByEventRequest request)
    {
        using LoggerActivity? activity = _logger.StartActivity(LogEventLevel.Information, "Umbraco Cloud Web - {Request}", nameof(GetAgentEventRegistrationsByEventRequest));
        try
        {
            activity.AddProperty("MemberId", request.MemberId);
            activity.AddProperty("MeetingCode", request.MeetingCode);

            ICollection<AgentEventRegistrationDto>? result = await _bridgeServiceClient.AgentEventRegistration_GetAgentEventRegistrationListByEventAsync(request);
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
            _logger.Error(ex, "Error retrieving agent event registration records by event for memberId {Id}.", request.MemberId);
            activity.Complete(LogEventLevel.Error, ex);
            return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        }
    }

    /// <summary>
    /// Get an individual agent event registrations by memberId.
    /// </summary>
    /// <param name="request">The request object containing the memberId of the admin and the memberId of the agent, optional meetingTypes, and months lookback.</param>
    /// <returns>A list of <see cref="AgentEventRegistrationDto"/> containing agent event registrations.</returns>
    /// <response code="200">Returns the list of agent event registrations.</response>
    /// <response code="404">If no progress is found for the given agent.</response>
    /// <response code="500">If there was an internal server error.</response>
    /// <remarks>
    /// Sample request:
    ///
    ///     POST /agent-event-registration/registrations/agent
    ///     {
    ///         "memberId": "96734B4C-F4D4-4D66-AC2C-AF5A643F7456",
    ///         "agentMemberId": "96734B4C-F4D4-4D66-AC2C-AF5A643F7456",
    ///         "meetingTypes": "CONV DR DW RGD FAIR",
    ///         "months": 15
    ///     }
    /// </remarks>
    [HttpPost("registrations/agent")]
    public async Task<ActionResult<List<AgentEventRegistrationDto>>> GetAgentEventRegistrationsListByIndividualAsync(GetAgentEventRegistrationsByIndividualRequest request)
    {
        using LoggerActivity? activity = _logger.StartActivity(LogEventLevel.Information, "Umbraco Cloud Web - {Request}", nameof(GetAgentEventRegistrationsByIndividualRequest));
        try
        {
            activity.AddProperty("MemberId", request.MemberId);
            activity.AddProperty("AgentMemberId", request.AgentMemberId);

            ICollection<AgentEventRegistrationDto>? result = await _bridgeServiceClient.AgentEventRegistration_GetAgentEventRegistrationsListByIndividualAsync(request);
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
            _logger.Error(ex, "Error retrieving agent event registration records for individual with memberId {Id}.", request.MemberId);
            activity.Complete(LogEventLevel.Error, ex);
            return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        }
    }

    /// <summary>
    /// Get a list of events that qualify for the agent registration report.
    /// </summary>
    /// <param name="request">The request object containing optional meeting types and months.</param>
    /// <returns>A list of <see cref="AgentMeetingEventDetailDto"/> containing agent event registrations.</returns>
    /// <response code="200">Returns the list of events filtered by number of months to look back and the meeting types.</response>
    /// <response code="404">If no progress is found for the given agent.</response>
    /// <response code="500">If there was an internal server error.</response>
    /// <remarks>
    /// Sample request:
    ///
    ///     POST /agent-event-registration/events
    ///     {
    ///         "meetingTypes": "CONV DR DW RGD FAIR",
    ///         "months": 15
    ///     }
    /// </remarks>
    [HttpPost("events")]
    public async Task<ActionResult<List<AgentMeetingEventDetailDto>>> GetAgentEventRegistrationsEventListAsync(GetAgentEventRegistrationsEventListRequest request)
    {
        using LoggerActivity? activity = _logger.StartActivity(LogEventLevel.Information, "Umbraco Cloud Web - {Request}", nameof(GetAgentEventRegistrationsByIndividualRequest));
        try
        {
            activity.AddProperty("MeetingTypes", request.MeetingTypes);
            activity.AddProperty("Months", request.Months);

            ICollection<AgentMeetingEventDetailDto>? result = await _bridgeServiceClient.AgentEventRegistration_GetAgentEventRegistrationsEventListAsync(request);
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
            _logger.Error(ex, "Error retrieving agent event list");
            activity.Complete(LogEventLevel.Error, ex);
            return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        }
    }

    /// <summary>
    /// Get a list of agents that qualify for this members registration report.
    /// </summary>
    /// <param name="request">The request object containing the memberId of the administrator.</param>
    /// <returns>A list of <see cref="AgentEventRegistrationDto"/> containing agent event registrations.</returns>
    /// <response code="200">Returns the list of events filtered by number of months to look back and the meeting types.</response>
    /// <response code="404">If no progress is found for the given agent.</response>
    /// <response code="500">If there was an internal server error.</response>
    /// <remarks>
    /// Sample request:
    ///
    ///     POST /agent-event-registration/agents
    ///     {
    ///         "memberId": "96734B4C-F4D4-4D66-AC2C-AF5A643F7456"
    ///     }
    /// </remarks>
    [HttpPost("agents")]
    public async Task<ActionResult<List<AgentEventRegistrationDto>>> GetAgentEventRegistrationsIndividualListAsync(GetAgentEventRegistrationsIndividualListRequest request)
    {
        using LoggerActivity? activity = _logger.StartActivity(LogEventLevel.Information, "Umbraco Cloud Web - {Request}", nameof(GetAgentEventRegistrationsIndividualListRequest));
        try
        {
            activity.AddProperty("MemberId", request.MemberId);

            ICollection<AgentEventRegistrationDto>? result = await _bridgeServiceClient.AgentEventRegistration_GetAgentEventRegistrationsIndividualListAsync(request);
            _logger.Debug("Successfully retrieved agent list for MemberId {Id}.", request.MemberId);
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
            _logger.Error(ex, "Error retrieving agent list for MemberId {Id}.", request.MemberId);
            activity.Complete(LogEventLevel.Error, ex);
            return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        }
    }
}