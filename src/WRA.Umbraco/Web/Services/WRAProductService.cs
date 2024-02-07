
using System.Drawing;
using System.Text.Json;
using Microsoft.Extensions.Logging;
using OfficeOpenXml.FormulaParsing.Excel.Functions.Information;
using Org.BouncyCastle.Asn1.Pkcs;
using Umbraco.Cms.Core;
using Umbraco.Cms.Core.Models;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Core.Services;
using Umbraco.Commerce.Core.Models;
using Umbraco.Commerce.Core.Services;
using WRA.Umbraco.Models;

namespace WRA.Umbraco.Services;
public class WRAProductService
{

    readonly SearchService _searchService;
    readonly ILogger<WRAProductService> _logger;
    readonly IContentService _contentService;
    private readonly ICurrencyService _currencyService;



    public WRAProductService(

        SearchService searchService,
        CurrencyService currencyService,
        IContentService contentService,
        ILogger<WRAProductService> logger
    )
    {
        _logger = logger;
        _currencyService = currencyService;
        _searchService = searchService;
        _contentService = contentService;
    }

    private CurrencyReadOnly GetCurrency(Guid storeId) => _currencyService.GetCurrencies(storeId).Where(c => c.Name == "USD").First();

    /// <summary>
    /// Create Product
    /// </summary>
    /// <param name="product">product dto</param>
    /// <returns></returns>
    public async Task CreatProduct(WraProductDto product)
    {
        // now we need the "products" parent node to place these products under...
        var productCollectionPageQuery = _searchService.Search(CollectionPage.ModelTypeAlias);
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
        var productPage = GetExistingProductPage(product.Sku) ??
                        _contentService.Create(product.Name, collectionPage.Id, ProductPage.ModelTypeAlias);

        //set properties on our product
        SetProductProperties(productPage, product, store);

        // save and publish the product! Wow! 
        _contentService.SaveAndPublish(productPage);
    }

    public async Task Update(WraProductDto product)
    {
        var productPage = _searchService.SearchProductBySku(product.Sku)?.FirstOrDefault();
        var store = productPage?.Content.GetStore();

        var contentNode = productPage!.Content as IContent;

        //set properties on our product
        SetProductProperties(contentNode, product, store);

    }

    public async Task<WraProductDto> GetWraProduct(string sku)
    {
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
        var basePrice = pdp.Price!.GetPriceFor(currency.Id).Value;
        var memberPrice = pdp.MemberPrice!.GetPriceFor(currency.Id).Value;
        // build response Dto
        return new WraProductDto()
        {
            Id = pdp.Id.ToString(),
            Name = pdp.Name,
            Description = pdp.LongDescription?.ToString() ?? string.Empty,
            Sku = pdp.Sku!,
            // ProductTypeId = getproductType ??
            ProductTypeId = categoryPage.ExternalId!,
            ProductType = categoryPage.Name,
            ProductCategoryId = category!.Value("externalId").SafeString(),
            // ProductSubcategoryId = subCategory!.Value("externalId").SafeString(),
            SubCategory = subCategory!.Name,
            Taxonomy = pdp.Taxonomy.SafeString(),
            MemberPrice = memberPrice,
            Price = basePrice,
            StartDate = pdp.StartDate,
            EndDate = pdp.EndDate,
        };
    }

    private void SetProductProperties(IContent content, WraProductDto productDto, StoreReadOnly? store)
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
        var existingProduct = _searchService.SearchProductBySku(sku)?.FirstOrDefault().Content as IContent;
        if (existingProduct != null)
        {
            return existingProduct;
        }
        return null;
    }
}