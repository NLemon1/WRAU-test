using Examine;
using Hangfire;
using Lucene.Net.QueryParsers.Surround.Parser;
using Microsoft.Extensions.Logging;
using Umbraco.Cms.Core;
using Umbraco.Cms.Core.Events;
using Umbraco.Cms.Core.Models;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Core.Notifications;
using Umbraco.Cms.Core.Scoping;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Core.Web;
using Umbraco.Cms.Infrastructure.HostedServices;
using WRA.Umbraco.Configuration;
using WRA.Umbraco.Extensions;
using WRA.Umbraco.Models;

namespace WRA.Umbraco.Events.Notifications.Startup;

public class StartedNotification(
    IUmbracoContextFactory umbracoContextFactory,
    IContentService contentService,
    ICoreScopeProvider coreScopeProvider,
    SiteContentSettings siteContentSettings,
    IBackgroundTaskQueue  backgroundTaskQueue,
    ILogger<StartingNotification> logger) : INotificationHandler<UmbracoApplicationStartedNotification>
{
    public void Handle(UmbracoApplicationStartedNotification notification)
    {
        // InitializeEssentialContent();
    }

    private void InitializeEssentialContent()
    {
        var scope = coreScopeProvider.CreateCoreScope();
        scope.Notifications.Suppress();
        logger.LogInformation("Checking for essential content nodes...");
        var umbracoContextReference = umbracoContextFactory.EnsureUmbracoContext();
        var contentCache = umbracoContextReference.UmbracoContext.Content;
        var siteRoot = contentCache?.GetAtRoot().FirstOrDefault();

        var home = siteRoot.AncestorOrSelf<Home>();
        var homeUdi = home.GetUdi();
        var homeContent = contentService.GetById(home.Key);
        if (homeUdi == null)
        {
            logger.LogError("Cannot find Home Node");
        }
        var productsPage = home.FirstChild<ProductsPage>();
        if (productsPage == null)
        {
            scope.WriteLock(Constants.Locks.ContentTree);
            CreateContent("Products", homeContent, ProductsPage.ModelTypeAlias);
            scope.Complete();
        }

        // // check for Categories Page
        // var categoriesPage = home.FirstChild<CategoriesPage>();
        // if (categoriesPage == null)
        // {
        //     backgroundTaskQueue.QueueBackgroundWorkItem(async _=>
        //     {
        //         await CreateContent("Categories", homeContent, CategoryPage.ModelTypeAlias);
        //     });
        // }
        //
        // // check fo companies page
        // var companiesPage = home.FirstChild<Companies>();
        // if (companiesPage == null)
        // {
        //     backgroundTaskQueue.QueueBackgroundWorkItem(_ =>
        //     {
        //         CreateContent("Companies", homeContent, Companies.ModelTypeAlias);
        //
        //         return Task.CompletedTask;
        //     });
        // }
        //
        // // check for boards page
        // var boardsPage = home.FirstChild<Boards>();
        // if (boardsPage == null)
        // {
        //     backgroundTaskQueue.QueueBackgroundWorkItem(_ =>
        //     {
        //         CreateContent("Boards", homeContent, Boards.ModelTypeAlias);
        //         return Task.CompletedTask;
        //     });
        // }
    }

    public IContent CreateContent(string contentName, IContent parent, string alias)
    {

        logger.LogInformation("Creating essential content {Content}...", contentName);
        var parentContent = contentService.GetById(parent.Key);
        var newContent = contentService.CreateContent(contentName, parentContent.GetUdi(), alias);
        contentService.SaveAndPublish(newContent);
        return  newContent;
    }

    // public Task InitializeProductCollectionPages(IContent parent)
    // {
    //     var productTypes = siteContentSettings.ProductTypes;
    //     foreach (var productType in productTypes)
    //     {
    //         backgroundTaskQueue.QueueBackgroundWorkItem(async _ =>
    //         {
    //             await CreateContent(productType, parent, CollectionPage.ModelTypeAlias);
    //         });
    //     }
    //
    //     return Task.FromResult(Task.CompletedTask);
    // }
}