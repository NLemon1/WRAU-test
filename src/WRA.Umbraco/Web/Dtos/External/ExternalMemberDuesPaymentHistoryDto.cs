using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WRA.Umbraco.Web.Dtos.External;
public class ExternalMemberDuesPaymentHistoryDto
{
    public string Id { get; set; } = string.Empty;
    public DateTime PaidDate { get; set; }
    public string MemberID { get; set; } = string.Empty;
    public string IMISID { get; set; } = string.Empty;
    public string LocalBoardID { get; set; } = string.Empty;
    public string LocalBoardName { get; set; } = string.Empty;
    public string CompanyID { get; set; } = string.Empty;
    public string CompanyName { get; set; } = string.Empty;
    public string InvoiceAddress { get; set; } = string.Empty;
    public string FullName { get; set; } = string.Empty;
    public string FullAddress { get; set; } = string.Empty;
    public string WorkPhone { get; set; } = string.Empty;
    public string Fax { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public decimal TotalAmount { get; set; }
    public List<ExternalMemberDuesPaymentHistoryLineItem> TransactionLineItems { get; set; } = new List<ExternalMemberDuesPaymentHistoryLineItem>();
}

public class ExternalMemberDuesPaymentHistoryLineItem
{
    public string TransactionID { get; set; } = string.Empty;
    public string TransactionItemID { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public decimal Price { get; set; }
}
