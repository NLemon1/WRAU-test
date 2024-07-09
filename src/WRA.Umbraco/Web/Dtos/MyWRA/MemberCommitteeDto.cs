using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WRA.Umbraco.Web.Dtos.MyWRA;
public class MemberCommitteeDto
{
    public string Name { get; set; } = string.Empty;
    public string FromYear { get; set; } = string.Empty;
    public string ToYear { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
}
