using System.Net;
using System.Text.Json;
using Hangfire;
using Hangfire.Storage.SQLite.Entities;
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

    public bool SyncAllMemberGroups()
    {
        try
        {
            var memberGroupsResp = wraExternalApiService.GetMemberGroups().Result;
            if (memberGroupsResp.Content == null) return true;
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

    public bool SyncAllMembers(bool syncOnlyMembers = false, int limit = 10000)
    {
        try
        {
            if (!syncOnlyMembers)
            {
                SyncAllBoards();
                SyncAllCompanies();
            }

            int pageNumber = 1;
            var members = GetMemberPages(pageNumber);

            if (members?.Data == null) return false;
            string? jobId = null;
            while (members.CurrentPage <= members.TotalPages)
            {
                var memberEvents = new List<MemberEvent>();
                foreach (var member in members.Data)
                {
                    var memberEvent = mapper.Map<MemberEvent>(member);
                    if (memberEvent != null ) memberEvents.Add(memberEvent);
                }

                if (memberEvents.Any())
                {
                    if (jobId != null)
                    {
                        jobId = BackgroundJob.ContinueJobWith(
                            jobId,
                            methodCall: () => wraMemberManagementService.BatchMemberUpdate(memberEvents));
                    }
                    else
                    {
                        jobId = BackgroundJob.Enqueue(() => wraMemberManagementService.BatchMemberUpdate(memberEvents));
                    }
                }

                pageNumber++;
                members = GetMemberPages(pageNumber);
                if (members == null) break;
            }

            return true;
        }
        catch (Exception e)
        {
            logger.LogError(e, "Task error syncing members from API. error: {Message}", e.Message);
            throw;
        }
    }

    private SearchResponse<ExternalMemberDto>? GetMemberPages(int pageNumber)
    {
        var membersResp = wraExternalApiService.GetPagedMembers(pageNumber).Result;
        return string.IsNullOrEmpty(membersResp.Content) ? null : JsonSerializer.Deserialize<SearchResponse<ExternalMemberDto>>(membersResp.Content, SerializationOptions);
    }

    public IMember? SyncMemberByExternalId(Guid externalId)
    {
        try
        {
            var memberResp = wraExternalApiService.GetMemberById(externalId).Result;
            if (memberResp.Content == null || memberResp.StatusCode != HttpStatusCode.OK) return null;
            var member =
                JsonSerializer.Deserialize<ExternalMemberDto>(memberResp.Content, SerializationOptions);

            if (member == null) return null;
            var memberEvent = mapper.Map<MemberEvent>(member);
            if (memberEvent == null) return null;
            var memberResult = wraMemberManagementService.CreateOrUpdate(memberEvent);

            return memberResult;
        }
        catch (Exception e)
        {
            logger.LogError(e, "Task error syncing member from API. error: {Message}", e.Message);
            throw;
        }
    }
    #endregion
    #region Boards and Companies
    public bool SyncAllCompanies()
    {
        try
        {
            var companiesResp = wraExternalApiService.GetCompanies().Result;
            if (companiesResp.Content == null) return false;
            var companies =
                JsonSerializer.Deserialize<SearchResponse<ExternalCompanyDto>>(companiesResp.Content, SerializationOptions);

            if (companies?.Data == null) return false;
            foreach (var company in companies.Data)
            {
                companyRepository.CreateOrUpdate(company);

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

    public bool SyncAllBoards()
    {
        try
        {
            var productsResp = wraExternalApiService.GetBoards().Result;
            if (productsResp.Content == null) return false;
            var localBoards = JsonSerializer.Deserialize<List<ExternalBoardDto>>(productsResp.Content, SerializationOptions);

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
                JsonSerializer.Deserialize<ExternalBoardDto>(boardResp.Content, SerializationOptions);

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
        // #todolightburn: No await?
        bool companiesResult = SyncAllCompanies();
        if (!companiesResult) return false;
        bool boardsResult = SyncAllBoards();
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