using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Umbraco.Cms.Core.Mapping;
using Umbraco.Cms.Core.Models;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Core.PublishedCache;
using Umbraco.Cms.Core.Scoping;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Core.Web;
using WRA.Umbraco.Dtos;
using WRA.Umbraco.Extensions;
using WRA.Umbraco.Helpers;
using WRA.Umbraco.Models;

namespace WRA.Umbraco.Repositories;

public class CategoryRepository(
    ICoreScopeProvider coreScopeProvider,
    IUmbracoContextFactory umbracoContextFactory,
    IContentService contentService,
    ILogger<CategoryRepository> logger)
{
    public IContent CreateOrUpdateCategory(ProductCategoryDto categoryInfo)
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
                if (existingCategories?.Any() == true)
                {
                    var existingCategoryPage = existingCategories?
                        .FirstOrDefault(cat => cat.Value<Guid>(GlobalAliases.ExternalId).Equals(categoryInfo.ExternalId));
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
    public IContent CreateOrUpdateSubCategory(ProductSubCategoryDto subCategoryInfo)
    {
        try
        {
            using var scope = coreScopeProvider.CreateCoreScope();
            scope.Notifications.Suppress();

            using var umbracoContextReference = umbracoContextFactory.EnsureUmbracoContext();
            var contentCache = umbracoContextReference.UmbracoContext.Content;

            var contentType = contentCache.GetContentType(SubCategoryPage.ModelTypeAlias);
            var existingCategories = contentCache.GetByContentType(contentType);
            var existingSubCategoryPage = existingCategories?
                .First(cat => cat.Value<Guid>(GlobalAliases.ExternalId).Equals(subCategoryInfo.ExternalId));
            if (existingSubCategoryPage != null)
            {
                var existingSubCategoryPageContent = contentService.GetById(existingSubCategoryPage.Id);
                SetSubCategoryProperties(existingSubCategoryPageContent, subCategoryInfo);
                // var categoryEvent = mapper.Map<ProductCategoryEvent>(categoryInfo);
                // categoryHelper.Update(existingCategoryPageContent, categoryEvent);
                contentService.SaveAndPublish(existingSubCategoryPageContent);
                scope.Complete();
                return existingSubCategoryPageContent;
            }
            var subcategoryParent = GetCategoryPages().First(x =>
                x.Value<Guid>(GlobalAliases.ExternalId).SafeGuid().Equals(subCategoryInfo.ExternalCategoryId));

            var category = contentService.Create(subCategoryInfo.Name, subcategoryParent.Id, CategoryPage.ModelTypeAlias);
            SetSubCategoryProperties(category, subCategoryInfo);
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
        content.SetValue(GlobalAliases.ExternalId, subCategoryInfo.ExternalId);
        content.SetValue("externalCategoryId", subCategoryInfo.ExternalCategoryId);
        content.SetValue("description", subCategoryInfo.Description);
    }
}