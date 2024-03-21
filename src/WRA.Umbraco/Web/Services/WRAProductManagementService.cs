
using System.Drawing;
using System.Text.Json;
using Microsoft.Extensions.Logging;
using OfficeOpenXml.FormulaParsing.Excel.Functions.Information;
using Org.BouncyCastle.Asn1.Pkcs;
using Umbraco.Cms.Core;
using Umbraco.Cms.Core.Models;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Core.Scoping;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Infrastructure.Examine;
using Umbraco.Cms.Infrastructure.HostedServices;
using Umbraco.Commerce.Core.Models;
using Umbraco.Commerce.Core.Services;
using WRA.Umbraco.Models;

namespace WRA.Umbraco.Services;
public class WRAProductManagementService
{

    readonly SearchService _searchService;
    readonly ILogger<WRAProductManagementService> _logger;
    readonly IContentService _contentService;
    readonly ICurrencyService _currencyService;
    readonly ICoreScopeProvider _coreScopeProvider;


    public WRAProductManagementService(

        SearchService searchService,
        ICurrencyService currencyService,
        IContentService contentService,
        ILogger<WRAProductManagementService> logger,
        ICoreScopeProvider coreScopeProvider
    )

    {
        _logger = logger;
        _currencyService = currencyService;
        _searchService = searchService;
        _contentService = contentService;
        _coreScopeProvider = coreScopeProvider;
    }

    private CurrencyReadOnly GetCurrency(Guid storeId) => _currencyService.GetCurrencies(storeId).Where(c => c.Name == "USD").First();

    /// <summary>
    /// Create Product
    /// </summary>
    /// <param name="product">product dto</param>
    /// <returns></returns>
    public async Task CreateProduct(WraProductDto product)
    {
        try
        {
            // crate a scope
            using ICoreScope scope = _coreScopeProvider.CreateCoreScope(autoComplete: true);
            // supress any notification to prevent our listener from firing an "updated product" webhook back at the queue
            using var _ = scope.Notifications.Suppress();

            // now we need the "products" parent node to place these products under...
            var productCollectionPageQuery = _searchService.Search(CollectionPage.ModelTypeAlias);
            var matchingProduct = _searchService.Search(ProductPage.ModelTypeAlias);

            var productCollections = productCollectionPageQuery
               .Select(result => new CollectionPage(result.Content, new NoopPublishedValueFallback()));

            // now that we have the products, lets translate it to a product page content type...
            var productType = product.ProductType;

            // get collection that matches product Type
            var collectionPage = productCollections.Where(c => c.Name == productType)
               .FirstOrDefault();

            // collection page doesn't exist and needs to be created
            // maybe exception instead?
            if (collectionPage == null) { _logger.LogError($"No collection match for product{product.Id}"); return; }

            // while we have the relvent info, lets grab the store ID for when we need it for currency stuff...
            var store = collectionPage.GetStore();


            // We have our colleciton page, so now lets see if it contains a record that already exists...
            // if it returns nothing (no page exists matching the ID from WRA), we create one.
            // var productPagetest = GetExistingProductPage(product.Sku);
            var productPage = GetExistingProductPage(product.Sku);
            if (productPage == null)
            {
                productPage = _contentService.Create(product.Name, collectionPage.Id, ProductPage.ModelTypeAlias);
            }

            //set properties on our product
            await SetProductProperties(productPage, product, store);

            // save and publish the product! Wow! 
            _contentService.SaveAndPublish(productPage);
        }
        catch (System.Exception)
        {

            throw;
        }
    }

    public async Task Update(WraProductDto product)
    {
        // crate a scope
        using ICoreScope scope = _coreScopeProvider.CreateCoreScope(autoComplete: true);
        // supress any notification to prevent our listener from firing an "updated product" webhook back at the queue

        using var _ = scope.Notifications.Suppress();

        // search for product
        var productPage = _searchService.SearchProductBySku(product.Sku)?.FirstOrDefault();
        var store = productPage?.Content.GetStore();

        var contentNode = productPage!.Content as IContent;

        //set properties on our product
        SetProductProperties(contentNode, product, store);

    }

