using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WRA.Umbraco.Web.Dtos.External;
public class ExternalMemberMarketingSubscriptionDto
{
    public string ID { get; set; } = string.Empty;
    public string MemberID { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string MarketingSubscriptionID { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Recipient { get; set; } = string.Empty;
    public string LegalBasis { get; set; } = string.Empty;
    public bool IsActive { get; set; }
    public string PreferenceGroupName { get; set; } = string.Empty;
    public string SourceSystem { get; set; } = string.Empty;
    public string SourceSystemID { get; set; } = string.Empty;
}
