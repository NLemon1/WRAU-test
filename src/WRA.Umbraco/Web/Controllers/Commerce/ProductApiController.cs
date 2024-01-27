using Microsoft.AspNetCore.Mvc;
using System.Threading;
using System.Linq;
using Umbraco.Cms.Core;
using Umbraco.Cms.Web.Common.Controllers;
using Umbraco.Extensions;
using Umbraco.Commerce.Core.Services;
using WRA.Umbraco.Models;
using WRA.Umbraco.Dtos;
using Umbraco.Commerce.Extensions;
using WRA.Umbraco;
using Umbraco.Cms.Api.Common.Attributes;
using WRA.Umbraco.Services;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Commerce.Core.Api;
using Umbraco.Commerce.Core.Models;

namespace WRA.Umbraco.Controllers;

[ApiController]
[MapToApi("product-api")]
public class ProductApiController : UmbracoApiController
{
    private readonly IProductService _productService;
    private readonly IPublishedContentQuery _publishedContentQuery;
    private readonly SearchService _searchService;

    public ProductApiController(IProductService productService,
        IPublishedContentQuery publishedContentQuery,
        SearchService searchService)
    {
        _productService = productService;
        _publishedContentQuery = publishedContentQuery;
        _searchService = searchService;
    }

    [HttpPost]
    [Route("GetProducts")]
    public IEnumerable<ProductPageResponseDto> GetProducts([FromBody] ProductsRequestDto request)
    {
        string productType = request.ProductType;
        IEnumerable<ProductPage> products = _searchService.Search(ProductPage.ModelTypeAlias)
            .Select(p => new ProductPage(p.Content, new NoopPublishedValueFallback()))
            .Where(p => string.Equals(p.Parent.Name, productType, StringComparison.OrdinalIgnoreCase));

        // now lets apply category and sub-category filters if they are requested
        if (!string.IsNullOrEmpty(request.Category))
        {
            products = products
                .Where(p => p.Categories.ContainsProductCategory(request.Category));
        }
        if (!string.IsNullOrEmpty(request.SubCategory))
        {
            products = products
                .Where(p => p.SubCategories.ContainsProductCategory(request.Category));
        }

        var responseItems = products.Select(p => p.AsDto(productType));
        return responseItems;

    }


    [HttpPost]
    [Route("GetProductVariant")]
    public object GetProductVariant([FromBody] GetProductVariantDto model)
    {
        // Get the variants for the given node
        var productNode = _publishedContentQuery.Content(model.ProductNodeId) as MultiVariantProductPage;
        if (productNode == null)
            return null;

        // Get the store from the product node
        var store = productNode.GetStore();

        // Find the variant with the matching attributes
        var variant = productNode.Variants.FindByAttributes(model.Attributes);

        // If we have a variant, map it's data to our DTO
        if (variant != null)
        {
            // Convert variant into product snapshot
            var snapshot = _productService.GetProduct(store.Id, productNode.Key.ToString(), variant.Content.Key.ToString(), Thread.CurrentThread.CurrentCulture.Name);
            if (snapshot != null)
            {
                var multiVariantContent = variant.Content as ProductMultiVariant;

                return new ProductVariantDto
                {
                    ProductVariantReference = variant.Content.Key.ToString(),
                    Sku = snapshot.Sku,
                    PriceFormatted = snapshot.CalculatePrice()?.Formatted(),
                    ImageUrl = multiVariantContent?.Image.GetCropUrl(500, 500),
                    ThumbnailImageUrl = multiVariantContent?.Image.GetCropUrl(150, 150)
                };
            }
        }

        // Couldn't find a variant so return null
        return null;
    }
}
