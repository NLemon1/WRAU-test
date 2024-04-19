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
    SiteContentSettings siteContentSettings,
    ILogger<TransformExamineValues> transformExamineValuesLogger,
    ILogger<TransformMemberExamineValues> transformMemberValuesLogger,
    ILogger<StartingNotification> logger
    ) : INotificationHandler<UmbracoApplicationStartingNotification>
{
    private readonly ILogger<StartingNotification> _logger = logger ?? throw new ArgumentNullException(nameof(logger));

    public void Handle(UmbracoApplicationStartingNotification notification)
    {
        InitializeExamineIndexes();
        InitializeMemberGroups();
        // initializeEssentialContent();
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
            var newProductsPage = CreateContent("Products", homeUdi, ProductsPage.ModelTypeAlias);
            if (newProductsPage != null)
            {
                BackgroundJob.Enqueue(() => InitializeProductCollectionPages(newProductsPage.GetUdi()));
            }
        }

        // check for Categories Page
        var categoriesPage = home.FirstChild<CategoriesPage>();
        if (categoriesPage == null)
        {
            BackgroundJob.Enqueue(() => CreateContent("Categories", homeUdi, CategoryPage.ModelTypeAlias));
        }

        // check fo companies page
        var companiesPage = home.FirstChild<Companies>();
        if (companiesPage == null)
        {
            BackgroundJob.Enqueue(() => CreateContent("Companies", homeUdi, Companies.ModelTypeAlias));
        }

        // check for boards page
        var boardsPage = home.FirstChild<Boards>();
        if (boardsPage == null)
        {
            BackgroundJob.Enqueue(() => CreateContent("Boards", homeUdi, Boards.ModelTypeAlias));
        }
    }

    public IContent CreateContent(string contentName, Udi parentUdi, string alias)
    {
        var scope = coreScopeProvider.CreateCoreScope();
        scope.Notifications.Suppress();
        scope.WriteLock(Constants.Locks.Domains);
        logger.LogInformation("Creating essential content {Content}...", contentName);
        var newContent = contentService.CreateContent(contentName, parentUdi, alias);

        contentService.SaveAndPublish(newContent);
        scope.Complete();
        return newContent;
    }

    public void InitializeProductCollectionPages(Udi parent)
    {
        var productTypes = siteContentSettings.ProductTypes;
        foreach (var productType in productTypes)
        {
            CreateContent(productType, parent, CollectionPage.ModelTypeAlias);
        }
    }
    private void InitializeMemberGroups()
    {
        var roleNames = siteContentSettings.MemberTypes;
        var allRoles = memberService.GetAllRoles();
        foreach (var roleName in roleNames.Where(roleName => !allRoles.Any(x => x.Name == roleName)))
        {
            memberService.AddRole(roleName);
        }
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
            _logger.LogError(ex, "Exception encountered during examine startup. {Message}", ex.Message);
            throw;
        }
    }
}
