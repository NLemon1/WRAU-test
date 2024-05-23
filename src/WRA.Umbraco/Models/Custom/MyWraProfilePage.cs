using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WRA.Umbraco.Web.Dtos.External;
using WRA.Umbraco.Web.Dtos.Member;

namespace WRA.Umbraco.Models;
public partial class MywraProfile
{
    public bool IsMember { get; set; }
    public EditMemberDto? EditableMember { get; set; }
    public List<ExternalMemberDonationdDto> MemberDonations { get; set; }
}
