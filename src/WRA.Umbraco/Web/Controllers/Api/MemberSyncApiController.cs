

using System.Text.Json;
using System.Web.Http;
using Microsoft.AspNetCore.Mvc;
using Umbraco.Cms.Api.Common.Attributes;
using Umbraco.Cms.Core.Models;
using Umbraco.Cms.Core.Scoping;
using Umbraco.Cms.Core.Services;
using WRA.Umbraco.Dtos;
using WRA.Umbraco.Models;
using WRA.Umbraco.Services;

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


    public MemberSyncApiController(
        WRAMemberManagementService WRAMemberManagementService,
        ICoreScopeProvider coreScopeProvider,
        IContentService contentService,
        SearchService searchService,
        WRAExternalApiService wraExternalApiService
    )
    {
        _WRAMemberManagementService = WRAMemberManagementService;
        _coreScopeProvider = coreScopeProvider;
        _contentService = contentService;
        _searchService = searchService;
        _wraExternalApiService = wraExternalApiService;
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
    [Route("SyncaAllMembers")]
    public async Task<IActionResult> SyncAllMembers()
    {
        var membersResp = await _wraExternalApiService.GetMembers();
        var members = JsonSerializer.Deserialize<List<MemberDto>>(membersResp.Content);
        var members1 = JsonSerializer.Deserialize<SearchResponse<MemberDto>>(membersResp.Content);

        foreach (var member in members)
        {
            await _WRAMemberManagementService.Create(member);
        }
        return Ok();
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
        var result = await _WRAMemberManagementService.CreateActiveCompanySubscription(companySubscription);
        if (result == null)
        {
            return StatusCode(System.Net.HttpStatusCode.InternalServerError);
        }
        return Ok(result.Id);
    }


}

class SearchResponse<T>
{
    public List<T> Data { get; set; }
    public int CurrentPage { get; set; }
    public int TotalPages { get; set; }
    public int TotalCount { get; set; }
    public int PageSize { get; set; }
    public bool HasPreviousPage { get; set; }
    public bool HasNextPage { get; set; }

}