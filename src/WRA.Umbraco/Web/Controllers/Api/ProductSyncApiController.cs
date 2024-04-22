using System.Text.Json;
using System.Web.Http;
using Hangfire;
using Microsoft.AspNetCore.Http.Timeouts;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Umbraco.Cms.Api.Common.Attributes;
using Umbraco.Cms.Core.Mapping;
using WRA.Umbraco.Contracts;
using WRA.Umbraco.Contracts.Product;
using WRA.Umbraco.Dtos;
using WRA.Umbraco.Repositories;
using WRA.Umbraco.Web.Dtos.WraExternal;
using WRA.Umbraco.Web.Services;

namespace WRA.Umbraco.Web.Controllers.Api;

[ApiController]
[MapToApi("product-api")]
[Route("WraProductApi")]

public class ProductSyncApiController(
    WraExternalApiService wRAExternalApiService,
    WraProductManagementService wraProductManagementService,
    CategoryRepository categoryRepository,
    IUmbracoMapper mapper,

    ILogger<ProductSyncApiController> logger)
    : ApiController
{
    [HttpPost]
    [Route("SyncAllProductsBackgound")]
    public void productBackgroundSync()
    {
        BackgroundJob.Enqueue(() => SyncAllProducts());
    }


    [HttpPost]
    [Route("SyncCategoriesAndSubCategories")]
    public async Task<bool> SyncProductCategoriesAndSubCategories()
    {
        bool categoriesSuccess =  await SyncSubcategories();
        if (categoriesSuccess)
        {
            bool subCategoriesSuccess = await SyncSubcategories();
            return categoriesSuccess && subCategoriesSuccess;
        }

        return false;
    }
    [HttpPost]
    [Route("SyncProductCategories")]
    public async Task<bool> SyncCategories()
    {
        try
        {
            var categoriesResp = await wRAExternalApiService.GetProductCategories();

            var categoryContent = categoriesResp.Content;

            // first lets deserialize:
            var categoriesResponse = JsonSerializer.Deserialize<IEnumerable<ProductCategoryDto>>(categoryContent);

            foreach (var categoryResponse in categoriesResponse)
            {
                categoryRepository.CreateOrUpdateCategory(categoryResponse);
            }

            return true; // success
        }
        catch (Exception e)
        {
            logger.LogError(e, "Error syncing product categories");
            throw;
        }
    }
    [HttpPost]
    [Route("SyncSubCategories")]
    public async Task<bool> SyncSubcategories()
    {
        try
        {
            var subcategories = await wRAExternalApiService.GetProductSubCategories();
            var subCategoryContent = subcategories.Content;
            var subCategoriesResponse = JsonSerializer.Deserialize<IEnumerable<ProductSubCategoryDto>>(subCategoryContent);
            foreach (var subCategory in subCategoriesResponse)
            {
                categoryRepository.CreateOrUpdateSubCategory(subCategory);
            }
            return true;
        }
        catch (Exception e)
        {
            logger.LogError(e, "Error syncing product subcategories");
            throw;
        }
    }

    // private void SetSubCategoryPages(IEnumerable<WraExternalProductSubCategoryDto> subCategories, IContent parentCategory)
    // {
    //     // we have our matching sub categories
    //     foreach (var subcat in subCategories)
    //     {
    //         var existingSubCategoryPages = searchService.Search(SubCategoryPage.ModelTypeAlias)
    //             .Where(x => x.Content.Value<Guid>(GlobalAliases.ExternalId).Equals(subcat.ExternalId));
    //
    //         // check if any existing subcategory pages exist under the requested Id
    //         bool anyExist = existingSubCategoryPages?.Any() ?? false;
    //         if (anyExist)
    //         {
    //             // query mathcing page, should only be a 1:1 on external ID and page
    //             var matchingSubcategoryPage = existingSubCategoryPages.FirstOrDefault();
    //             var existingCategoryPage = contentService.GetById(matchingSubcategoryPage.Content.Id);
    //
    //             SetSubCategoryProperties(existingCategoryPage, subcat);
    //             contentService.SaveAndPublish(existingCategoryPage);
    //         }
    //         else
    //         {
    //             // create new
    //             var newSubcategory = contentService.Create(subcat.Name, parentCategory.Id, SubCategoryPage.ModelTypeAlias);
    //             SetSubCategoryProperties(newSubcategory, subcat);
    //             contentService.SaveAndPublish(newSubcategory);
    //         }
    //     }
    // }



    [HttpPost]
    [Route("SyncAllProducts")]
    [RequestTimeout(600000)]
    public async Task SyncAllProducts()
    {
        // first sync all categories and subcategories
        var syncCategoriesSuccess = await SyncCategories();
        if (!syncCategoriesSuccess)
        {
            throw new Exception("Failed to sync categories");
        }

        // Get all products from WRA's ERP
        var productsResp = await wRAExternalApiService.GetProducts();
        var content = productsResp.Content;

        // first lets deserialize:
        var externalProducts = JsonSerializer.Deserialize<List<WraProductDto>>(content);

        foreach (WraProductDto p in externalProducts)
        {
            var productEvent = mapper.Map<ProductEvent>(p);
            if (productEvent != null) await wraProductManagementService.CreateOrUpdate(productEvent);
        }
    }

    [HttpPost]
    [Route("SyncProduct")]
    public async Task SyncProduct(WraProductDto product)
    {
        var productEvent = mapper.Map<ProductEvent>(product);
        await wraProductManagementService.CreateOrUpdate(productEvent);
    }

    // private void SetProductProperties(IContent content, WraProductDto productDto, StoreReadOnly? store)
    // {
    //     var (categories, subCategories) = GetCategories(productDto.Category, productDto.SubCategory);
    //     if (categories != null)
    //     {
    //         var categoryPageUdi = Udi.Create(Constants.UdiEntityType.Document, categories.Key);
    //         List<string> categoryUdis = new() { categoryPageUdi.ToString() };
    //         content.SetValue("categories", string.Join(",", categoryUdis));
    //     }
    //
    //     if (subCategories != null)
    //     {
    //         var subCategoryPageUdi = Udi.Create(Constants.UdiEntityType.Document, subCategories.Key);
    //         List<string> subCategoryIds = new() { subCategoryPageUdi.ToString() };
    //         content.SetValue("subCategories", string.Join(",", subCategoryIds));
    //     }
    //
    //     // pricing is a bit more involved. First, lets get the currencies from our store...
    //     // for now we will just support USD
    //     var currency = currencyService.GetCurrencies(store.Id).First(c => c.Name == "USD");
    //
    //     string currencyUpdateRequest = JsonSerializer.Serialize(new Dictionary<string, string?>
    //     {
    //         { currency.Id.ToString(), productDto.Price.ToString() }
    //     });
    //
    //     content.SetValue("productId", productDto.Id);
    //     content.SetValue("sku", productDto.Sku);
    //     content.SetValue("taxonomy", productDto.Taxonomy);
    //     content.SetValue("price", currencyUpdateRequest);
    //     content.SetValue("startDate", productDto.StartDate);
    //     content.SetValue("endDate", productDto.EndDate);
    // }
    //
    // private (IPublishedContent?, IPublishedContent?) GetCategories(
    //     string categoryName,
    //     string subCategoryName)
    // {
    //     var idAlias = GlobalAliases.ExternalId;
    //     var ignoreCase = StringComparison.OrdinalIgnoreCase;
    //
    //     var category = searchService
    //         .Search(CategoryPage.ModelTypeAlias)
    //         .FirstOrDefault(cat => cat.Content.Name.Equals(categoryName, ignoreCase))?
    //         .Content;
    //
    //     var subCategory = searchService
    //         .Search(SubCategoryPage.ModelTypeAlias)
    //         .FirstOrDefault(sc => sc.Content.Parent.Value(idAlias) == category.Value(idAlias) &&
    //                               sc.Content.Name.Equals(subCategoryName, ignoreCase))?
    //         .Content;
    //
    //     return (category, subCategory);
    // }
}