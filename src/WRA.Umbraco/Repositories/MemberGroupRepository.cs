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
            var memberGroup = new MemberGroup();
            memberGroup.AdditionalData.Add(GlobalAliases.ExternalId, memberTypeDto.Id);
            memberGroup.AdditionalData.Add("type", memberTypeDto.Type);
            memberGroup.Name = memberTypeDto.Description;

            memberGroupService.Save(memberGroup);
            scope.Complete();
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
            memberGroup.AdditionalData.Add(GlobalAliases.ExternalId, memberGroupDto.Id);
            memberGroup.AdditionalData.Add("type", memberGroupDto.Type);
            memberGroup.Name = memberGroupDto.Description;

            memberGroupService.Save(memberGroup);
            scope.Complete();
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
        var matchingMemberGroups = allMemberGroups
            .Where(m => (m.AdditionalData?.GetValue(GlobalAliases.ExternalId) ?? new { }).Equals(Id.ToString()) == true);

        if (matchingMemberGroups == null || !matchingMemberGroups.Any()) return null;
        var matchingMemberGroup = matchingMemberGroups.First();
        var memberGroup = memberGroupService.GetById(matchingMemberGroup.Id);
        return memberGroup ?? null;

    }


}