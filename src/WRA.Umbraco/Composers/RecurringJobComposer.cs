using Hangfire;
using Microsoft.Extensions.DependencyInjection;
using Umbraco.Cms.Core.Composing;
using Cultiv.Hangfire;
using Microsoft.Extensions.Configuration;
using WRA.Umbraco.BackgroundJobs;
using WRA.Umbraco.Configuration;
using WRA.Umbraco.Exceptions;

namespace WRA.Umbraco.Composers;

[ComposeAfter(typeof(HangfireComposer))]
public class RecurringJobComposer : IComposer
{
    public void Compose(IUmbracoBuilder builder)
    {
        var recurringJobSettings = builder.Config.GetSection(nameof(RecurringJobSettings)).Get<RecurringJobSettings>()
                                   ?? throw new ApplicationConfigurationException(nameof(RecurringJobSettings));

        if (recurringJobSettings.DisableJobs) return;
        bool manual = recurringJobSettings.AllJobsManual;
        builder.Services.AddScoped<MemberTasks>();
        RecurringJob.AddOrUpdate<MemberTasks>(
            "Sync all Member Groups/Types",
            x => x.SyncAllMemberGroups(),
            manual ? Cron.Never : Cron.Daily);

        RecurringJob.AddOrUpdate<MemberTasks>(
            "Sync all Members (with companies, boards, and groups)",
            x => x.SyncAllMembers(false, 10000),
            Cron.Never);

        RecurringJob.AddOrUpdate<MemberTasks>(
            "Sync all Members (only members)",
            x => x.SyncAllMembers(true, 10000),
            Cron.Never);

        RecurringJob.AddOrUpdate<MemberTasks>(
            "Sync all companies",
            x => x.SyncAllCompanies(),
            Cron.Never);

        RecurringJob.AddOrUpdate<MemberTasks>(
            "Sync all Boards",
            x => x.SyncAllBoards(),
            Cron.Never);

        RecurringJob.AddOrUpdate<MemberTasks>(
            "Sync Companies And Boards",
            x => x.SyncCompaniesAndBoards(),
            manual ? Cron.Never : Cron.Daily);

        RecurringJob.AddOrUpdate<MemberTasks>(
            "Sync all Member Subscriptions",
            x => x.SyncMemberSubscriptions(),
            Cron.Never);

        RecurringJob.AddOrUpdate<MemberTasks>(
            "Sync all Company Subscriptions",
            x => x.SyncCompanySubscriptions(),
            Cron.Never);

        // product sync
        builder.Services.AddScoped<ProductTasks>();
        RecurringJob.AddOrUpdate<ProductTasks>(
            "Sync categories and collections",
            x => x.SyncProductInfrastructure(),
            Cron.Never);
        RecurringJob.AddOrUpdate<ProductTasks>(
            "Sync all Products",
            x => x.SyncAllProducts(),
            Cron.Never);
        RecurringJob.AddOrUpdate<ProductTasks>(
            "Sync all Categories",
            x => x.SyncCategories(),
            Cron.Never);
        RecurringJob.AddOrUpdate<ProductTasks>(
            "Sync all SubCategories",
            x => x.SyncSubcategories(),
            Cron.Never);
        RecurringJob.AddOrUpdate<ProductTasks>(
            "Sync categories and subcategories",
            x => x.SyncProductCategoriesAndSubCategories(),
            Cron.Never);
        RecurringJob.AddOrUpdate<ProductTasks>(
            "Sync Product Collections",
            x => x.SyncProductCollections(),
            Cron.Never);
        RecurringJob.AddOrUpdate<ProductTasks>(
            "Sync Product Taxonomy",
            x => x.SyncAllTaxonomy(),
            Cron.Never);

        // hangfire specific jobs
        RecurringJob.AddOrUpdate<HangFireTasks>(
            "Clean up failed jobs",
            x => x.CleanFailedJobs(),
            Cron.Daily);
    }
}

