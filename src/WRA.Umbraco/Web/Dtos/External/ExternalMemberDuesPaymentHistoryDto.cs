using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WRA.Umbraco.Web.Dtos.External;
public class ExternalMemberDuesPaymentHistoryDto
{
    public string Id { get; set; }
    public DateTime PaidDate { get; set; }
    public string MemberID { get; set; }
    public string IMISID { get; set; }
    public string LocalBoardID { get; set; }
    public string LocalBoardName { get; set; }
    public string CompanyID { get; set; }
    public string CompanyName { get; set; }
    public string InvoiceAddress { get; set; }
    public string FullName { get; set; }
    public string FullAddress { get; set; }
    public string WorkPhone { get; set; }
    public string Fax { get; set;}
    public string Email { get; set; }
    public decimal TotalAmount { get; set; }
    public List<ExternalMemberDuesPaymentHistoryLineItem> TransactionLineItems { get; set; }
}

public class ExternalMemberDuesPaymentHistoryLineItem
{
    public string TransactionID { get; set; }
    public string TransactionItemID { get; set; }
    public string Description { get; set; }
    public decimal Price { get; set; }
}
