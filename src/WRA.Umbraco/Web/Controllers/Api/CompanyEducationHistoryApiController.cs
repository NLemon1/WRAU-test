using System.Web.Http;
using Microsoft.AspNetCore.Mvc;
using Umbraco.Cms.Api.Common.Attributes;
using WRA.UmbracoBridgeServices;

namespace WRA.Umbraco.Web.Controllers.Api;

/// <summary>
/// Provides endpoint for retrieving the data necessary to generate the housing statistics reports.
/// </summary>
[ApiController]
[MapToApi("bridge-api")]
[Route("company-education-history")]
internal class CompanyEducationHistoryApiController(IUmbracoBridgeServiceClient bridgeServiceClient, ILogger logger) : ControllerBase
{
    // #erictodo - Figure out if I still need this.
    private readonly IUmbracoBridgeServiceClient _bridgeServiceClient = bridgeServiceClient;
    private readonly ILogger _logger = logger.ForContext<CompanyEducationHistoryApiController>();

}
