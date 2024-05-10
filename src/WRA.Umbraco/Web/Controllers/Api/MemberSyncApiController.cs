using System.Web.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Umbraco.Cms.Api.Common.Attributes;
using Umbraco.Cms.Core.Mapping;
using WRA.Umbraco.Contracts;
using WRA.Umbraco.CustomTables.Subscriptions;
using WRA.Umbraco.Repositories;
using WRA.Umbraco.Web.Dtos.External;
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
    SubscriptionHelper subscriptionHelper,
    IUmbracoMapper mapper,
    ILogger<MemberSyncApiController> logger)
    : ApiController
{

    [HttpPost]
    [Route("Create")]
    public Task<IActionResult> Create(ExternalMemberDto newMemberRequest)
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
    public Task<IActionResult> Update(ExternalMemberDto updateMemberRequest)
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
    public Task<IActionResult> Delete(ExternalMemberDto updateMemberRequest)
    {
        var memberEvent = mapper.Map<MemberEvent>(updateMemberRequest);
        var result = wraMemberManagementService.Delete(memberEvent);
        return Task.FromResult<IActionResult>(Ok(result.IsCompletedSuccessfully));
    }

    [HttpPost]
    [Route("CreateMemberGroup")]
    public IActionResult CreateMemberGroup(ExternalMemberGroupDto memberTypeDto)
    {
        try
        {
            memberGroupRepository.CreateMemberGroup(memberTypeDto);
            return Ok();
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error creating member group of id {Id}", memberTypeDto.Id);
            throw;
        }
    }

    [HttpPost]
    [Route("UpdateMemberGroup")]
    public IActionResult UpdateMemberGroup(ExternalMemberGroupDto memberTypeDto)
    {
        try
        {
            memberGroupRepository.UpdateMemberGroup(memberTypeDto);
            return Ok();
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error updating member group of id {Id}", memberTypeDto.Id);
            throw;
        }
    }

    [HttpPost]
    [Route("CreateOrUpdateBoard")]
    public Task<IActionResult> CreateOrUpdateBoard(ExternalMemberBoardDto mb)
    {
        var result = boardRepository.CreateOrUpdateBoard(mb);
        return Task.FromResult<IActionResult>(Ok(result.Id));
    }

    [HttpPost]
    [Route("CreateOrUpdateCompany")]
    public Task<IActionResult> CreateOrUpdateCompany(ExternalCompanyDto company)
    {
        var result = companyRepository.CreateOrUpdate(company);
        return Task.FromResult<IActionResult>(Ok(result.Id));
    }

    [HttpPost]
    [Route("CreateOrUpdateMemberSubscription")]
    public Task<IActionResult> CreateOrUpdateMemberSubscription(ExternalMemberSubscriptionDto memberSubscriptionDto)
    {
        try
        {
            var newMemberSubscription = mapper.Map<MemberSubscription>(memberSubscriptionDto);
            if (newMemberSubscription == null)
            {
                return Task.FromResult<IActionResult>(BadRequest());
            }
            subscriptionHelper.CreateOrUpdateMemberSubscription(newMemberSubscription);
            return Task.FromResult<IActionResult>(Ok(newMemberSubscription.Id));
        }
        catch (Exception e)
        {
            logger.LogError(e, "Error creating member subscription for member {MemberId}", memberSubscriptionDto.MemberId);
            throw;
        }
    }

    [HttpPost]
    [Route("CreateOrUpdateCompanySubscription")]
    public Task<IActionResult> CreateOrUpdateCompanySubscription(ExternalCompanySubscriptionDto companySubscriptionDto)
    {
        try
        {
            var newCompanySubscription = mapper.Map<CompanySubscription>(companySubscriptionDto);
            if (newCompanySubscription == null)
            {
                return Task.FromResult<IActionResult>(BadRequest());
            }

            subscriptionHelper.CreateOrUpdateCompanySubscription(newCompanySubscription);
            return Task.FromResult<IActionResult>(Ok(newCompanySubscription.Id));
        }
        catch (Exception e)
        {
            logger.LogError(e, "Error creating company subscription for company {CompanyId}", companySubscriptionDto.CompanyId);
            throw;
        }
    }
}
