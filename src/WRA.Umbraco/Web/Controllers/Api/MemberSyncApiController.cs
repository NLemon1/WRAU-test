using System.Web.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Umbraco.Cms.Api.Common.Attributes;
using Umbraco.Cms.Core.Mapping;
using WRA.Umbraco.BackgroundJobs;
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
    MemberRepository memberRepository,
    BoardRepository boardRepository,
    CompanyRepository companyRepository,
    MemberGroupRepository memberGroupRepository,
    SubscriptionHelper subscriptionHelper,
    MemberTasks memberTasks,
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
        return result == null ? Task.FromResult<IActionResult>(InternalServerError()) : Task.FromResult<IActionResult>(Ok(result.Id));
    }

    [HttpPost]
    [Route("Update")]
    public Task<IActionResult> Update(ExternalMemberDto updateMemberRequest)
    {
        var memberEvent = mapper.Map<MemberEvent>(updateMemberRequest);
        var result = wraMemberManagementService.Update(memberEvent);
        return result == null ? Task.FromResult<IActionResult>(InternalServerError()) : Task.FromResult<IActionResult>(Ok(result.Id));
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
    [Route("GetMemberByExternalId")]
    public async Task<IActionResult> GetMemberByExternalId(Guid externalId)
    {
        var result = memberRepository.GetByExternalId(externalId);
        return result == null ? await Task.FromResult<IActionResult>(NotFound()) : await Task.FromResult<IActionResult>(Ok(result.Id));
    }

    [HttpPost]
    [Route("SyncMemberByExternalId")]
    public async Task<IActionResult> SyncMemberByExternalId(Guid externalId)
    {
        var result = await memberTasks.SyncMemberByExternalId(externalId);
        return result == null ? await Task.FromResult<IActionResult>(NotFound()) : await Task.FromResult<IActionResult>(Ok(result.Id));
    }

    [HttpPost]
    [Route("CreateMemberGroup")]
    public IActionResult CreateMemberGroup(ExternalMemberGroupDto memberTypeDto)
    {
        try
        {
            var result = memberGroupRepository.CreateMemberGroup(memberTypeDto);
            return result == null ? NotFound() : Ok(result.Id);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error creating member group of id {Id}", memberTypeDto.Id);
            throw;
        }
    }

    [HttpPost]
    [Route("DeleteMemberGroup")]
    public IActionResult DeleteMemberGroup(ExternalMemberGroupDto memberTypeDto)
    {
        try
        {
            bool result = memberGroupRepository.DeleteMemberGroup(memberTypeDto);
            return result ? Ok() : NotFound();
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
            var result = memberGroupRepository.UpdateMemberGroup(memberTypeDto);
            return result == null ? NotFound() : Ok(result.Id);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error updating member group of id {Id}", memberTypeDto.Id);
            throw;
        }
    }

    [HttpPost]
    [Route("GetBoardByExternalId")]
    public Task<IActionResult> GetBoardByExternalId(Guid Id )
    {
        var result = boardRepository.Get(Id);
        return result == null ? Task.FromResult<IActionResult>(InternalServerError()) : Task.FromResult<IActionResult>(Ok(result.Id));
    }

    [HttpPost]
    [Route("CreateOrUpdateBoard")]
    public Task<IActionResult> CreateOrUpdateBoard(ExternalMemberBoardDto mb)
    {
        var result = boardRepository.CreateOrUpdateBoard(mb);
        return result == null ? Task.FromResult<IActionResult>(InternalServerError()) : Task.FromResult<IActionResult>(Ok(result.Id));
    }

    [HttpPost]
    [Route("SyncBoardByExternalId")]
    public async Task<IActionResult> SyncBoardByExternalId(Guid Id)
    {
        var result = await memberTasks.SyncBoardByExternalId(Id);
        return result == null ? await Task.FromResult<IActionResult>(NotFound()) : await Task.FromResult<IActionResult>(Ok($"{result.Id} - {result.Name}"));
    }

    [HttpPost]
    [Route("DeleteBoard")]
    public Task<IActionResult> DeleteBoard(Guid mb)
    {
        var result = boardRepository.Delete(mb);
        return result.Success ? Task.FromResult<IActionResult>(Ok()) : Task.FromResult<IActionResult>(InternalServerError());
    }

    [HttpPost]
    [Route("GetExistingCompanyByExternalId")]
    public async Task<IActionResult> GetExistingCompanyByExternalId(Guid Id)
    {
        var result = companyRepository.GetByExternalId(Id);
        return result == null ? await Task.FromResult<IActionResult>(NotFound()) : await Task.FromResult<IActionResult>(Ok($"{result.Id} - {result.Name}"));
    }

    [HttpPost]
    [Route("CreateOrUpdateCompany")]
    public Task<IActionResult> CreateOrUpdateCompany(ExternalCompanyDto company)
    {
        if (company?.ExternalId == null) return Task.FromResult<IActionResult>(BadRequest());
        var result = companyRepository.CreateOrUpdate(company);
        return result == null ? Task.FromResult<IActionResult>(InternalServerError()) : Task.FromResult<IActionResult>(Ok(result.Id));
    }

    [HttpPost]
    [Route("DeleteCompany")]
    public Task<IActionResult> DeleteCompany(Guid externalId)
    {
        var result = companyRepository.Delete(externalId);
        return result.Success ? Task.FromResult<IActionResult>(Ok()) : Task.FromResult<IActionResult>(InternalServerError());
    }

    [HttpPost]
    [Route("SyncCompanyByExternalId")]
    public async Task<IActionResult> SyncCompanyByExternalId(Guid Id)
    {
        var result = await memberTasks.SyncCompanyByExternalId(Id);
        return result == null ? await Task.FromResult<IActionResult>(NotFound()) : await Task.FromResult<IActionResult>(Ok($"{result.Id} - {result.Name}"));
    }


    [HttpPost]
    [Route("CreateOrUpdateMemberSubscription")]
    public async Task<IActionResult> CreateOrUpdateMemberSubscription(ExternalMemberSubscriptionDto memberSubscriptionDto)
    {
        try
        {
            var newMemberSubscription = mapper.Map<MemberSubscription>(memberSubscriptionDto);
            if (newMemberSubscription == null)
            {
                return await Task.FromResult<IActionResult>(BadRequest());
            }

            bool result = subscriptionHelper.CreateOrUpdateMemberSubscription(newMemberSubscription);
            return await (result ? Task.FromResult<IActionResult>(Ok(newMemberSubscription.Id)) : Task.FromResult<IActionResult>(InternalServerError()));
        }
        catch (Exception e)
        {
            logger.LogError(e, "Error creating member subscription for member {MemberId}", memberSubscriptionDto.MemberId);
            throw;
        }
    }

    [HttpPost]
    [Route("DeleteMemberSubscription")]
    public Task<IActionResult> DeleteMemberSubscription(Guid externalId)
    {
        try
        {
            var result = subscriptionHelper.DeleteMemberSubscription(externalId);
            return result.Success ? Task.FromResult<IActionResult>(Ok()) : Task.FromResult<IActionResult>(InternalServerError());
        }
        catch (Exception e)
        {
            logger.LogError(e, "Error creating member subscription {ExternalId}", externalId);
            throw;
        }
    }

    [HttpPost]
    [Route("SyncMemberSubscriptionByExternalId")]
    public async Task<IActionResult> SyncMemberSubscriptionByExternalId(Guid Id)
    {
        try
        {
            bool result = await memberTasks.SyncMemberSubscriptionByExternalId(Id);
            return result ? await Task.FromResult<IActionResult>(Ok(Id)) : await Task.FromResult<IActionResult>(NotFound());
        }
        catch (Exception e)
        {
            logger.LogError(e, "Error creating member subscription for member by Id: {Id}", Id);
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

            bool result = subscriptionHelper.CreateOrUpdateCompanySubscription(newCompanySubscription);
            return result ? Task.FromResult<IActionResult>(Ok(newCompanySubscription.Id)) : Task.FromResult<IActionResult>(InternalServerError());
        }
        catch (Exception e)
        {
            logger.LogError(e, "Error creating company subscription for company {CompanyId}", companySubscriptionDto.CompanyId);
            throw;
        }
    }

    [HttpPost]
    [Route("SyncCompanySubscriptionByExternalId")]
    public async Task<IActionResult> SyncCompanySubscriptionByExternalId(Guid Id)
    {
        try
        {
            bool result = await memberTasks.SyncCompanySubscriptionByExternalId(Id);
            return result ?
                await Task.FromResult<IActionResult>(NotFound()) :
                await Task.FromResult<IActionResult>(Ok(Id));
        }
        catch (Exception e)
        {
            logger.LogError(e, "Error creating company subscription for member by ID: {MemberId}", Id);
            throw;
        }
    }

    [HttpPost]
    [Route("DeleteCompanySubscription")]
    public async Task<IActionResult> DeleteCompanySubscription(Guid externalId)
    {
        try
        {

            var deleteResult = subscriptionHelper.DeleteCompanySubscription(externalId);
            return await (deleteResult.Success ? Task.FromResult<IActionResult>(Ok()) : Task.FromResult<IActionResult>(InternalServerError()));
        }
        catch (Exception e)
        {
            logger.LogError(e, "Error deleting company subscription for company {ExternalId}", externalId);
            throw;
        }
    }
}
