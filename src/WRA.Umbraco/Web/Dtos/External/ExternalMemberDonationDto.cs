using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WRA.Umbraco.Web.Dtos.External;
public class ExternalMemberDonationDto
{
    public string? MemberID { get; set; }
    public int CalendarYear { get; set; }
    public string? FundShortName { get; set; }
    public string? FundLongName { get; set; }
    public decimal TotalAmount { get; set; }
}
