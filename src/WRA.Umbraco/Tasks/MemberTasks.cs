using System.Text.Json;
using Hangfire;
using Microsoft.Extensions.Logging;
using Umbraco.Cms.Core.Mapping;
using WRA.Umbraco.Contracts;
using WRA.Umbraco.Dtos;
using WRA.Umbraco.Repositories;
using WRA.Umbraco.Web.Dtos;
using WRA.Umbraco.Web.Dtos.WraExternal;
using WRA.Umbraco.Web.Services;

namespace WRA.Umbraco.BackgroundJobs;

public class MemberTasks(
    IUmbracoMapper mapper,
    WraMemberManagementService wraMemberManagementService,
    WraExternalApiService wraExternalApiService,
    MemberGroupRepository memberGroupRepository,
    CompanyRepository companyRepository,
    BoardRepository boardRepository,
    ILogger<MemberTasks> logger)
{
    private static readonly JsonSerializerOptions SerializationOptions = new()
    {
        PropertyNameCaseInsensitive = true
    };

    public async Task<bool> SyncAllMemberGroups()
    {
        try
        {
            var memberGroupsResp = await wraExternalApiService.GetMemberGroups();
            var memberGroups =
                JsonSerializer.Deserialize<List<MemberGroupDto>>(memberGroupsResp.Content, SerializationOptions);

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

            return true;
        }
        catch (Exception e)
        {
            logger.LogError(e, "Task Error syncing member groups");
            throw;
        }
    }

    public async Task<bool> SyncAllCompanies()
    {
        try
        {
            var companiesResp = await wraExternalApiService.GetCompanies();
            if (companiesResp.Content == null) return false;
            var companies =
                JsonSerializer.Deserialize<SearchResponse<CompanyDto>>(companiesResp.Content, SerializationOptions);

            if (companies?.Data == null) return false;
            foreach (var company in companies.Data)
            {
                BackgroundJob.Enqueue(() => companyRepository.CreateOrUpdate(company));

            }

            return true;
        }
        catch (Exception e)
        {
            logger.LogError(e, "Task error syncing companies from API. error: {Message}", e.Message);
            throw;
        }
    }

    public async Task<bool> SyncAllBoards()
    {
        try
        {
            var productsResp = await wraExternalApiService.GetBoards();
            var localBoards = JsonSerializer.Deserialize<List<MemberBoardDto>>(productsResp.Content, SerializationOptions);

            foreach (var board in localBoards)
            {
                BackgroundJob.Enqueue(() => boardRepository.CreateOrUpdateBoard(board));
            }

            return true;
        }
        catch (Exception e)
        {
            logger.LogError(e, "Task error syncing boards from API. error: {Message}", e.Message);
            throw;
        }
    }

    public async Task<bool> SyncAllMembers(bool syncOnlyMembers = false, int limit = 10000)
    {
        try
        {
            if (!syncOnlyMembers)
            {
                await SyncAllBoards();
                await SyncAllCompanies();
            }

            var membersResp = await wraExternalApiService.GetMembers(limit);
            if (membersResp.Content == null) return false;
            var members =
                JsonSerializer.Deserialize<SearchResponse<MemberDto>>(membersResp.Content, SerializationOptions);

            if (members?.Data == null) return false;
            foreach (var member in members.Data)
            {
                var memberEvent = mapper.Map<MemberEvent>(member);
                await wraMemberManagementService.CreateOrUpdate(memberEvent);
            }

            return true;}
        catch (Exception e)
        {
            logger.LogError(e, "Task error syncing members from API. error: {Message}", e.Message);
            throw;
        }
    }

    public async Task<bool> SyncCompaniesAndBoards()
    {
        bool companiesResult = await SyncAllCompanies();
        if (!companiesResult) return false;
        bool boardsResult = await SyncAllBoards();
        return boardsResult;
    }
}