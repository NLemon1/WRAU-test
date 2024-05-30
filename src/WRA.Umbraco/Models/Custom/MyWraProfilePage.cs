using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WRA.Umbraco.Web.Dtos.External;
using WRA.Umbraco.Web.Dtos.Member;
using WRA.Umbraco.Web.Dtos.MyWRA;

namespace WRA.Umbraco.Models;
public partial class MywraProfile
{
    public bool IsMember { get; set; }
    public EditMemberDto? EditableMember { get; set; }
    public List<ExternalMemberDonationDto> MemberDonations { get; set; }
    public List<MemberMarketingSubscriptionPreferenceDto> MagazinePreferences { get; set; }
    public List<MemberMarketingSubscriptionPreferenceDto> EmailPreferences { get; set; }
}
