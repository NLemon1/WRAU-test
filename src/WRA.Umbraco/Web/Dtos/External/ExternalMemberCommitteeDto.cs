using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WRA.Umbraco.Web.Dtos.External;
public class ExternalMemberCommitteeDto
{
    public string ID { get; set; } = string.Empty;
    public string MemberID { get; set; } = string.Empty;
    public string CommitteeID { get; set; } = string.Empty;
    public string CommitteeName { get; set; } = string.Empty;
    public List<ExternalCommitteeTermsDto> CommitteeTerms { get; set; } = [];
}

public class ExternalCommitteeTermsDto
{
    public string ID { get; set; } = string.Empty;
    public string MemberCommitteeID { get; set; } = string.Empty;
    public string CommitteeTerm { get; set; } = string.Empty;
    public bool IsCurrent { get; set; }
    public string PositionCode { get; set; } = string.Empty;
    public string PositionName { get; set; } = string.Empty;
}
