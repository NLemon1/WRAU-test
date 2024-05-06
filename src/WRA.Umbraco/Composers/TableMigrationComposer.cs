using Umbraco.Cms.Core.Composing;
using Umbraco.Cms.Core.Notifications;
using WRA.Umbraco.CustomTables.Subscriptions;
using WRA.Umbraco.Events.Notifications.CustomTableMigrations;

namespace WRA.Umbraco.Composers;

public class TableMigrationComposer : IComposer
{
    public void Compose(IUmbracoBuilder builder)
    {
        builder.AddNotificationHandler<UmbracoApplicationStartingNotification, MemberSubscriptionMigration>();
        builder.AddNotificationHandler<UmbracoApplicationStartingNotification, CompanySubscriptionMigration>();
    }
}