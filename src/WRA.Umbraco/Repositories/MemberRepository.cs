using Umbraco.Cms.Core.Models;
using Umbraco.Cms.Core.Services;

namespace WRA.Umbraco.Repositories;

public class MemberRepository(IMemberService memberService)
{
    public IMember? GetByExternalId(Guid Id)
    {
        var member = (memberService.GetMembersByPropertyValue(
            GlobalAliases.ExternalId, Id.ToString()) ?? Array.Empty<IMember>()).FirstOrDefault();
        return member;
    }
}

