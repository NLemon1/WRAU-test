using Umbraco.Cms.Core.Cache;
using Umbraco.Cms.Core.Models;
using WRA.Umbraco.Contracts.Product;
using WRA.Umbraco.Dtos;
using WRA.Umbraco.Services.Caching;

namespace WRA.Umbraco.Helpers;

// TODO make an event class for categories
public class CategoryHelper(
    ICacheKeyProvider cacheKeyProvider,
    AppCaches appCache)
    : ContentHelperBase<IContent, ProductCategoryEvent>(cacheKeyProvider, appCache)
{
    public void Update(IContent target, ProductCategoryEvent source)
    {
        DynamicUpdate(target, source);
        SetProperty(target, "ExternalId", source.Id);
    }
    public void SetInitialProperties(IContent content, ProductCategoryDto categoryInfo)
    {
        content.SetValue("externalId", categoryInfo.ExternalId);
        content.SetValue("description", categoryInfo.Description);
    }
    public void SetSubCategoryProperties(IContent content, ProductSubCategoryDto subCategoryInfo)
    {
        content.SetValue("externalId", subCategoryInfo.ExternalId);
        content.SetValue("externalCategoryId", subCategoryInfo.ExternalCategoryId);
        content.SetValue("description", subCategoryInfo.Description);
    }
}