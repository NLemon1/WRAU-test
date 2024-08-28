using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using Umbraco.Cms.Core.Cache;
using Umbraco.Cms.Core.Logging;
using Umbraco.Cms.Core.Mapping;
using Umbraco.Cms.Core.Routing;
using Umbraco.Cms.Core.Security;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Core.Web;
using Umbraco.Cms.Infrastructure.Persistence;
using Umbraco.Cms.Web.Common.Filters;
using Umbraco.Cms.Web.Website.Controllers;
using WRA.Umbraco.Models.Custom.ViewModels;
using WRA.UmbracoBridgeServices;

namespace WRA.Umbraco.Web.Controllers;

public class FindRealtorSurfaceController : SurfaceController
{
    private readonly IUmbracoBridgeServiceClient _bridgeServiceClient;
    private readonly ILogger _logger;
    private readonly IAppPolicyCache _runtimeCache;
    private readonly IMemberManager _memberManager;
    private readonly IUmbracoMapper _mapper;

    /// <summary>
    /// Initializes a new instance of the <see cref="FindRealtorSurfaceController"/> class.
    /// </summary>
    public FindRealtorSurfaceController(
        IUmbracoContextAccessor umbracoContextAccessor,
        IUmbracoDatabaseFactory databaseFactory,
        IUmbracoMapper mapper,
        ServiceContext services,
        AppCaches appCaches,
        IProfilingLogger profilingLogger,
        IPublishedUrlProvider publishedUrlProvider,
        IUmbracoBridgeServiceClient bridgeServiceClient,
        IMemberManager memberManager,
        ILogger logger)
    : base(umbracoContextAccessor, databaseFactory, services, appCaches, profilingLogger, publishedUrlProvider)
    {
        _runtimeCache = appCaches.RuntimeCache;
        _bridgeServiceClient = bridgeServiceClient;
        _logger = logger.ForContext<FindRealtorSurfaceController>();
        _mapper = mapper;
        _memberManager = memberManager;
    }

    /// <summary>
    /// This offers a single endpoint for autocompletion of specific fields within the find a realtor form.
    /// </summary>
    /// <param name="request"><see cref="FindRealtorCompletionRequest"/>FindRealtorCompletionRequest which passes the field we are interested in and the characters to autocomplete.</param>
    /// <returns>Returns a list of member view models that match the given request.</returns>
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<ActionResult<PaginationResponseOfFindRealtorMemberViewModels>> CompleteAsync([FromForm] FindRealtorCompletionRequest request)
    {
        // #todoeric surface the completion endpoint from the bridge so we can pluck off the specific field we need.
        // #todoeric use the runtime cache to cache the results for a short time.
        using LoggerActivity? activity = _logger.StartActivity(LogEventLevel.Information, "Umbraco SurfaceController - {Controller}:{Action}", nameof(FindRealtorSurfaceController), nameof(CompleteAsync));
        try
        {
            activity.AddProperty(nameof(request.Query), request.Query);
            activity.AddProperty(nameof(request.Field), request.Field);

            if (ModelState.IsValid)
            {
                var memberSearchRequest = _mapper.Map<SearchMembersRequest>(request);
                PaginationResponseOfMemberDto memberPagedResponse = await _bridgeServiceClient.Member_SearchMembersAsync(memberSearchRequest);
                var result = _mapper.Map<PaginationResponseOfFindRealtorMemberViewModels>(memberPagedResponse);
                activity.Complete();
                return Json(result);
            }
            else
            {
                activity.Complete(LogEventLevel.Error);
                return BadRequest(ModelState);
            }
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

    /// <summary>
    /// This calls the bridge API to search for members using the member search request model.
    /// It only searches for members within the umbraco bridge database.
    /// </summary>
    /// <param name="model"><see cref="FindRealtorRequestModel"/> request model from the page form.</param>
    /// <param name="recaptchaResponse">A string containing the response from the users recaptcha to be validated.</param>
    /// <returns>Returns a <see cref="PaginationResponseOfFindRealtorMemberViewModels"/> pagination response of mapped member models (removing private fields from the member model).</returns>
    [HttpPost]
    [ValidateAntiForgeryToken]
    [ValidateUmbracoFormRouteString]
    public async Task<ActionResult<PaginationResponseOfFindRealtorMemberViewModels>> SearchAsync([FromForm] FindRealtorRequestModel model, [FromForm] string recaptchaResponse)
    {
        using LoggerActivity? activity = _logger.StartActivity(LogEventLevel.Information, "Umbraco SurfaceController - {Controller}:{Action}", nameof(FindRealtorSurfaceController), nameof(SearchAsync));
        try
        {
            // Check if the user is required to solve a recaptcha.
            if (IsRecaptchaRequired())
            {
                // Fail early if they didn't pass one and it's required.
                if (string.IsNullOrEmpty(recaptchaResponse))
                {
                    ModelState.AddModelError("Recaptcha", "reCAPTCHA response is required");
                    return BadRequest(ModelState);
                }

                // Validate the recaptcha response using the recaptcha service.
                if (!await ValidateRecaptchaAsync(recaptchaResponse))
                {
                    ModelState.AddModelError("Recaptcha", "reCAPTCHA validation failed");
                    return BadRequest(ModelState);
                }
            }

            if (ModelState.IsValid)
            {
                var memberSearchRequest = _mapper.Map<SearchMembersRequest>(model.SearchRequest);
                PaginationResponseOfMemberDto memberPagedResponse = await _bridgeServiceClient.Member_SearchMembersAsync(memberSearchRequest);
                var result = _mapper.Map<PaginationResponseOfFindRealtorMemberViewModels>(memberPagedResponse);
                activity.Complete();
                return Json(result);
            }
            else
            {
                activity.Complete(LogEventLevel.Error);
                return BadRequest(ModelState);
            }
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

    private async Task<bool> ValidateRecaptchaAsync(object recaptchaResponse)
    {
        // #todoeric: No await?
        throw new NotImplementedException();
    }

    /// <summary>
    /// Defines the conditions under which solving a Recaptcha is required for form submission.
    /// </summary>
    /// <returns>Returns true if the user is required to solve a recaptcha.</returns>
    private bool IsRecaptchaRequired()
    {
        return !_memberManager.IsLoggedIn();
    }
}