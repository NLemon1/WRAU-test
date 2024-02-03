
using System.Web.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Umbraco.Cms.Api.Common.Attributes;
using Umbraco.Cms.Core;
using Umbraco.Cms.Core.Models;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Core.Services;

using Umbraco.Commerce.Core.Models;
using Umbraco.Commerce.Core.Services;

using WRA.Umbraco.Dtos;
using WRA.Umbraco.Models;
using WRA.Umbraco.Services;

namespace WRA.Umbraco.Controllers;

[ApiController]
[MapToApi("product-api")]
public class ProductSyncController : ApiController
{
    private readonly SearchService _searchService;
    private readonly WRAExternalApiService _wraExternalApiService;
    private readonly IProductService _productService;
    private readonly IContentService _contentService;
    private readonly ICurrencyService _currencyService;
    public ProductSyncController(
        SearchService searchService,
        WRAExternalApiService wRAExternalApiService,
        IProductService productService,
        IContentService contentService,
        ICurrencyService currencyService)
    {
        _searchService = searchService;
        _wraExternalApiService = wRAExternalApiService;
        _productService = productService;
        _contentService = contentService;
        _currencyService = currencyService;

    }


    [HttpPost]
    [Route("SyncProductCategories")]
    public async Task SyncProductCategories()
    {
        var categoriesResp = await _wraExternalApiService.GetProductCategories();
        var content = categoriesResp.Content;
        // we have the content
        // lets create a category in umbraco with it...

        //first lets deserialize:
        var categories = JsonConvert.DeserializeObject<List<WraExternalProductCategoryDto>>(content);

        //once we have our categories deserialized, lets make some umbraco content items...
        var categoriesPageQuery = _searchService.Search(CategoriesPage.ModelTypeAlias);
        if (categoriesPageQuery == null || !categoriesPageQuery.Any()) { return; }
        var categoriesPage = categoriesPageQuery
            .Select(result => new CategoriesPage(result.Content, new NoopPublishedValueFallback()))
            .FirstOrDefault();


        categories.ForEach(cat =>
        {
            // check if it extists first
            var existingCategoryPages = _searchService.Search(CategoryPage.ModelTypeAlias)
                .Where(excat => excat.Content.Value<string>("externalId") == cat.ExternalId);
            if (existingCategoryPages != null && existingCategoryPages.Any())
            {
                // if it does, get the ID, query the content directly, and set the fields again.
                var categoryPageSearchResult = existingCategoryPages.FirstOrDefault();
                var existingCategoryPage = _contentService.GetById(categoryPageSearchResult.Content.Id);
                SetCategoryProperties(existingCategoryPage, cat);
                _contentService.SaveAndPublish(existingCategoryPage);
            }
            else
            {
                var newCategory = _contentService.Create(cat.Name, categoriesPage.Id, CategoryPage.ModelTypeAlias);
                SetCategoryProperties(newCategory, cat);
                _contentService.SaveAndPublish(newCategory);
            }
            // _contentService.CreateContent(cat.Name, Udi.Create("", key), CategoryPage.ModelTypeAlias);


        });
    }

    private void SetCategoryProperties(IContent content, WraExternalProductCategoryDto categoryInfo)
    {
        content.SetValue("externalId", categoryInfo.ExternalId);
        content.SetValue("description", categoryInfo.Description);
    }

    [HttpPost]
    [Route("SyncAllProducts")]
    public async Task SyncAllProducts()
    {
        // Get all products from WRA's ERP
        var productsResp = await _wraExternalApiService.GetProducts();
        var content = productsResp.Content;

        //first lets deserialize:
        //lets just grab the first 50 for testing
        var externalProducts = JsonConvert.DeserializeObject<List<WraExternalProducctDto>>(content).Take(50);

        // now we need the "products" parent node to place these products under...
        var productCollectionPageQuery = _searchService.Search(CollectionPage.ModelTypeAlias);
        var productCollections = productCollectionPageQuery
           .Select(result => new CollectionPage(result.Content, new NoopPublishedValueFallback()));

        // now that we have the products, lets translate it to a product page content type...
        foreach (WraExternalProducctDto ep in externalProducts)
        {
            var productType = ep.ProductType;

            // get collection that matches product Type
            var collectionPage = productCollections.Where(c => c.Name == productType)
               .FirstOrDefault();
            if (collectionPage == null) { continue; }

            // while we have the relvent info, lets grab the store ID for when we need it for currency stuff...
            var store = collectionPage.GetStore();

            // We have our colleciton page, so now lets see if it contains a record that already exists...
            // if it returns nothing (no page exists matching the ID from WRA), we create one.
            var productPage = GetExistingProductPage(ep.Sku) ??
                            _contentService.Create(ep.Name, collectionPage.Id, ProductPage.ModelTypeAlias);

            //set properties on our product
            SetProductProperties(productPage, ep, store);

            // save and publish the product! Wow! 
            _contentService.SaveAndPublish(productPage);
        }

    }

