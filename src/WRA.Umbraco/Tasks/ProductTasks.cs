using System.Text.Json;
using Hangfire;
using Microsoft.Extensions.Logging;
using Umbraco.Cms.Core.Mapping;
using Umbraco.Cms.Core.Scoping;
using WRA.Umbraco.Contracts;
using WRA.Umbraco.Dtos;
using WRA.Umbraco.Repositories;
using WRA.Umbraco.Web.Dtos.WraExternal;
using WRA.Umbraco.Web.Services;

namespace WRA.Umbraco.BackgroundJobs;

public class ProductTasks(
    WraExternalApiService externalApiService,
    CategoryRepository categoryRepository,
    ProductPageRepository productPageRepository,
    WraProductManagementService wraProductManagementService,
    ICoreScopeProvider scopeProvider,
    IUmbracoMapper mapper,
    ILogger<ProductTasks> logger)
{
    private static readonly JsonSerializerOptions SerializationOptions = new()
    {
        PropertyNameCaseInsensitive = true
    };

    public async Task<bool> SyncCategories()
    {
        try
        {
            var categoriesResp = await externalApiService.GetProductCategories();
            string? categoryContent = categoriesResp.Content;

            var categoriesResponse = JsonSerializer.Deserialize<IEnumerable<ProductCategoryDto>>(categoryContent, SerializationOptions);
            foreach (var categoryResponse in categoriesResponse)
            {
                await categoryRepository.CreateOrUpdate(categoryResponse);
            }

            return true; // success
        }
        catch (Exception e)
        {
            logger.LogError(e, "Task error syncing product categories");
            throw;
        }
    }

    public async Task<bool> SyncSubcategories()
    {
        try
        {
            var subCategoriesResp = await externalApiService.GetProductSubCategories();
            string? subCategoryContent = subCategoriesResp.Content;

            var subCategoriesResponse = JsonSerializer.Deserialize<IEnumerable<ProductSubCategoryDto>>(subCategoryContent, SerializationOptions);
            foreach (var subCategoryResponse in subCategoriesResponse)
            {
                await categoryRepository.CreateOrUpdateSubCategory(subCategoryResponse);
            }

            return true; // success
        }
        catch (Exception e)
        {
            logger.LogError(e, "Task error syncing product subcategories");
            throw;
        }
    }

    public async Task<bool> SyncProductCollections()
    {
        try
        {
            var productTypes = await externalApiService.GetProductTypes();
            var productTypeContent = productTypes.Content;
            var productTypesResponse = JsonSerializer.Deserialize<IEnumerable<ProductCollectionDto>>(productTypeContent, SerializationOptions);
            foreach (var productType in productTypesResponse)
            {
                await productPageRepository.CreateProductCollectionPage(productType);
            }

            return true; // success
        }
        catch (Exception e)
        {
            logger.LogError(e, "Task error syncing product collections");
            throw;
        }
    }

    public async Task<bool> SyncProductInfrastructure()
    {
        using var scope = scopeProvider.CreateCoreScope();
        bool result = await SyncCategories();
        if (!result) return false;

        bool subCategoriesResult = await SyncSubcategories();
        if (!subCategoriesResult) return false;

        bool productCollectionsResult = await SyncProductCollections();
        if (!productCollectionsResult) return false;

        scope.Complete();
        return true;
    }

    public async Task<bool> QueueProductSync()
    {
        BackgroundJob.Enqueue(() => SyncAllProducts());
        return true;
    }
    public async Task<bool> SyncAllProducts()
    {
        using var scope = scopeProvider.CreateCoreScope();

        var productsResp = await externalApiService.GetProducts();
        string? content = productsResp.Content;

        if (content == null) return false;
        var externalProducts = JsonSerializer.Deserialize<List<WraProductDto>>(content, SerializationOptions);

        foreach (var p in externalProducts)
        {
            if (p.ProductType == "Discount" )
            {
                logger.LogInformation("Skipping product {Sku} because it is a discount", p.Sku);
                continue;
            }

            var productEvent = mapper.Map<ProductEvent>(p);
            if (productEvent == null)
            {
                logger.LogInformation("No event data for product {Sku}", p.Sku);
                continue;
            };
           // BackgroundJob.Enqueue(() => wraProductManagementService.CreateOrUpdate(productEvent));
            await wraProductManagementService.CreateOrUpdate(productEvent);
        }

        scope.Complete();
        return true;
    }

    public async Task<bool> SyncProductCategoriesAndSubCategories()
    {
        bool categoriesResult = await SyncCategories();
        if (!categoriesResult) return false;
        bool subCategoriesResult = await SyncSubcategories();
        return subCategoriesResult;
    }
}