using System.Text.Json;
using Hangfire;
using Microsoft.Extensions.Logging;
using Umbraco.Cms.Core.Mapping;
using Umbraco.Cms.Core.Models;
using WRA.Umbraco.Contracts;
using WRA.Umbraco.CustomTables.Subscriptions;
using WRA.Umbraco.Dtos;
using WRA.Umbraco.Repositories;
using WRA.Umbraco.Web.Dtos;
using WRA.Umbraco.Web.Dtos.External;
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
    SubscriptionHelper subscriptionHelper,
    ILogger<MemberTasks> logger)
{
    private static readonly JsonSerializerOptions SerializationOptions = new()
    {
        PropertyNameCaseInsensitive = true
    };

    #region  members

    public async Task<bool> SyncAllMemberGroups()
    {
        try
        {
            var memberGroupsResp = await wraExternalApiService.GetMemberGroups();
            var memberGroups =
                JsonSerializer.Deserialize<List<ExternalMemberGroupDto>>(memberGroupsResp.Content, SerializationOptions);

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
                JsonSerializer.Deserialize<SearchResponse<ExternalMemberDto>>(membersResp.Content, SerializationOptions);

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

    public async Task<IMember?> SyncMemberByExternalId(Guid externalId)
    {
        try
        {
            var memberResp = await wraExternalApiService.GetMemberById(externalId);
            if (memberResp.Content == null) return null;
            var member =
                JsonSerializer.Deserialize<ExternalMemberDto>(memberResp.Content, SerializationOptions);

            if (member == null) return null;
            var memberEvent = mapper.Map<MemberEvent>(member);
            var memberResult = await wraMemberManagementService.CreateOrUpdate(memberEvent);

            return memberResult;
        }
        catch (Exception e)
        {
            logger.LogError(e, "Task error syncing member from API. error: {Message}", e.Message);
            throw;
        }
    }
    #endregion
    # region Boards and Companies
    public async Task<bool> SyncAllCompanies()
    {
        try
        {
            var companiesResp = await wraExternalApiService.GetCompanies();
            if (companiesResp.Content == null) return false;
            var companies =
                JsonSerializer.Deserialize<SearchResponse<ExternalCompanyDto>>(companiesResp.Content, SerializationOptions);

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
    public async Task<IContent?> SyncCompanyByExternalId(Guid externalId)
    {
        try
        {
            var companyResp = await wraExternalApiService.GetCompanyById(externalId);
            if (companyResp.Content == null) return null;
            var company =
                JsonSerializer.Deserialize<ExternalCompanyDto>(companyResp.Content, SerializationOptions);

            if (company == null) return null;
            var companyResult = companyRepository.CreateOrUpdate(company);
            return companyResult;
        }
        catch (Exception e)
        {
            logger.LogError(e, "Task error syncing member from API. error: {Message}", e.Message);
            throw;
        }
    }

    public async Task<bool> SyncAllBoards()
    {
        try
        {
            var productsResp = await wraExternalApiService.GetBoards();
            var localBoards = JsonSerializer.Deserialize<List<ExternalMemberBoardDto>>(productsResp.Content, SerializationOptions);

            foreach (var board in localBoards)
            {
                boardRepository.CreateOrUpdateBoard(board);
            }

            return true;
        }
        catch (Exception e)
        {
            logger.LogError(e, "Task error syncing boards from API. error: {Message}", e.Message);
            throw;
        }
    }
    public async Task<IContent?> SyncBoardByExternalId(Guid externalId)
    {
        try
        {
            var boardResp = await wraExternalApiService.GetBoardById(externalId);
            if (boardResp.Content == null) return null;
            var board =
                JsonSerializer.Deserialize<ExternalMemberBoardDto>(boardResp.Content, SerializationOptions);

            if (board == null) return null;
            var result = boardRepository.CreateOrUpdateBoard(board);
            return result;
        }
        catch (Exception e)
        {
            logger.LogError(e, "Task error syncing member from API. error: {Message}", e.Message);
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
    #endregion
    #region Subscriptions

    public async Task<bool> SyncMemberSubscriptions()
    {
        try
        {
            var memberSubscriptionsResp = await wraExternalApiService.GetMemberSubscriptions();
            if (memberSubscriptionsResp.Content == null) return false;
            var memberSubscriptions =
                JsonSerializer.Deserialize<List<ExternalMemberSubscriptionDto>>(
                    memberSubscriptionsResp.Content,
                    SerializationOptions);

            foreach (var subscriptionDto in memberSubscriptions)
            {
                var memberSub = mapper.Map<MemberSubscription>(subscriptionDto);
                if (memberSub != null) subscriptionHelper.CreateOrUpdateMemberSubscription(memberSub);
            }
        }
        catch (Exception e)
        {
            logger.LogError(e, "Error creating member subscription for member");
            throw;
        }

        return true;
    }

    public async Task<bool> SyncMemberSubscriptionByExternalId(Guid Id)
    {
        try
        {
            var memberSubscriptionsResp = await wraExternalApiService.GetMemberSubscriptionById(Id);
            if (memberSubscriptionsResp.Content == null) return false;
            var memberSubscriptions =
                JsonSerializer.Deserialize<ExternalMemberSubscriptionDto>(
                    memberSubscriptionsResp.Content,
                    SerializationOptions);

            var memberSub = mapper.Map<MemberSubscription>(memberSubscriptions);
            if (memberSub != null) subscriptionHelper.CreateOrUpdateMemberSubscription(memberSub);
        }
        catch (Exception e)
        {
            logger.LogError(e, "Error creating member subscription for member");
            throw;
        }

        return true;
    }

    public async Task<bool> SyncCompanySubscriptions()
    {
        try
        {
           var companySubscriptionsResp = await wraExternalApiService.GetCompanySubscriptions();
           if (companySubscriptionsResp.Content == null) return false;
           var companySubscriptions =
               JsonSerializer.Deserialize<List<ExternalCompanySubscriptionDto>>(
                   companySubscriptionsResp.Content,
                   SerializationOptions);

           foreach (var companySubDto in companySubscriptions)
           {
                 var companySubscription = mapper.Map<CompanySubscription>(companySubDto);
                 if (companySubscription != null) subscriptionHelper.CreateOrUpdateCompanySubscription(companySubscription);
           }
        }
        catch (Exception e)
        {
            logger.LogError(e, "Error creating company subscription");
            throw;
        }

        return true;
    }

    public async Task<bool> SyncCompanySubscriptionByExternalId(Guid Id)
    {
        try
        {
            var companySubResp = await wraExternalApiService.GetCompanySubscriptionById(Id);
            if (companySubResp.Content == null) return false;
            var companySubscriptions =
                JsonSerializer.Deserialize<ExternalCompanySubscriptionDto>(
                    companySubResp.Content,
                    SerializationOptions);

            var companySub = mapper.Map<CompanySubscription>(companySubscriptions);
            if (companySub != null) subscriptionHelper.CreateOrUpdateCompanySubscription(companySub);
        }
        catch (Exception e)
        {
            logger.LogError(e, "Error creating company subscription");
            throw;
        }

        return true;
    }

    #endregion

}