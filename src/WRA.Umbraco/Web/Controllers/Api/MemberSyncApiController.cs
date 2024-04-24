using System.Web.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Umbraco.Cms.Api.Common.Attributes;
using Umbraco.Cms.Core.Mapping;
using WRA.Umbraco.Contracts;
using WRA.Umbraco.Dtos;
using WRA.Umbraco.Repositories;
using WRA.Umbraco.Web.Dtos;
using WRA.Umbraco.Web.Services;

namespace WRA.Umbraco.Web.Controllers.Api;

[ApiController]
[MapToApi("member-api")]
[Route("WraMemberApi")]
public class MemberSyncApiController(
    WraMemberManagementService wraMemberManagementService,
    BoardRepository boardRepository,
    CompanyRepository companyRepository,
    MemberGroupRepository memberGroupRepository,
    IUmbracoMapper mapper,
    ILogger<MemberSyncApiController> logger)
    : ApiController
{

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

    [HttpPost]
    [Route("CreateBoard")]
    public Task<IActionResult> CreateBoard(MemberBoardDto mb)
    {
        var result = boardRepository.CreateOrUpdateBoard(mb);
        return Task.FromResult<IActionResult>(Ok(result.Id));
    }

    [HttpPost]
    [Route("CreateCompany")]
    public Task<IActionResult> CreateCompany(CompanyDto company)
    {
        var result = companyRepository.CreateOrUpdate(company);
        return Task.FromResult<IActionResult>(Ok(result.Id));
    }
}
