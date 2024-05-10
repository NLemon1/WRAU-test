using Microsoft.Extensions.Logging;
using Umbraco.Cms.Core.Cache;
using Umbraco.Cms.Core.Models;
using Umbraco.Cms.Core.Scoping;
using Umbraco.Cms.Core.Services;
using WRA.Umbraco.Contracts;
using WRA.Umbraco.Extensions;
using WRA.Umbraco.Repositories;
using WRA.Umbraco.Services.Caching;

namespace WRA.Umbraco.Helpers;

public class MemberHelper(
    ICacheKeyProvider cacheKeyProvider,
    IMemberService memberService,
    ICoreScopeProvider coreScopeProvider,
    ILogger<MemberHelper> logger,
    MemberGroupRepository memberGroupRepository,
    CompanyRepository companyRepository,
    BoardRepository boardRepository,
    AppCaches appCache)
: ContentHelperBase<IMember, MemberEvent>(cacheKeyProvider, appCache)
{
    public IMember SetProperties(IMember target, MemberEvent source)
    {
        using var scope = coreScopeProvider.CreateCoreScope();
        DynamicUpdate(target, source);
        SetProperty(target, GlobalAliases.ExternalId, source.Id);
        SetSensitiveData(target, source.PasswordHash, source.PasswordSalt);
        SetCompanyOnMember(target, source);
        SetBoardOnMember(target, source);
        target.Name = source.FullName;

        // save member now so that we can have an Id to assign a group to
        memberService.Save(target);
        AssignMemberToGroup(target, source.MemberTypeId);
        memberService.Save(target);

        logger.LogInformation("Member updated: {MemberId}", target.Id);
        scope.Complete();
        return target;
    }

    private static void SetSensitiveData(IMember existingMember, string hash, string salt)
    {
        SetProperty(existingMember, "token", salt);
        existingMember.RawPasswordValue = hash;
    }

    private void SetCompanyOnMember(IMember member, MemberEvent memberEvent)
    {
        var company = companyRepository.GetByExternalId(memberEvent.CompanyId);
        if (company != null)
        {
            member.SetValue(GlobalAliases.Company, company.GetUdi());
        }
    }

    private void SetBoardOnMember(IMember member, MemberEvent memberEvent)
    {
        if (memberEvent.PrimaryLocalBoardId == null || memberEvent.PrimaryLocalBoardId.Equals(Guid.Empty)) return;
        var board = boardRepository.Get(memberEvent.PrimaryLocalBoardId.Value);
        if (board != null)
        {
            member.SetValue(GlobalAliases.LocalBoards, board.GetUdi());
        }
    }

    private void AssignMemberToGroup(IMember member, Guid memberTypeId)
    {
        var memberGroup = memberGroupRepository.GetMemberGroupByExternalId(memberTypeId);
        bool memberIsAlreadyInGroup = memberGroup.Name != null && memberService.GetMembersInRole(memberGroup.Name).Any(x => x.Id == member.Id);
        if (memberIsAlreadyInGroup) return;
        memberService.AssignRole(member.Id, memberGroup.Name!);
        logger.LogInformation("Member assigned to group: {MemberId} - {MemberGroupKey}", member.Id, memberGroup.Key);
    }
}