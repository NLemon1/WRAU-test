using Umbraco.Cms.Core.Models;
using Umbraco.Cms.Core.Services;
using WRA.Umbraco.Helpers.Constants;

namespace WRA.Umbraco.Repositories;

public class MemberRepository(IMemberService memberService)
{
    public IMember? GetByExternalId(Guid Id)
    {
        var member = (memberService.GetMembersByPropertyValue(
            GlobalConstants.ExternalId, Id.ToString()) ?? Array.Empty<IMember>()).FirstOrDefault();
        return member;
    }

    public IMember? GetByEmail(string email)
    {
        var member = memberService.GetByEmail(email);
        return member;
    }

    public IMember? GetbyKey(Guid key)
    {
        var member = memberService.GetByKey(key);
        return member;
    }
}

