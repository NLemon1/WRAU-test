using Microsoft.Extensions.Logging;
using Umbraco.Cms.Core.Models;
using Umbraco.Cms.Core.Scoping;
using Umbraco.Cms.Core.Services;
using WRA.Umbraco.Exceptions;
using WRA.Umbraco.Web.Dtos;
using WRA.Umbraco.Web.Dtos.External;

namespace WRA.Umbraco.Repositories;

public class MemberGroupRepository
{
    private readonly IMemberGroupService _memberGroupService;
    private readonly IMemberService _memberService;
    private readonly ICoreScopeProvider _coreScopeProvider;
    private readonly ILogger _logger;

    public MemberGroupRepository(
        IMemberGroupService memberGroupService,
        IMemberService memberService,
        ICoreScopeProvider coreScopeProvider,
        ILogger logger)
    {
        this._memberGroupService = memberGroupService;
        this._memberService = memberService;
        this._coreScopeProvider = coreScopeProvider;
        this._logger = logger.ForContext<MemberGroupRepository>();
    }

    public MemberGroup? CreateMemberGroup(ExternalMemberGroupDto memberTypeDto)
    {
        try
        {
            using var scope = _coreScopeProvider.CreateCoreScope();
            var memberGroup = new MemberGroup
            {
                Name = memberTypeDto.Description,
                Key = memberTypeDto.Id
            };

            _memberGroupService.Save(memberGroup);
            scope.Complete();
            _logger.Information("Member group created: {MemberGroupKey}", memberGroup.Key);
            return memberGroup;
        }
        catch (Exception ex)
        {
            _logger.Error(ex, "Error creating member group of id {Id}", memberTypeDto.Id);
            throw;
        }
    }

    public IMemberGroup? UpdateMemberGroup(ExternalMemberGroupDto memberTypeDto)
    {
        var memberGroup = GetMemberGroupByExternalId(memberTypeDto.Id);
        return memberGroup == null ? CreateMemberGroup(memberTypeDto) : UpdateMemberGroup(memberGroup, memberTypeDto);
    }

    public IMemberGroup UpdateMemberGroup(IMemberGroup memberGroup, ExternalMemberGroupDto memberGroupDto)
    {
        try
        {
            using var scope = _coreScopeProvider.CreateCoreScope();
            memberGroup.Name = memberGroupDto.Description;
            memberGroup.Key = memberGroupDto.Id;

            _memberGroupService.Save(memberGroup);
            scope.Complete();
            _logger.Information("Member group updated: {MemberGroupKey}", memberGroup.Key);
            return memberGroup;
        }
        catch (Exception ex)
        {
            _logger.Error(ex, "Error updating member group of id {Id}", memberGroupDto.Id);
            throw;
        }
    }

    public bool DeleteMemberGroup(ExternalMemberGroupDto memberGroupDto)
    {
        try
        {
            using var scope = _coreScopeProvider.CreateCoreScope();
            var memberGroup = GetMemberGroupByExternalId(memberGroupDto.Id);
            if (memberGroup == null)
            {
                scope.Complete();
                return false;
            }

            _memberGroupService.Delete(memberGroup);
            scope.Complete();
            _logger.Information("Member group deleted: {MemberGroupKey}", memberGroup.Key);
            return true;
        }
        catch (Exception ex)
        {
            _logger.Error(ex, "Error updating member group of id {Id}", memberGroupDto.Id);
            throw;
        }
    }

    public IMemberGroup? GetMemberGroupByExternalId(Guid Id)
    {
        using var scope = _coreScopeProvider.CreateCoreScope(autoComplete: true);
        var allMemberGroups = _memberGroupService.GetAll();
        if (!allMemberGroups.Any()) return null;
        var matchingMemberGroups = allMemberGroups.Where(m => m.Key == Id);
        if (!matchingMemberGroups.Any()) return null;
        var memberGroup = _memberGroupService.GetById(matchingMemberGroups.First().Id);
        return memberGroup ?? null;
    }

    public IEnumerable<IMemberGroup?> GetMemberGroupsByMember(IMember member)
    {
        var memberGroups = _memberService.GetAllRolesIds(member.Id);
        foreach (int group in memberGroups)
        {
            yield return _memberGroupService.GetById(group);
        }
    }

    /// <summary>
    /// Retrieves an <see cref="IEnumerable{T}"/> of all umbraco member groups / WRA Member Types from Umbraco.
    /// </summary>
    /// <returns>
    /// An <see cref="IEnumerable{T}"/> representing the collection of all local boards.
    /// If no boards are found, returns an empty <see cref="IEnumerable{T}"/>.
    /// </returns>
    /// <exception cref="UmbracoRepositoryException">
    /// Thrown if an error occurs during the retrieval of umbraco member groups from umbraco.
    /// </exception>
    public IEnumerable<IMemberGroup> GetAllMemberGroups()
    {
        using LoggerActivity? activity = _logger.StartActivity(LogEventLevel.Information, "Umbraco Repository - {Repository}:{Method}", nameof(MemberGroupRepository), nameof(GetAllMemberGroups));
        try
        {
            using ICoreScope? scope = _coreScopeProvider.CreateCoreScope(autoComplete: true);
            IEnumerable<IMemberGroup> memberGroups = _memberGroupService.GetAll();
            _logger.Debug("Retrieved {Count} umbraco member groups from umbraco.", memberGroups.Count());
            activity.Complete();
            return memberGroups;
        }
        catch (Exception ex)
        {
            activity.Complete(LogEventLevel.Error, ex);
            _logger.Error(ex, "An error occurred while retrieving all member groups from umbraco.");
            throw new UmbracoRepositoryException($"An error occurred while retrieving all member groups from {nameof(BoardRepository)}", ex);
        }
    }
}
