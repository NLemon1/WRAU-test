using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WRA.Umbraco.Web.Dtos.External;

namespace WRA.Umbraco.Web.Dtos.MyWRA;
public class MemberDuesDto
{
    public ExternalMemberDuesPaymentStrategyDto? PaymentStrategy { get; set; }
    public ExternalMemberDuesInvoiceDto? Invoice { get; set; }

}
