using System.Text.Json;
using Microsoft.Extensions.Logging;
using Umbraco.Cms.Core;
using Umbraco.Cms.Core.Models;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Core.PublishedCache;
using Umbraco.Cms.Core.Scoping;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Core.Web;
using Umbraco.Commerce.Core.Models;
using Umbraco.Commerce.Core.Services;
using WRA.Umbraco.Models;

namespace WRA.Umbraco.Services;
public class WRAProductManagementService : IProductManagementService
{

    readonly ILogger<WRAProductManagementService> _logger;
    readonly IContentService _contentService;
    readonly ICurrencyService _currencyService;
    readonly ICoreScopeProvider _coreScopeProvider;
    private readonly IUmbracoContextFactory _umbracoContextFactory;


    public WRAProductManagementService(

        ICurrencyService currencyService,
        IContentService contentService,
        ILogger<WRAProductManagementService> logger,
        ICoreScopeProvider coreScopeProvider,
        IUmbracoContextFactory umbracoContextFactory

    )

    {
        _logger = logger;
        _currencyService = currencyService;
        _contentService = contentService;
        _coreScopeProvider = coreScopeProvider;
        _umbracoContextFactory = umbracoContextFactory;
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
            // get context
            var contentCache = GetContentCache();
            var siteRoot = contentCache?.GetAtRoot().FirstOrDefault();
            var Home = siteRoot?.Children<Home>()?.FirstOrDefault();

            // crate a scope
            using ICoreScope scope = _coreScopeProvider.CreateCoreScope(autoComplete: true);
            // supress any notification to prevent our listener from firing an "updated product" webhook back at the queue
            using var _ = scope.Notifications.Suppress();

            // now we need the product's parent node to place these products under...
            var collectionPages = siteRoot.Children
                .Where(c => c.ContentType.Alias == ProductsPage.ModelTypeAlias)
                .FirstOrDefault()?.Children
                .Where(c => c.ContentType.Alias == CollectionPage.ModelTypeAlias);


            var collectionPage = collectionPages.FirstOrDefault(c => c.Name.Equals(product.ProductType));
            // collection page doesn't exist and needs to be created
            // maybe exception instead?
            if (collectionPage == null) { _logger.LogError($"No collection match for {product.ProductType}"); return; }

            // while we have the relvent info, lets grab the store ID for when we need it for currency stuff...
            var store = siteRoot.GetStore();

            // We have our colleciton page, so now lets see if it contains a record that already exists...
            // if it returns nothing (no page exists matching the ID from WRA), we create one.
            // var productPagetest = GetExistingProductPage(product.Sku);
            var productPage = GetExistingProductPage(collectionPage, product.Sku);
            if (productPage == null)
            {
                productPage = _contentService.Create(product.Name, collectionPage.Id, ProductPage.ModelTypeAlias);
            }

            //set properties on our product
            await SetProductProperties(productPage, product, store);

            // save and publish the product! Wow! 
            _contentService.SaveAndPublish(productPage);
        }
        catch (System.Exception ex)
        {
            _logger.LogError(ex, $"Error creating product: sku - {product.Sku}");
            throw ex;
        }
    }

    public async Task UpdateProduct(WraProductDto product)
    {
        var contentCache = GetContentCache();
        var contentRoot = contentCache?.GetAtRoot().FirstOrDefault();

        // crate a scope
        using ICoreScope scope = _coreScopeProvider.CreateCoreScope(autoComplete: true);
        // supress any notification to prevent our listener from firing an "updated product" webhook back at the queue

        using var _ = scope.Notifications.Suppress();

        // search for product
        var productPage = contentRoot.Children
            .Where(c => c.ContentType.Alias == ProductPage.ModelTypeAlias)
            .FirstOrDefault(c => c.Value<string>("sku") == product.Sku);

        var store = productPage?.GetStore();

        var contentNode = productPage as IContent;

        //set properties on our product
        SetProductProperties(contentNode, product, store);

    }

    public async Task<WraProductDto> GetProduct(string sku)
    {
        try
        {

            var contentCache = GetContentCache();
            var contentRoot = contentCache?.GetAtRoot().FirstOrDefault();

            using var umbracoContextReference = _umbracoContextFactory.EnsureUmbracoContext();
            var contentQuery = umbracoContextReference.UmbracoContext.Content;
            var siteRoot = contentQuery?.GetAtRoot().FirstOrDefault();

            // search products
            var product = contentRoot.Children
                .Where(c => c.ContentType.Alias == ProductPage.ModelTypeAlias)
                .FirstOrDefault(c => c.Value<string>("sku") == sku);

            if (product == null) { return null; }

            // cast as our strongly type product page
            var pdp = new ProductPage(product, new NoopPublishedValueFallback());
            // get product type, which is always the parent to a product page
            var categoryPage = new CategoryPage(product.Parent, new NoopPublishedValueFallback());
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
        catch (System.Exception ex)
        {
            _logger.LogError(ex, $"Error getting product: sku - {sku}");
            throw ex;
        }
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
        var contentCache = GetContentCache();
        var siteRoot = contentCache?.GetAtRoot().FirstOrDefault();

        // get category.
        var category = siteRoot.Children
                .Where(c => c.ContentType.Alias == CategoryPage.ModelTypeAlias)
                .FirstOrDefault(cat => cat.Name.Equals(categoryName, StringComparison.OrdinalIgnoreCase));

        // Get Subcategory. Make sure the parent (which should be a category) matches the 
        // category we just got back form the previous query.
        var idAlias = "externalId";
        var subCategories = siteRoot.Children
            .Where(c => c.ContentType.Alias == CategoryPage.ModelTypeAlias);

        var subCategory = subCategories.Where(sc =>
                sc.Parent.Value(idAlias) == category.Value(idAlias) &&
                sc.Name.Equals(subCategoryName, StringComparison.OrdinalIgnoreCase))
            .FirstOrDefault();

        // return both.
        return (category, subCategory);
    }

    private IContent? GetExistingProductPage(IPublishedContent collection, string sku)
    {
        var collectionProduct = collection.Children
            .Where(c => c.ContentType.Alias == ProductPage.ModelTypeAlias)
            .FirstOrDefault(c => c.Value<string>("sku") == sku);
        var matchingProduct = collectionProduct as IContent;
        if (matchingProduct == null)
        {
            return null;
        }
        return _contentService.GetById(matchingProduct.Id);
    }

    private IPublishedContentCache GetContentCache()
    {
        using var umbracoContextReference = _umbracoContextFactory.EnsureUmbracoContext();
        var contentQuery = umbracoContextReference.UmbracoContext.Content;
        return contentQuery;
    }

}