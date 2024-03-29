

using System.Text.Json;
using System.Web.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SqlKata;
using Umbraco.Cms.Api.Common.Attributes;
using Umbraco.Cms.Core.Models;
using Umbraco.Cms.Core.Scoping;
using Umbraco.Cms.Core.Services;
using WRA.Umbraco.Dtos;
using WRA.Umbraco.Models;
using WRA.Umbraco.Services;
using System.Text.Json.Serialization;


namespace WRA.Umbraco.Controllers;

[ApiController]
[MapToApi("member-api")]
[Route("WraMemberApi")]
public class MemberSyncApiController : ApiController
{
    private readonly IMemberService _memberService;
    private readonly IContentService _contentService;
    private readonly SearchService _searchService;
    private readonly ICoreScopeProvider _coreScopeProvider;
    private readonly WRAMemberManagementService _WRAMemberManagementService;
    private readonly WRAExternalApiService _wraExternalApiService;
    private readonly ILogger<MemberSyncApiController> _logger;


    public MemberSyncApiController(
        WRAMemberManagementService WRAMemberManagementService,
        ICoreScopeProvider coreScopeProvider,
        IContentService contentService,
        SearchService searchService,
        WRAExternalApiService wraExternalApiService,
        ILogger<MemberSyncApiController> logger
    )
    {
        _WRAMemberManagementService = WRAMemberManagementService;
        _coreScopeProvider = coreScopeProvider;
        _contentService = contentService;
        _searchService = searchService;
        _wraExternalApiService = wraExternalApiService;
        _logger = logger;
    }


    [HttpPost]
    [Route("Create")]
    public async Task<IActionResult> Create(MemberDto newMemberRequest)
    {

        var result = _WRAMemberManagementService.Create(newMemberRequest);
        if (result == null)
        {
            return StatusCode(System.Net.HttpStatusCode.InternalServerError);
        }
        return Ok(result.Id);
    }

    [HttpPost]
    [Route("Update")]
    public async Task<IActionResult> Update(MemberDto updateMemberRequest)
    {
        var result = _WRAMemberManagementService.Update(updateMemberRequest);
        if (result == null)
        {
            return StatusCode(System.Net.HttpStatusCode.InternalServerError);
        }
        return Ok(result.Id);
    }

    [HttpPost]
    [Route("Delete")]
    public async Task<IActionResult> Delete(MemberDto updateMemberRequest)
    {
        var result = _WRAMemberManagementService.Delete(updateMemberRequest);
        if (result == null)
        {
            return StatusCode(System.Net.HttpStatusCode.InternalServerError);
        }
        return Ok(result.IsCompletedSuccessfully);
    }

    [HttpPost]
    [Route("CreateMemberGroup")]
    public IActionResult CreateMemberGroup(string RoleName)
    {
        // simple enough I guess...

        try
        {
            _memberService.AddRole(RoleName);
            return Ok();

        }
        catch (Exception ex)
        {

            // do something here
            throw ex;
        }
    }


    [HttpPost]
    [Route("CreateBoard")]
    public async Task<IActionResult> CreateBoard(MemberBoardDto mb)
    {
        var result = _WRAMemberManagementService.CreateBoard(mb);
        if (result == null)
        {
            return StatusCode(System.Net.HttpStatusCode.InternalServerError);
        }
        return Ok(result.Id);
    }

    [HttpPost]
    [Route("SyncAllBoards")]
    public async Task<IActionResult> SyncAllBoards()
    {
        var productsResp = await _wraExternalApiService.GetBoards();
        var localBoards = JsonSerializer.Deserialize<List<MemberBoardDto>>(productsResp.Content);

        foreach (var board in localBoards)
        {
            await _WRAMemberManagementService.CreateBoard(board);
        }
        return Ok();

    }

    [HttpPost]
    [Route("SyncAllMembers")]
    public async Task<IActionResult> SyncAllMembers(bool syncOnlyMembers = false, int limit = 10000)
    {
        try
        {
            if (!syncOnlyMembers)
            {
                await SyncAllBoards();
                await SyncAllCompanies();
            }
            var membersResp = await _wraExternalApiService.GetMembers(limit);
            var members = JsonSerializer.Deserialize<SearchResponse<MemberDto>>(membersResp.Content);

            // crate a scope
            using ICoreScope scope = _coreScopeProvider.CreateCoreScope(autoComplete: true);

            // supress any notification to prevent our listener from firing an "updated member" webhook back at the queue
            using var _ = scope.Notifications.Suppress();

            foreach (var member in members.Data)
            {
                _WRAMemberManagementService.Create(member);
            }
            return Ok();
        }
        catch (System.Exception ex)
        {
            _logger.LogError($"Error syncing members from API. error: {ex.Message}");
            throw;
        }
    }


    [HttpPost]
    [Route("SyncAllCompanies")]
    public async Task<IActionResult> SyncAllCompanies()
    {
        try
        {
            var companiesResp = await _wraExternalApiService.GetCompanies();
            var companies = JsonSerializer.Deserialize<SearchResponse<CompanyDto>>(companiesResp.Content);

            foreach (var company in companies.Data)
            {
                await _WRAMemberManagementService.CreateCompany(company);
            }
            return Ok();
        }
        catch (System.Exception ex)
        {
            _logger.LogError($"Error syncing companies from API. error: {ex.Message}");
            throw;
        }
    }

    [HttpPost]
    [Route("CreateCompany")]
    public async Task<IActionResult> CreateCompany(CompanyDto company)
    {

        var result = await _WRAMemberManagementService.CreateCompany(company);
        if (result == null)
        {
            return StatusCode(System.Net.HttpStatusCode.InternalServerError);
        }
        return Ok(result.Id);
    }

    [HttpPost]
    [Route("CreateActiveCompanySubscription")]
    public async Task<IActionResult> CreateActiveCompanySubscription(WraCompanySubscriptionDto companySubscription)
    {
        var result = _WRAMemberManagementService.CreateActiveCompanySubscription(companySubscription);
        if (result == null)
        {
            return StatusCode(System.Net.HttpStatusCode.InternalServerError);
        }
        return Ok(result.Id);
    }


}

class SearchResponse<T>
{
    [JsonPropertyName("data")]
    public IEnumerable<T> Data { get; set; }
    public int CurrentPage { get; set; }
    public int TotalPages { get; set; }
    public int TotalCount { get; set; }
    public int PageSize { get; set; }
    public bool HasPreviousPage { get; set; }
    public bool HasNextPage { get; set; }

}