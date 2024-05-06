using Microsoft.Extensions.Logging;
using Umbraco.Cms.Infrastructure.Migrations;

namespace WRA.Umbraco.CustomTables.Subscriptions;

public class CompanySubscriptionsTable(IMigrationContext context) : MigrationBase(context)
{
    protected override void Migrate()
    {
        string tableName = typeof(CompanySubscriptionsTable).ToString();
        Logger.LogDebug("Running migration {MigrationStep}", tableName);

        // Lots of methods available in the MigrationBase class - discover with this.
        if (!TableExists(tableName))
        {
            Create.Table<CompanySubscription>().Do();
        }
        else
        {
            Logger.LogDebug("The database table {DbTable} already exists, skipping", tableName);
        }
    }
}