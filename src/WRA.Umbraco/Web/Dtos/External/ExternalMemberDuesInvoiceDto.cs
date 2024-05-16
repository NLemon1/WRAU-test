using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WRA.Umbraco.Web.Dtos.External;
public class ExternalMemberDuesInvoiceDto
{
    public int Id { get; set; }
    public string? DuesInvoiceToken { get; set; }
    public DateTime DateInserted { get; set; }
    public DateTime PaymentDate { get; set; }
    public int IMISID { get; set; }
    public decimal TotalAmount { get; set; }
    public string? Description { get; set; }
    public string? LocalBoardID { get; set; }
    public string? LocalBoardName { get; set; }
    public int ECControlNumber { get; set; }
    public int MemberID { get; set;}
    public int Year { get; set; }
    public int DuesBillSeqn { get; set; }
}
