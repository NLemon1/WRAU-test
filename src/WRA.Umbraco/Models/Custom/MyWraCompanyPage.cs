using Umbraco.Cms.Core.Models;

namespace WRA.Umbraco.Models;

public partial class MywraCompany
{
    public Company? MemberCompany { get; set; }
    public IEnumerable<IMember> MembersInCompany { get; set; }
}