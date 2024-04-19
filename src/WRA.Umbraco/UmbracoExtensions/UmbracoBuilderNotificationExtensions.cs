using Umbraco.Cms.Core.Notifications;
using WRA.Umbraco.Events;
using WRA.Umbraco.Events.Notifications.Commerce;
using WRA.Umbraco.Events.Notifications.Member;
using WRA.Umbraco.Events.Notifications.Startup;

namespace WRA.Umbraco.UmbracoExtensions;

public static class UmbracoBuilderNotificationExtensions
{
    public static IUmbracoBuilder AddWraNotifications(this IUmbracoBuilder builder)
    {
        builder

            // content events
            .AddNotificationHandler<ContentPublishedNotification, WraProductNotifications>()
            .AddNotificationHandler<MemberSavedNotification, WraMemberNotifications>()

            // examine index events
            .AddNotificationHandler<ContentCacheRefresherNotification, ProductExamineValuesOnSave>()
            .AddNotificationHandler<MemberSavedNotification, MemberExamineValuesOnSave>()
            .AddNotificationHandler<UmbracoApplicationStartingNotification, StartingNotification>()
            .AddNotificationHandler<UmbracoApplicationStartedNotification, StartedNotification>();

        return builder;
    }
}