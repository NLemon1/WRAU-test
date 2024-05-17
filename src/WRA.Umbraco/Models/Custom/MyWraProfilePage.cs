using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WRA.Umbraco.Web.Dtos.External;

namespace WRA.Umbraco.Models;
public partial class MywraProfile
{
    public bool IsMember { get; set; }
    public List<ExternalMemberDonationdDto> MemberDonations { get; set; }
}
