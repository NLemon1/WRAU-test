namespace WRA.Umbraco.Configuration.Settings;

public class GatedContentSettings : IConfigurationSettings
{
    public string GatedMemberGroupsKey { get; set; } = "VisibleToMemberGroups";

    public string VisibleToAllKey { get; set; } = "VisibleToAll";

    public string AnonymousUserName { get; set; } = "Anonymous";

    public int VisibleToAllSlidingCacheMinutes { get; set; } = 240;

    public int VisibleToMemberGroupsSlidingCacheSeconds { get; set; } = 30;

    public int MemberAuthorizedByGroupSlidingCacheMinutes { get; set; } = 30;
}
