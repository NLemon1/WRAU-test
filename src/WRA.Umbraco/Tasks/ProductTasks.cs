using System.Text.Json;
using Hangfire;
using Microsoft.Extensions.Logging;
using Umbraco.Cms.Core.Cache;
using Umbraco.Cms.Core.Mapping;
using Umbraco.Cms.Core.Scoping;
using WRA.Umbraco.Contracts;
using WRA.Umbraco.Dtos;
using WRA.Umbraco.Helpers.Constants;
using WRA.Umbraco.Repositories;
using WRA.Umbraco.Web.Dtos.External;
using WRA.Umbraco.Web.Dtos.WraExternal;
using WRA.Umbraco.Web.Services;

namespace WRA.Umbraco.BackgroundJobs;

public class ProductTasks(
    WraExternalApiService externalApiService,
    CategoryRepository categoryRepository,
    ProductPageRepository productPageRepository,
    WraProductManagementService wraProductManagementService,
    TaxonomyRepository taxonomyRepository,
    AppCaches appCaches,
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

            var categoriesResponse = JsonSerializer.Deserialize<IEnumerable<ExternalProductCategoryDto>>(categoryContent, SerializationOptions);
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

            var subCategoriesResponse = JsonSerializer.Deserialize<IEnumerable<ExternalProductSubCategoryDto>>(subCategoryContent, SerializationOptions);
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
            var productTypesResponse = JsonSerializer.Deserialize<IEnumerable<ExternalProductCollectionDto>>(productTypeContent, SerializationOptions);
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

        // Suppress notifications in major sync processes only. This will help prevent concurrent lock errors that can occur
        // when a long-running process fires off faster than a notification handler can complete.
        // for example, a lock can occur when a product is updated and index build is kicked off. doing these hundreds
        // at a time causes a lock. After this process finishes, a manual rebuild of the content cache, and indexes will
        // be necessary. This is a temporary fix until we can figure out a better way to handle this.
        scope.Notifications.Suppress();

        var productsResp = await externalApiService.GetProducts();
        string? content = productsResp.Content;

        if (content == null) return false;
        var externalProducts = JsonSerializer.Deserialize<List<ExternalProductDto>>(content, SerializationOptions);

        foreach (var p in externalProducts)
        {
            var productEvent = mapper.Map<ProductEvent>(p);
            if (productEvent == null)
            {
                logger.LogInformation("No event data for product {Sku}", p.Sku);
                continue;
            }

            var result = await wraProductManagementService.CreateOrUpdate(productEvent);
            if (result == null)
            {
                logger.LogError("could not sync product {Sku} - {Type} - {Name}", p.Sku, p.ProductType, p.Name);
            }
            else
            {
                logger.LogInformation("Product {Sku} - {Name} synced", result.GetValue(GlobalAliases.Sku), result.Name);
            }
        }

        appCaches.RuntimeCache.Clear();
        scope.Complete();
        return true;
    }

    public async Task<bool> SyncAllTaxonomy()
    {
        var taxonomyResp = await externalApiService.GetProductTaxonomy();
        string? content = taxonomyResp.Content;
        if (content == null) return false;
        var externalTaxonomy = JsonSerializer.Deserialize<List<ExternalTaxonomyDto>>(content, SerializationOptions);
        foreach (var taxonomy in externalTaxonomy)
        {
            await taxonomyRepository.CreateOrUpdateTaxonomy(taxonomy);
        }

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