    // private IContent CreateNewProductPage(WraExternalProducctDto ep, int collectionId)
    // {
    //     // switch case to build content based on the product type
    //     var product = ep.ProductType switch
    //     {
    //         "Events" => _contentService.Create(ep.Name, collectionId, ProductPage.ModelTypeAlias),
    //         "Education" => _contentService.Create(ep.Name, collectionId, ProductPage.ModelTypeAlias),
    //         "Products" => _contentService.Create(ep.Name, collectionId, ProductPage.ModelTypeAlias),
    //         _ => null
    //     };

    //     return product;
    // }

    private IContent? GetExistingProductPage(string sku)
    {
        // there should never be more than one record with the same external ID, so grab the first one.
        // TODO: if multiple return, run delete process?
        var existingProduct = _searchService.SearchProductBySku(sku)?.FirstOrDefault();
        if (existingProduct != null)
        {
            return _contentService.GetById(existingProduct.Content.Id);
        }
        return null;
    }

    private void SetProductProperties(IContent content, WraExternalProducctDto productDto, StoreReadOnly? store)
    {

        var (categories, subCategories) = GetCategories(productDto.Category, productDto.SubCategory);
        if (categories != null)
        {
            var categoryPageUdi = Udi.Create(Constants.UdiEntityType.Document, categories.Key);
            List<string> categoryUdis = new() { categoryPageUdi.ToString() };
            content.SetValue("categories", string.Join(",", categoryUdis));
        }
        if (subCategories != null)
        {
            var subCategoryPageUdi = Udi.Create(Constants.UdiEntityType.Document, subCategories.Key);
            List<string> subCategoryIds = new() { subCategoryPageUdi.ToString() };
            content.SetValue("subCategories", string.Join(",", subCategoryIds));
        }
        // pricing is a bit more involved. First, lets get the currencies from our store...
        // for now we will just support USD
        CurrencyReadOnly currency = _currencyService.GetCurrencies(store.Id).Where(c => c.Name == "USD").First();
        // decimal price = Convert.ToDecimal(productDto.Price);
        var curencyUpdateRequest = JsonConvert.SerializeObject(new Dictionary<string, string> {
            { currency.Id.ToString(), productDto.Price }
        });

        content.SetValue("productId", productDto.ExternalId);
        content.SetValue("sku", productDto.Sku);
        content.SetValue("taxonomy", productDto.Taxonomy);
        content.SetValue("price", curencyUpdateRequest);
        content.SetValue("startDate", DateTime.Parse(productDto.StartDate));
        content.SetValue("endDate", DateTime.Parse(productDto.EndDate));
    }

    private (IPublishedContent?, IPublishedContent?) GetCategories(
        string categoryName,
        string subCategoryName
        )
    {
        var idAlias = "externalId";
        var ignoreCase = StringComparison.OrdinalIgnoreCase;

        var category = _searchService.Search(CategoryPage.ModelTypeAlias)
            .Where(cat => cat.Content.Name.Equals(categoryName, ignoreCase))
            .FirstOrDefault()?
            .Content;

        var subCategory = _searchService.Search(SubCategoryPage.ModelTypeAlias)
            .Where(sc =>
                sc.Content.Parent.Value(idAlias) == category.Value(idAlias) &&
                sc.Content.Name.Equals(subCategoryName, ignoreCase))
            .FirstOrDefault()?
            .Content;

        return (category, subCategory);
    }




}