using Microsoft.Extensions.Logging;
using Umbraco.Cms.Core.Models;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Core.Scoping;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Core.Web;
using WRA.Umbraco.Dtos;
using WRA.Umbraco.Extensions;
using WRA.Umbraco.Models;

namespace WRA.Umbraco.Repositories;

public class CategoryRepository(
    ICoreScopeProvider coreScopeProvider,
    IUmbracoContextFactory umbracoContextFactory,
    IContentService contentService,
    ILogger<CategoryRepository> logger)
{
    public async Task<IContent> CreateOrUpdate(ProductCategoryDto categoryInfo)
    {
        try
        {
            using var scope = coreScopeProvider.CreateCoreScope();
            using var umbracoContextReference = umbracoContextFactory.EnsureUmbracoContext();
            var contentCache = umbracoContextReference.UmbracoContext.Content;
            var home = contentCache.GetAtRoot().FirstOrDefault();
            var categoriesPage = home.ChildrenOfType(CategoriesPage.ModelTypeAlias).FirstOrDefault();


            if (categoriesPage != null)
            {
                var existingCategories = categoriesPage.ChildrenOfType(CategoryPage.ModelTypeAlias);
                var existingCategoryPage = existingCategories?
                    .FirstOrDefault(cat =>
                        cat.Value<Guid>(GlobalAliases.ExternalId).Equals(categoryInfo.ExternalId));
                if (existingCategoryPage != null)
                {
                    var existingCategoryPageContent = contentService.GetById(existingCategoryPage.Id);
                    SetCategoryProperties(existingCategoryPageContent, categoryInfo);
                    contentService.SaveAndPublish(existingCategoryPageContent);
                    scope.Complete();
                    return existingCategoryPageContent;
                }
            }
            var category = contentService.Create(categoryInfo.Name, categoriesPage.Id, CategoryPage.ModelTypeAlias);
            SetCategoryProperties(category, categoryInfo);
            contentService.SaveAndPublish(category);
            scope.Complete();
            return category;
        }
        catch (Exception e)
        {
            logger.LogError(e, "Error creating or updating category");
            throw;
        }
    }
    public async Task<IContent?> CreateOrUpdateSubCategory(ProductSubCategoryDto subCategoryInfo)
    {
        try
        {
            using var scope = coreScopeProvider.CreateCoreScope();

            using var umbracoContextReference = umbracoContextFactory.EnsureUmbracoContext();
            var contentCache = umbracoContextReference.UmbracoContext.Content;
            var home = contentCache.GetAtRoot().FirstOrDefault();

            // get all categories page
            var categoryPages = home.ChildrenOfType(CategoriesPage.ModelTypeAlias)
                .FirstOrDefault()
                .ChildrenOfType(CategoryPage.ModelTypeAlias);

            if (categoryPages == null)
            {
                scope.Complete();
                return null;
            }

            // get all category page that has the Id of the requested subcategory parent
            var parentCategory = categoryPages.First(c =>
                c.Value<Guid>(GlobalAliases.ExternalId).Equals(subCategoryInfo.ExternalCategoryId));

            // get all possible subcategories under each of the results of the last category query
            var existingSubcategories = categoryPages.SelectMany(sc =>
                sc.ChildrenOfType(SubCategoryPage.ModelTypeAlias) ?? Array.Empty<IPublishedContent>());

            // query for the subcategory page the has the Id of the subcategory request
            var existingSubCategoryPageQuery = existingSubcategories
                .Where(sc => sc.Value<Guid>(GlobalAliases.ExternalId).Equals(subCategoryInfo.Id));
            var existingPage = existingSubCategoryPageQuery.FirstOrDefault();

            var subCategoryPage = existingPage != null ?
                contentService.GetById(existingPage.Id) :
                contentService.Create(subCategoryInfo.Name, parentCategory.Id, SubCategoryPage.ModelTypeAlias);

            SetSubCategoryProperties(subCategoryPage, subCategoryInfo);

            contentService.SaveAndPublish(subCategoryPage);
            scope.Complete();
            return subCategoryPage;

        }
        catch (Exception e)
        {
            logger.LogError(e, "Error creating or updating category");
            throw;
        }
    }
    public IPublishedContent? GetCategoriesPage()
    {
        using var umbracoContextReference = umbracoContextFactory.EnsureUmbracoContext();
        var contentCache = umbracoContextReference.UmbracoContext.Content;

        var categories = contentCache.GetAtRoot().FirstOrDefault(
            x => x.ContentType.Alias == CategoriesPage.ModelTypeAlias);

        return categories;
    }

    public IEnumerable<IPublishedContent> GetCategoryPages()
    {
        using var scope = coreScopeProvider.CreateCoreScope(autoComplete: true);
        scope.Notifications.Suppress();

        using var umbracoContextReference = umbracoContextFactory.EnsureUmbracoContext();
        var contentCache = umbracoContextReference.UmbracoContext.Content;

        var contentType = contentCache.GetContentType(CategoryPage.ModelTypeAlias);
        if (contentType == null) return Array.Empty<IPublishedContent>();
        var categories = contentCache.GetByContentType(contentType);
        return categories;
    }

    public IEnumerable<IPublishedContent> GetSubCategoryPages()
    {
        using var umbracoContextReference = umbracoContextFactory.EnsureUmbracoContext();
        var contentCache = umbracoContextReference.UmbracoContext.Content;

        var contentType = contentCache.GetContentType(SubCategoryPage.ModelTypeAlias);
        if (contentType == null) return Array.Empty<IPublishedContent>();
        var categories = contentCache.GetByContentType(contentType);
        return categories;
    }
    private void SetCategoryProperties(IContent content, ProductCategoryDto categoryInfo)
    {
        content.SetValue(GlobalAliases.ExternalId, categoryInfo.ExternalId);
        content.SetValue("description", categoryInfo.Description);
    }

    private void SetSubCategoryProperties(IContent content, ProductSubCategoryDto subCategoryInfo)
    {
        content.SetValue(GlobalAliases.ExternalId, subCategoryInfo.Id);
        content.SetValue("externalCategoryId", subCategoryInfo.ExternalCategoryId);
        content.SetValue("description", subCategoryInfo.Description);
    }
}