using System.Text.Json;
using System.Text.Json.Serialization;
using System.Web.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Umbraco.Cms.Api.Common.Attributes;
using Umbraco.Cms.Core.Mapping;
using Umbraco.Cms.Core.Models;
using Umbraco.Cms.Core.Scoping;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Core.Web;
using WRA.Umbraco.Contracts;
using WRA.Umbraco.Dtos;
using WRA.Umbraco.Helpers;
using WRA.Umbraco.Repositories;
using WRA.Umbraco.Web.Dtos;
using WRA.Umbraco.Web.Services;

namespace WRA.Umbraco.Web.Controllers.Api;

[ApiController]
[MapToApi("member-api")]
[Route("WraMemberApi")]
public class MemberSyncApiController(
    WraMemberManagementService wraMemberManagementService,
    WraExternalApiService wraExternalApiService,
    BoardRepository boardRepository,
    CompanyRepository companyRepository,
    MemberGroupRepository memberGroupRepository,
    IMemberGroupService memberGroupService,
    IUmbracoMapper mapper,
    ILogger<MemberSyncApiController> logger)
    : ApiController
{
    private static readonly JsonSerializerOptions SerializationOptions = new()
    {
        PropertyNameCaseInsensitive = true
    };

    [HttpPost]
    [Route("Create")]
    public Task<IActionResult> Create(MemberDto newMemberRequest)
    {
        var memberEvent = mapper.Map<MemberEvent>(newMemberRequest);
        var result = wraMemberManagementService.CreateOrUpdate(memberEvent);
        if (result == null)
        {
            return Task.FromResult<IActionResult>(StatusCode(System.Net.HttpStatusCode.InternalServerError));
        }

        return Task.FromResult<IActionResult>(Ok(result.Id));
    }

    [HttpPost]
    [Route("Update")]
    public Task<IActionResult> Update(MemberDto updateMemberRequest)
    {
        var memberEvent = mapper.Map<MemberEvent>(updateMemberRequest);
        var result = wraMemberManagementService.Update(memberEvent);
        if (result == null)
        {
            return Task.FromResult<IActionResult>(StatusCode(System.Net.HttpStatusCode.InternalServerError));
        }

        return Task.FromResult<IActionResult>(Ok(result.Id));
    }

    [HttpPost]
    [Route("Delete")]
    public Task<IActionResult> Delete(MemberDto updateMemberRequest)
    {
        var memberEvent = mapper.Map<MemberEvent>(updateMemberRequest);
        var result = wraMemberManagementService.Delete(memberEvent);
        if (result == null)
        {
            return Task.FromResult<IActionResult>(StatusCode(System.Net.HttpStatusCode.InternalServerError));
        }

        return Task.FromResult<IActionResult>(Ok(result.IsCompletedSuccessfully));
    }

    [HttpPost]
    [Route("CreateMemberGroup")]
    public IActionResult CreateMemberGroup(MemberGroupDto memberTypeDto)
    {
        try
        {
            memberGroupRepository.CreateMemberGroup(memberTypeDto);
            return Ok();
        }
        catch (Exception ex)
        {
            // do something here
            throw ex;
        }
    }

    public async Task<IActionResult> SyncAllMemberGroups()
    {
        try
        {
            var memberGroupsResp = await wraExternalApiService.GetMemberGroups();
            var memberGroups = JsonSerializer.Deserialize<List<MemberGroupDto>>(memberGroupsResp.Content, SerializationOptions) ;

            foreach (var memberGroup in memberGroups)
            {
                var existingMemberGroup = memberGroupRepository.GetMemberGroupByExternalId(memberGroup.Id);
                if (existingMemberGroup != null)
                {
                    memberGroupRepository.UpdateMemberGroup(existingMemberGroup, memberGroup);
                }
                else
                {
                    memberGroupRepository.CreateMemberGroup(memberGroup);
                }
            }

            return Ok();
        }
        catch (Exception e)
        {
            logger.LogError(e, "Error syncing member groups.");
            throw;
        }
    }

    [HttpPost]
    [Route("CreateBoard")]
    public Task<IActionResult> CreateBoard(MemberBoardDto mb)
    {
        var result = boardRepository.CreateOrUpdateBoard(mb);
        return Task.FromResult<IActionResult>(Ok(result.Id));
    }

    [HttpPost]
    [Route("SyncAllBoards")]
    public async Task<IActionResult> SyncAllBoards()
    {

        var productsResp = await wraExternalApiService.GetBoards();
        var localBoards = JsonSerializer.Deserialize<List<MemberBoardDto>>(productsResp.Content, SerializationOptions);

        foreach (var board in localBoards)
        {
            boardRepository.CreateOrUpdateBoard(board);
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
            var members =
                JsonSerializer.Deserialize<SearchResponse<MemberDto>>(membersResp.Content, SerializationOptions);

            if (members?.Data == null) return InternalServerError(new Exception("No members returned from API."));
            foreach (var member in members.Data)
            {
                var memberEvent = mapper.Map<MemberEvent>(member);
                await wraMemberManagementService.CreateOrUpdate(memberEvent);
            }

            return Ok();
        }
        catch (Exception ex)
        {
            logger.LogError(ex, $"Error syncing members from API. error: {ex.Message}");
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
            var companies = JsonSerializer.Deserialize<SearchResponse<CompanyDto>>(companiesResp.Content, SerializationOptions);

            if (companies?.Data == null) return InternalServerError(new Exception("No companies returned from API."));
            foreach (var company in companies.Data)
            {
                companyRepository.Create(company);
            }

            return Ok();
        }
        catch (System.Exception ex)
        {
            logger.LogError(ex, "Error syncing companies from API. error: {Message}", ex.Message);
            throw;
        }
    }

    [HttpPost]
    [Route("CreateCompany")]
    public Task<IActionResult> CreateCompany(CompanyDto company)
    {
        var result = companyRepository.Create(company);
        return Task.FromResult<IActionResult>(Ok(result.Id));
    }

    public async Task<IActionResult> SyncCompaniesAndBoards()
    {
        await SyncAllCompanies();
        await SyncAllBoards();
        return Ok();
    }
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