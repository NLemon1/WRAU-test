using Microsoft.EntityFrameworkCore.Metadata;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WRA.Umbraco.Web.Dtos.External;
public class ExternalMemberDuesPaymentStrategyDto
{
    public string? MemberID { get; set; }
    public int DuesPaymentStrategy { get; set; }
    public string? LocalBoardID { get; set; }
    public string? LocalBoard { get; set; }
    public string? LocalBoardEmail { get; set; }
    public string? LocalBoardPhone { get; set; }
    public string? LocalBoardWebsite { get; set; }
}
