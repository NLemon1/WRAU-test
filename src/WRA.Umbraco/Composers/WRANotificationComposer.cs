using Umbraco.Cms.Core.Composing;
using Umbraco.Cms.Core.Notifications;
using WRA.Umbraco.Events;
using WRA.Umbraco.Events.Notifications.Commerce;
using WRA.Umbraco.Events.Notifications.Member;
using WRA.Umbraco.Events.Notifications.Startup;

namespace WRA.Umbraco.Composers;

[ComposeAfter(typeof(SearchComposer))]
public class WraNotificationComposer : IComposer
{
    public void Compose(IUmbracoBuilder builder)
    {
        builder.AddNotificationHandler<ContentPublishedNotification, WraProductNotifications>();
        builder.AddNotificationHandler<MemberSavedNotification, WraMemberNotifications>();
        builder.AddNotificationHandler<ContentCacheRefresherNotification, ProductExamineValuesOnSave>();
        builder.AddNotificationHandler<MemberSavedNotification, MemberExamineValuesOnSave>();
        builder.AddNotificationHandler<UmbracoApplicationStartingNotification, StartingNotification>();
    }
}