    public async Task<WraProductDto> GetWraProduct(string sku)
    {
        // search products
        var product = _searchService.SearchProductBySku(sku)?.FirstOrDefault();
        if (product == null) { return null; }

        // cast as our strongly type product page
        var pdp = new ProductPage(product.Content, new NoopPublishedValueFallback());
        // get product type, which is always the parent to a product page
        var categoryPage = new CategoryPage(pdp.Parent, new NoopPublishedValueFallback());
        // get cateogies and subcategories attached to a page
        var category = pdp.Categories?.FirstOrDefault();
        var subCategory = pdp.SubCategories?.FirstOrDefault();
        // grab currency
        var store = pdp.GetStore();
        var currency = GetCurrency(store.Id);
        var basePrice = pdp.Price?.GetPriceFor(currency.Id).Value;
        var memberPrice = pdp.MemberPrice?.GetPriceFor(currency.Id).Value;
        // build response Dto
        return new WraProductDto()
        {
            Id = pdp.Id.ToString(),
            Name = pdp.Name,
            Description = pdp?.LongDescription?.ToString() ?? string.Empty,
            Sku = pdp.Sku!,
            // ProductTypeId = getproductType ??
            ProductTypeId = categoryPage?.ExternalId!,
            ProductType = categoryPage?.Name ?? string.Empty,
            ProductCategoryId = category!.Value("externalId").SafeString(),
            // ProductSubcategoryId = subCategory!.Value("externalId").SafeString(),
            SubCategory = subCategory?.Name ?? string.Empty,
            Taxonomy = pdp.Taxonomy.SafeString(),
            MemberPrice = memberPrice,
            Price = basePrice,
            StartDate = pdp.StartDate,
            EndDate = pdp.EndDate,
        };
    }

    private async Task SetProductProperties(IContent content, WraProductDto productDto, StoreReadOnly? store)
    {

        var (categories, subCategories) = GetCategories(productDto.Category, productDto.SubCategory);
        // if category exists...
        if (categories != null)
        {
            // get category node Udi. This is fully qualified node reference. 
            var categoryPageUdi = Udi.Create(Constants.UdiEntityType.Document, categories.Key);
            List<string> categoryUdis = new() { categoryPageUdi.ToString() };
            // set category uid on content (product)
            content.SetValue("categories", string.Join(",", categoryUdis));
        }
        if (subCategories != null)
        {
            // same logic as categories above^
            var subCategoryPageUdi = Udi.Create(Constants.UdiEntityType.Document, subCategories.Key);
            List<string> subCategoryIds = new() { subCategoryPageUdi.ToString() };
            content.SetValue("subCategories", string.Join(",", subCategoryIds));
        }

        //First, lets get the currencies from our store...
        // for now we will just support USD
        CurrencyReadOnly currency = GetCurrency(store!.Id);
        // Curency must be set as a Json object. Serialize dictionary.
        var basePrice = JsonSerializer.Serialize(new Dictionary<string, string> {
            { currency.Id.ToString(), productDto.Price.ToString() }
        });
        var memberPrice = JsonSerializer.Serialize(new Dictionary<string, string> {
            { currency.Id.ToString(), productDto.MemberPrice.ToString() }
        });

        content.SetValue("price", basePrice);
        content.SetValue("memberPrice", memberPrice);
        content.SetValue("productId", productDto.Id);
        content.SetValue("sku", productDto.Sku);
        content.SetValue("taxonomy", productDto.Taxonomy);
        content.SetValue("startDate", productDto.StartDate);
        content.SetValue("endDate", productDto.EndDate);
        content.SetValue("longDescription", productDto.Description);
        content.SetValue("location", productDto.Location);
    }

    private (IPublishedContent?, IPublishedContent?) GetCategories(string categoryName, string subCategoryName)
    {
        var idAlias = "externalId";
        var ignoreCase = StringComparison.OrdinalIgnoreCase;
        // get category. 
        var category = _searchService.Search(CategoryPage.ModelTypeAlias)
            .Where(cat => cat.Content.Name.Equals(categoryName, ignoreCase))
            .FirstOrDefault()?
            .Content;

        // Get Subcategory. Make sure the parent (which should be a category) matches the 
        // category we just got back form the previous query.
        var subCategory = _searchService.Search(SubCategoryPage.ModelTypeAlias)
            .Where(sc =>
                sc.Content.Parent.Value(idAlias) == category.Value(idAlias) &&
                sc.Content.Name.Equals(subCategoryName, ignoreCase))
            .FirstOrDefault()?
            .Content;

        // return both.
        return (category, subCategory);
    }

    private IContent? GetExistingProductPage(string sku)
    {
        // there should never be more than one record with the same external ID, so grab the first one.
        // TODO: if multiple return, run delete process?
        // var matchingProduct = _searchService.Search(ProductPage.ModelTypeAlias)
        //     .Where(cat => cat.Content.Value<string>("sku").Equals(sku, StringComparison.OrdinalIgnoreCase))
        //     .FirstOrDefault()?
        //     .Content;

        var matchingProduct = _searchService.SearchProductBySku(sku)?.FirstOrDefault()?.Content;
        if (matchingProduct == null)
        {
            return null;
        }
        return _contentService.GetById(matchingProduct.Id);
    }

}