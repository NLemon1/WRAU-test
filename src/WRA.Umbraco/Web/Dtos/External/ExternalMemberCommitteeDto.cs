using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WRA.Umbraco.Web.Dtos.External;
public class ExternalMemberCommitteeDto
{
    public string ID { get; set; }
    public string MemberID { get; set; }
    public string CommitteeID { get; set; }
    public string CommitteeName { get; set; }
    public List<ExternalCommitteeTermsDto> CommitteeTerms { get; set; }
}

public class ExternalCommitteeTermsDto
{
    public string ID { get; set; }
    public string MemberCommitteeID { get; set; }
    public string CommitteeTerm { get; set; }
    public bool IsCurrent { get; set; }
    public string PositionCode { get; set; }
    public string PositionName { get; set; }
}
