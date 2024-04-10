using System.Text.Json;
using System.Text.Json.Serialization;
using System.Web.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Umbraco.Cms.Api.Common.Attributes;
using Umbraco.Cms.Core.Scoping;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Core.Web;
using WRA.Umbraco.Dtos;
using WRA.Umbraco.Helpers;
using WRA.Umbraco.Repositories;
using WRA.Umbraco.Web.Services;

namespace WRA.Umbraco.Web.Controllers.Api;

[ApiController]
[MapToApi("member-api")]
[Route("WraMemberApi")]
public class MemberSyncApiController(
    WraMemberManagementService wraMemberManagementService,
    ICoreScopeProvider coreScopeProvider,
    WraExternalApiService wraExternalApiService,
    IMemberService memberService,
    IUmbracoContextFactory umbracoContextFactory,
    BoardRepository boardRepository,
    CompanyRepository   companyRepository,
    ILogger<MemberSyncApiController> logger)
    : ApiController
{
    private static readonly JsonSerializerOptions SerializationOptions = new()
    {
        PropertyNameCaseInsensitive = true
    };


    [HttpPost]
    [Route("Create")]
    public Task<IActionResult> Create(IMemberEvent newMemberRequest)
    {

        var result = wraMemberManagementService.CreateOrUpdate(newMemberRequest);
        if (result == null)
        {
            return Task.FromResult<IActionResult>(StatusCode(System.Net.HttpStatusCode.InternalServerError));
        }
        return Task.FromResult<IActionResult>(Ok(result.Id));
    }

    [HttpPost]
    [Route("Update")]
    public Task<IActionResult> Update(IMemberEvent updateMemberRequest)
    {
        var result = wraMemberManagementService.Update(updateMemberRequest);
        if (result == null)
        {
            return Task.FromResult<IActionResult>(StatusCode(System.Net.HttpStatusCode.InternalServerError));
        }
        return Task.FromResult<IActionResult>(Ok(result.Id));
    }

    [HttpPost]
    [Route("Delete")]
    public Task<IActionResult> Delete(IMemberEvent updateMemberRequest)
    {
        var result = wraMemberManagementService.Delete(updateMemberRequest);
        if (result == null)
        {
            return Task.FromResult<IActionResult>(StatusCode(System.Net.HttpStatusCode.InternalServerError));
        }
        return Task.FromResult<IActionResult>(Ok(result.IsCompletedSuccessfully));
    }

    [HttpPost]
    [Route("CreateMemberGroup")]
    public IActionResult CreateMemberGroup(string RoleName)
    {
        // simple enough I guess...

        try
        {
            memberService.AddRole(RoleName);
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
    public Task<IActionResult> CreateBoard(MemberBoardDto mb)
    {
        using var umbracoContextReference = umbracoContextFactory.EnsureUmbracoContext();
        var contentQuery = umbracoContextReference.UmbracoContext.Content;
        if (contentQuery == null) return Task.FromResult<IActionResult>(InternalServerError(new Exception("Could not get content cache")));

        var result = boardRepository.CreateOrUpdateBoard(mb, contentQuery);
        return Task.FromResult<IActionResult>(Ok(result.Id));
    }

    [HttpPost]
    [Route("SyncAllBoards")]
    public async Task<IActionResult> SyncAllBoards()
    {
        using var umbracoContextReference = umbracoContextFactory.EnsureUmbracoContext();
        var contentQuery = umbracoContextReference.UmbracoContext.Content;
        if (contentQuery == null) return InternalServerError(new Exception("Could not get content cache"));
        
        var productsResp = await wraExternalApiService.GetBoards();
        var localBoards = JsonSerializer.Deserialize<List<MemberBoardDto>>(productsResp.Content);

        foreach (var board in localBoards)
        {
            boardRepository.CreateOrUpdateBoard(board, contentQuery);
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
            var membersResp = await wraExternalApiService.GetMembers(limit);
            if (membersResp.Content == null) return Ok();
            var members = JsonSerializer.Deserialize<SearchResponse<MemberEvent>>(membersResp.Content, SerializationOptions);

            if (members?.Data == null) return InternalServerError(new Exception("No members returned from API."));
            foreach (var member in members.Data)
            {
                await wraMemberManagementService.CreateOrUpdate(member);
            }

            return Ok();
        }
        catch (Exception ex)
        {
            logger.LogError($"Error syncing members from API. error: {ex.Message}");
            throw;
        }
    }


    [HttpPost]
    [Route("SyncAllCompanies")]
    public async Task<IActionResult> SyncAllCompanies()
    {
        try
        {
            var companiesResp = await wraExternalApiService.GetCompanies();
            if (companiesResp.Content == null) return InternalServerError(new Exception("Bad response from API."));
            var companies = JsonSerializer.Deserialize<SearchResponse<CompanyDto>>(companiesResp.Content);
            
            using var umbracoContextReference = umbracoContextFactory.EnsureUmbracoContext();
            var contentQuery = umbracoContextReference.UmbracoContext.Content;
            if (companies?.Data == null) return InternalServerError(new Exception("No companies returned from API."));
            foreach (var company in companies.Data)
            {
                companyRepository.Create(company, contentQuery);
            }

            return Ok();
        }
        catch (System.Exception ex)
        {
            logger.LogError($"Error syncing companies from API. error: {ex.Message}");
            throw;
        }
    }

    [HttpPost]
    [Route("CreateCompany")]
    public Task<IActionResult> CreateCompany(CompanyDto company)
    {
        using var umbracoContextReference = umbracoContextFactory.EnsureUmbracoContext();
        var contentQuery = umbracoContextReference.UmbracoContext.Content;
        if (contentQuery == null) return Task.FromResult<IActionResult>(InternalServerError(new Exception("Could not get content cache")));

        var result = companyRepository.Create(company, contentQuery);
        return Task.FromResult<IActionResult>(Ok(result.Id));
    }

    // [HttpPost]
    // [Route("CreateActiveCompanySubscription")]
    // public async Task<IActionResult> CreateActiveCompanySubscription(WraCompanySubscriptionDto companySubscription)
    // {
    //     var result = wraMemberManagementService.CreateActiveCompanySubscription(companySubscription);
    //     if (result == null)
    //     {
    //         return StatusCode(System.Net.HttpStatusCode.InternalServerError);
    //     }
    //     return Ok(result.Id);
    // }
}

internal class SearchResponse<T>
{
    [JsonPropertyName("data")]
    public IEnumerable<T>? Data { get; set; }
    public int CurrentPage { get; set; }
    public int TotalPages { get; set; }
    public int TotalCount { get; set; }
    public int PageSize { get; set; }
    public bool HasPreviousPage { get; set; }
    public bool HasNextPage { get; set; }

}