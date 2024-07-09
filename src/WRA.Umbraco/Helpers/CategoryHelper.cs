using Umbraco.Cms.Core.Cache;
using Umbraco.Cms.Core.Models;
using WRA.Umbraco.Contracts.Product;
using WRA.Umbraco.Dtos;
using WRA.Umbraco.Helpers.Constants;
using WRA.Umbraco.Services.Caching;
using WRA.Umbraco.Web.Dtos.External;

namespace WRA.Umbraco.Helpers;

public class CategoryHelper(
    ICacheKeyProvider cacheKeyProvider,
    AppCaches appCache)
    : ContentHelperBase<IContent, ProductCategoryEvent>(cacheKeyProvider, appCache)
{
    public void Update(IContent target, ProductCategoryEvent source)
    {
        DynamicUpdate(target, source);
        SetProperty(target, GlobalConstants.ExternalId, source.Id);
    }

    public void SetInitialProperties(IContent content, ExternalProductCategoryDto categoryInfo)
    {
        content.SetValue(GlobalConstants.ExternalId, categoryInfo.Id);
        content.SetValue("description", categoryInfo.Description);
    }

    public void SetSubCategoryProperties(IContent content, ExternalProductSubCategoryDto subCategoryInfo)
    {
        content.SetValue(GlobalConstants.ExternalId, subCategoryInfo.Id);
        content.SetValue("externalCategoryId", subCategoryInfo.ExternalCategoryId);
        content.SetValue("description", subCategoryInfo.Description);
    }
}