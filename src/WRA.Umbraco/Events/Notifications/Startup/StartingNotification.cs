using Examine;
using Hangfire;
using Microsoft.Extensions.Logging;
using Umbraco.Cms.Core;
using Umbraco.Cms.Core.Events;
using Umbraco.Cms.Core.Models;
using Umbraco.Cms.Core.Notifications;
using Umbraco.Cms.Core.Scoping;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Core.Web;
using WRA.Umbraco.Configuration;
using WRA.Umbraco.Extensions;
using WRA.Umbraco.Models;

namespace WRA.Umbraco.Events.Notifications.Startup;

public class StartingNotification(
    IExamineManager examineManager,
    IUmbracoContextFactory umbracoContextFactory,
    IMemberService memberService,
    IContentService contentService,
    ICoreScopeProvider coreScopeProvider,
    IRuntimeState runtimeState,
    ILogger<TransformExamineValues> transformExamineValuesLogger,
    ILogger<TransformMemberExamineValues> transformMemberValuesLogger,
    ILogger<StartingNotification> logger
    ) : INotificationHandler<UmbracoApplicationStartingNotification>
{

    public void Handle(UmbracoApplicationStartingNotification notification)
    {
        if (runtimeState.Level < RuntimeLevel.Run)
        {
            return;
        }
        initializeEssentialContent();
        InitializeExamineIndexes();
    }

    private void initializeEssentialContent()
    {
        logger.LogInformation("Checking for essential content nodes...");
        var umbracoContextReference = umbracoContextFactory.EnsureUmbracoContext();
        var contentCache = umbracoContextReference.UmbracoContext.Content;
        var siteRoot = contentCache?.GetAtRoot().FirstOrDefault();

        var home = siteRoot.AncestorOrSelf<Home>();
        var homeUdi = home.GetUdi();
        if (homeUdi == null)
        {
            logger.LogError("Cannot find Home Node");
            return;
        }
        var productsPage = home.FirstChild<ProductsPage>();
        if (productsPage == null)
        {
            CreateContent("Products", homeUdi, ProductsPage.ModelTypeAlias);
            logger.LogInformation("Products page created");
        }

        // check fo companies page
        var companiesPage = home.FirstChild<Companies>();
        if (companiesPage == null)
        {
            CreateContent("Companies", homeUdi, Companies.ModelTypeAlias);
            logger.LogInformation("Companies page created");
            // BackgroundJob.Enqueue(() => CreateContent("Companies", homeUdi, Companies.ModelTypeAlias));
        }

        // check for boards page
        var boardsPage = home.FirstChild<Boards>();
        if (boardsPage == null)
        {
            CreateContent("Boards", homeUdi, Boards.ModelTypeAlias);
            logger.LogInformation("Boards page created");
            // BackgroundJob.Enqueue(() => CreateContent("Boards", homeUdi, Boards.ModelTypeAlias));
        }

        var taxonomyItemsPage = home.FirstChild<TaxonomyItems>();
        if (taxonomyItemsPage == null)
        {
            CreateContent("Taxonomy Items", homeUdi, TaxonomyItems.ModelTypeAlias);
            logger.LogInformation("Taxonomy Items page created");
            // BackgroundJob.Enqueue(() => CreateContent("Taxonomy Items", homeUdi, TaxonomyItems.ModelTypeAlias));
        }
    }

    public IContent CreateContent(string contentName, Udi parentUdi, string alias)
    {
        logger.LogInformation("Creating essential content {Content}...", contentName);
        var newContent = contentService.CreateContent(contentName, parentUdi, alias);
        contentService.SaveAndPublish(newContent);
        return newContent;
    }

    private void InitializeExamineIndexes()
    {
        try
        {
            var transformExamineValues = new TransformExamineValues(examineManager, umbracoContextFactory, transformExamineValuesLogger);
            var transformMemberExamineValues = new TransformMemberExamineValues(examineManager, umbracoContextFactory, memberService, transformMemberValuesLogger);

            transformExamineValues.SetCategoriesOnProducts();
            transformMemberExamineValues.SetMemberCustomFields();
            transformExamineValues.DisposeIfDisposable();
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Exception encountered during examine startup. {Message}", ex.Message);
            throw;
        }
    }
}
