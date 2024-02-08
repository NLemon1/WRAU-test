using Umbraco.Cms.Core.Notifications;
using WRA.Umbraco.Events;

public static class UmbracoBuilderNotificationExtensions
{
    public static IUmbracoBuilder AddWraNotifications(this IUmbracoBuilder builder)
    {
        builder
            .AddNotificationHandler<ContentPublishedNotification, WraProductNotifications>()
            .AddNotificationHandler<MemberSavedNotification, WraMemberNotifications>();

        return builder;
    }
}