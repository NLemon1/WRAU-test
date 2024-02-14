
using System.Web.Http;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
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
[Route("WraMemberApi")]

public class ProductSyncController : ApiController
{
    private readonly SearchService _searchService;
    private readonly WRAExternalApiService _wraExternalApiService;
    private readonly IProductService _productService;
    private readonly IContentService _contentService;
    private readonly ICurrencyService _currencyService;
    private WRAProductService _wraProductService;
    public ProductSyncController(
        SearchService searchService,
        WRAExternalApiService wRAExternalApiService,
        IProductService productService,
        IContentService contentService,
        ICurrencyService currencyService,
        WRAProductService wRAProductService)
    {
        _searchService = searchService;
        _wraExternalApiService = wRAExternalApiService;
        _productService = productService;
        _contentService = contentService;
        _currencyService = currencyService;
        _wraProductService = wRAProductService;
    }


    [HttpPost]
    [Route("SyncProductCategories")]
    public async Task SyncProductCategories()
    {
        var categoriesResp = await _wraExternalApiService.GetProductCategories();
        var subcategories = await _wraExternalApiService.GetProductSubCategories();

        var categoryContent = categoriesResp.Content;
        var subCategoryContent = subcategories.Content;
        // we have the content
        // lets create a category in umbraco with it...

        //first lets deserialize:
        var categories = JsonSerializer.Deserialize<IEnumerable<WraExternalProductCategoryDto>>(categoryContent);
        var subCategories = JsonSerializer.Deserialize<IEnumerable<WraExternalProductSubCategoryDto>>(subCategoryContent);


        //once we have our categories deserialized, lets make some umbraco content items...
        // First we get the "categories" page that houes all of the categories and subcategories.
        var categoriesPageQuery = _searchService.Search(CategoriesPage.ModelTypeAlias);
        if (categoriesPageQuery == null || !categoriesPageQuery.Any()) { return; }
        var categoriesPage = categoriesPageQuery
            .Select(result => new CategoriesPage(result.Content, new NoopPublishedValueFallback()))
            .FirstOrDefault();


        foreach (var cat in categories)
        {
            // check if it extists first
            var existingCategoryPages = _searchService.Search(CategoryPage.ModelTypeAlias)
                .Where(excat => excat.Content.Value<Guid>("externalId").Equals(cat.ExternalId));

            // category added, now lets check to see if it needs any subcategories
            var releventSubcategories = subCategories.Where(sub => sub.ExternalCategoryId.Equals(cat.ExternalId));

            if (existingCategoryPages != null && existingCategoryPages.Any())
            {
                // if it does, get the ID, query the content directly, and set the fields again.
                var categoryPageSearchResult = existingCategoryPages.FirstOrDefault();
                var existingCategoryPage = _contentService.GetById(categoryPageSearchResult.Content.Id);
                SetCategoryProperties(existingCategoryPage, cat);
                _contentService.SaveAndPublish(existingCategoryPage);

                // now set subcategories
                SetSubCategoryPages(releventSubcategories, existingCategoryPage);
            }
            else
            {
                var newCategoryPage = _contentService.Create(cat.Name, categoriesPage.Id, CategoryPage.ModelTypeAlias);
                SetCategoryProperties(newCategoryPage, cat);
                _contentService.SaveAndPublish(newCategoryPage);

                // now set subcategories
                SetSubCategoryPages(releventSubcategories, newCategoryPage);

            }
            // _contentService.CreateContent(cat.Name, Udi.Create("", key), CategoryPage.ModelTypeAlias);

        };
    }

    private void SetSubCategoryPages(IEnumerable<WraExternalProductSubCategoryDto> subCategories, IContent parentCategory)
    {
        // we have our matching sub categories
        foreach (var subcat in subCategories)
        {
            var existingSubCategoryPages = _searchService.Search(CategoryPage.ModelTypeAlias)
                .Where(x => x.Content.Value<Guid>("externalId").Equals(subcat.ExternalId));

            // check if any existing subcategory pages exist under the requested Id
            bool anyExist = existingSubCategoryPages?.Any() ?? false;
            if (anyExist)
            {
                // query mathcing page, should only be a 1:1 on external ID and page
                var matchingSubcategoryPage = existingSubCategoryPages.FirstOrDefault();
                var existingCategoryPage = _contentService.GetById(matchingSubcategoryPage.Content.Id);

                SetSubCategoryProperties(existingCategoryPage, subcat);
                _contentService.SaveAndPublish(existingCategoryPage);
            }
            else
            {
                // create new
                var newSubcategory = _contentService.Create(subcat.Name, parentCategory.Id, SubCategoryPage.ModelTypeAlias);
                SetSubCategoryProperties(newSubcategory, subcat);
                _contentService.SaveAndPublish(newSubcategory);
            }
        }
    }

    private void SetCategoryProperties(IContent content, WraExternalProductCategoryDto categoryInfo)
    {
        content.SetValue("externalId", categoryInfo.ExternalId);
        content.SetValue("description", categoryInfo.Description);
    }
    private void SetSubCategoryProperties(IContent content, WraExternalProductSubCategoryDto subCategoryInfo)
    {
        content.SetValue("externalId", subCategoryInfo.ExternalId);
        content.SetValue("externalCategoryId", subCategoryInfo.ExternalCategoryId);
        content.SetValue("description", subCategoryInfo.Description);
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
        var externalProducts = JsonSerializer.Deserialize<List<WraProductDto>>(content)?.Take(50);

        foreach (WraProductDto p in externalProducts)
        {
            await _wraProductService.CreatProduct(p);
        }

    }


    private void SetProductProperties(IContent content, WraProductDto productDto, StoreReadOnly? store)
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
        var curencyUpdateRequest = JsonSerializer.Serialize(new Dictionary<string, string> {
            { currency.Id.ToString(), productDto.Price.ToString() }
        });

        content.SetValue("productId", productDto.Id);
        content.SetValue("sku", productDto.Sku);
        content.SetValue("taxonomy", productDto.Taxonomy);
        content.SetValue("price", curencyUpdateRequest);
        content.SetValue("startDate", productDto.StartDate);
        content.SetValue("endDate", productDto.EndDate);
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