using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WRA.Umbraco.Web.Dtos.MyWRA;
public class MemberMarketingSubscriptionPreferencesDto
{
    public string MemberID { get; set; }
    public List<MemberMarketingSubscriptionPreferenceDto> MagazinePreferences { get; set; }
    public List<MemberMarketingSubscriptionPreferenceDto> EmailPreferences { get; set; }
}

public class MemberMarketingSubscriptionPreferenceDto
{
    public string SubscriptionID { get; set; }
    public string SubscriptionName { get; set; }
    public bool IsActive { get; set; }
    public bool PreviousValue { get; set; }
    public string Description { get; set; }
}
