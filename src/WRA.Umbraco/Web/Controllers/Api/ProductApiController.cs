using Microsoft.AspNetCore.Mvc;
using Umbraco.Cms.Api.Common.Attributes;
using Umbraco.Cms.Core;
using Umbraco.Cms.Web.Common.Controllers;
using Umbraco.Commerce.Core.Services;
using Umbraco.Commerce.Extensions;
using WRA.Umbraco.Attributes;
using WRA.Umbraco.Dtos;
using WRA.Umbraco.Extensions;
using WRA.Umbraco.Models;
using WRA.Umbraco.Web.Services;

namespace WRA.Umbraco.Web.Controllers.Api;

[ApiController]
[MapToApi("product-api")]
public class ProductApiController(
    IProductService productService,
    IPublishedContentQuery publishedContentQuery,
    WraProductService wraProductService)
    : UmbracoApiController
{

    [ApiKeyRequired]
    [HttpPost]
    [Route("GetProducts")]
    public IEnumerable<ProductPageResponseDto> GetProducts([FromBody] ProductsRequestDto request)
    {
        var products = wraProductService.GetProducts(request);
        var responseItems = products.Select(p => p.AsDto());
        return responseItems;
    }

    [ApiKeyRequired]
    [HttpGet]
    [Route("GetProductByExternalID")]
    public ProductPageResponseDto? GetProductByExternalID(string id)
    {
        var product = wraProductService.GetProductById(id);
        return product?.AsDto();
    }

    [ApiKeyRequired]
    [HttpPost]
    [Route("GetProductVariant")]
    public object? GetProductVariant([FromBody] GetProductVariantDto model)
    {
        // Get the variants for the given node
        if (publishedContentQuery.Content(model.ProductNodeId) is not MultiVariantProductPage productNode)
            return null;

        // Get the store from the product node
        var store = productNode.GetStore();

        // Find the variant with the matching attributes
        var variant = productNode.Variants.FindByAttributes(model.Attributes);

        // If we have a variant, map it's data to our DTO
        if (variant == null) return null;

        // Convert variant into product snapshot
        var snapshot = productService.GetProduct(store.Id, productNode.Key.ToString(), variant.Content.Key.ToString(), Thread.CurrentThread.CurrentCulture.Name);
        if (snapshot == null) return null;
        var multiVariantContent = variant.Content as ProductMultiVariant;

        return new ProductVariantDto
        {
            ProductVariantReference = variant.Content.Key.ToString(),
            Sku = snapshot.Sku,
            PriceFormatted = snapshot.TryCalculatePrice().ResultOr(null)?.Formatted(),
            ImageUrl = multiVariantContent?.Image?.GetCropUrl(500, 500) ?? string.Empty,
            ThumbnailImageUrl = multiVariantContent?.Image?.GetCropUrl(150, 150) ?? string.Empty
        };

        // Couldn't find a variant so return null
    }
}
