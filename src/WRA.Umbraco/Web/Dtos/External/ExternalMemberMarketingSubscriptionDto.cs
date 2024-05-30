using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WRA.Umbraco.Web.Dtos.External;
public class ExternalMemberMarketingSubscriptionDto
{
    public string ID { get; set; }
    public string MemberID { get; set; }
    public string Name { get; set; }
    public string MarketingSubscriptionID { get; set; }
    public string Description { get; set; }
    public string Recipient { get; set; }
    public string LegalBasis { get; set; }
    public bool IsActive { get; set; }
    public string PreferenceGroupName { get; set; }
    public string SourceSystem { get; set; }
    public string SourceSystemID { get; set; }
}
