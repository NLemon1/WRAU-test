using WRA.Umbraco.Contracts;

namespace WRA.Umbraco.Events.Consumers;
public interface IMemberUpdateService
{
    void UpdateMember(MemberEvent memberUpdate);
}