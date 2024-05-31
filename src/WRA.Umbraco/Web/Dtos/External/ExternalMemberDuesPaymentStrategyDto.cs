using Microsoft.EntityFrameworkCore.Metadata;
using NPoco;
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
    public string? LocalBoardFullAddress { get; set; }
    public string? LocalBoardAddressLine1 { get; set; }
    public string? LocalBoardAddressLine2 { get; set; }
    public string? LocalBoardCity { get; set; }
    public string? LocalBoardState { get; set; }
    public string? LocalBoardZip { get; set; }

    [Ignore]
    public string PaymentStrategy
    {
        get
        {
            switch (this.DuesPaymentStrategy)
            {
                case 1:
                    return "Hosted Dues Payment Page";
                case 2:
                    return "Contact Local Board";
                case 3:
                    return "Contact NAR";
                default:
                    return "Undetermined";
            }
        }
    }
}
