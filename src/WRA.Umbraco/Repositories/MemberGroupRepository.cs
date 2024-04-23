using Microsoft.Extensions.Logging;
using Umbraco.Cms.Core.Models;
using Umbraco.Cms.Core.Scoping;
using Umbraco.Cms.Core.Services;
using WRA.Umbraco.Web.Dtos;

namespace WRA.Umbraco.Repositories;

public class MemberGroupRepository(
    IMemberGroupService memberGroupService,
    ICoreScopeProvider coreScopeProvider,
    ILogger<MemberGroupRepository> logger)
{
    public MemberGroup CreateMemberGroup(MemberGroupDto memberTypeDto)
    {
        try
        {
            using var scope = coreScopeProvider.CreateCoreScope();
            var memberGroup = new MemberGroup
            {
                Name = memberTypeDto.Description,
                Key = memberTypeDto.Id
            };

            memberGroupService.Save(memberGroup);
            scope.Complete();
            logger.LogInformation("Member group created: {MemberGroupKey}", memberGroup.Key);
            return memberGroup;
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error creating member group of id {Id}", memberTypeDto.Id);
            throw;
        }
    }

    public IMemberGroup UpdateMemberGroup(IMemberGroup memberGroup, MemberGroupDto memberGroupDto)
    {
        try
        {
            using var scope = coreScopeProvider.CreateCoreScope();
            memberGroup.Name = memberGroupDto.Description;
            memberGroup.Key = memberGroupDto.Id;

            memberGroupService.Save(memberGroup);
            scope.Complete();
            logger.LogInformation("Member group updated: {MemberGroupKey}", memberGroup.Key);
            return memberGroup;
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error updating member group of id {Id}", memberGroupDto.Id);
            throw;
        }
    }

    public IMemberGroup UpdateMemberGroup(MemberGroupDto memberTypeDto)
    {
        var memberGroup = GetMemberGroupByExternalId(memberTypeDto.Id);
        if (memberGroup == null)
        {
            return CreateMemberGroup(memberTypeDto);
        }

        return UpdateMemberGroup(memberGroup, memberTypeDto);
    }

    public IMemberGroup? GetMemberGroupByExternalId(Guid Id)
    {
        using var scope = coreScopeProvider.CreateCoreScope(autoComplete: true);
        var allMemberGroups = memberGroupService.GetAll();
        if (!allMemberGroups.Any()) return null;
        var matchingMemberGroups = allMemberGroups.Where(m => m.Key == Id);
        if (!matchingMemberGroups.Any()) return null;
        var memberGroup = memberGroupService.GetById(matchingMemberGroups.First().Id);
        return memberGroup ?? null;
    }
}