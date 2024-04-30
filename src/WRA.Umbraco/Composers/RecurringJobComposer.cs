using Hangfire;
using Microsoft.Extensions.DependencyInjection;
using Umbraco.Cms.Core.Composing;
using Cultiv.Hangfire;
using WRA.Umbraco.BackgroundJobs;

namespace WRA.Umbraco.Composers;

[ComposeAfter(typeof(HangfireComposer))]
public class RecurringJobComposer : IComposer
{
    public void Compose(IUmbracoBuilder builder)
    {
        // TODO set limit at a setting
        // member sync
        builder.Services.AddScoped<MemberTasks>();
        RecurringJob.AddOrUpdate<MemberTasks>(
            "Sync all Member Groups/Types",
            x => x.SyncAllMemberGroups(),
            Cron.Daily);

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
            Cron.Daily);

        // product sync
        builder.Services.AddScoped<ProductTasks>();
        RecurringJob.AddOrUpdate<ProductTasks>(
            "Sync categories and collections",
            x => x.SyncProductInfrastructure(),
            Cron.Never);
        RecurringJob.AddOrUpdate<ProductTasks>(
            "Sync all Products",
            x => x.QueueProductSync(),
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
    }
}

// public interface IJobs
// {
//     void ManipulateContent(PerformContext context);
// }
//
// public class Jobs : IJobs
// {
//     private readonly IServiceProvider _serviceProvider;
//     private readonly IUmbracoContextFactory _umbracoContextFactory;
//     private readonly IServerMessenger _serverMessenger;
//     private readonly IContentService _contentService;

    // public Jobs(IServiceProvider serviceProvider,
    //     IUmbracoContextFactory umbracoContextFactory,
    //     IServerMessenger serverMessenger,
    //     IContentService contentService)
    // {
    //     _serviceProvider = serviceProvider;
    //     _umbracoContextFactory = umbracoContextFactory;
    //     _serverMessenger = serverMessenger;
    //     _contentService = contentService;
    // }
    //
    // public void ManipulateContent(PerformContext context)
    // {
    //     using var backgroundScope = new BackgroundScope(_serverMessenger);
    //     using var _ = _umbracoContextFactory.EnsureUmbracoContext();
    //     using var serviceScope = _serviceProvider.CreateScope();
    //
    //     var query = serviceScope.ServiceProvider.GetRequiredService<IPublishedContentQuery>();
    //     var rootNode = query.ContentAtRoot().FirstOrDefault();
    //
    //     if (rootNode == null) return;
    //
    //     context.WriteLine($"Root node - Id: {rootNode.Id} | Name: {rootNode.Name}");
    //
    //     // Do something with ContentService
    //     var content = _contentService.GetById(rootNode.Id);
    //     content.Name = "Home " + DateTime.Now.ToUniversalTime();
    //     _contentService.SaveAndPublish(content);
    //
    //     context.WriteLine($"Root node updated - Id: {content.Id} | Name: {content.Name}");
    // }
//}

// public class BackgroundScope : IDisposable
// {
//     private readonly IServerMessenger _serverMessenger;
//
//     public BackgroundScope(IServerMessenger serverMessenger)
//     {
//         _serverMessenger = serverMessenger;
//     }
//
//     public void Dispose()
//     {
//         if (_serverMessenger is BatchedDatabaseServerMessenger batchedDatabaseServerMessenger)
//         {
//             batchedDatabaseServerMessenger.SendMessages();
//         }
//     }
//}
