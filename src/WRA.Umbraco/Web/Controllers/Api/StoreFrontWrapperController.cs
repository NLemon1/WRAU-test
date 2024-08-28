using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Umbraco.Cms.Api.Common.Attributes;
using Umbraco.Cms.Web.Common.Controllers;
using Umbraco.Commerce.Core.Api;
using Umbraco.Commerce.Extensions;
using WRA.Umbraco.Attributes;

namespace WRA.Umbraco.Web.Controllers.Api;

[ApiController]
[MapToApi("Commerce-api")]
[Route("WraStoreFrontApi")]
public class StoreFrontWrapperController(
    IUmbracoCommerceApi commerceApi,
    ILogger<StoreFrontWrapperController> logger) : UmbracoApiController
{
    [ApiKeyRequired]
    [HttpPost]
    [Route("AddToCart")]
    public ProductAddToCartResponseDto AddToCart(Guid orderId, [FromBody] ProductAddToCartDto postModel)
    {
        try
        {
            ProductAddToCartResponseDto response = new();
            commerceApi.Uow.Execute(uow =>
            {
                var order = commerceApi.GetOrder(orderId)
                    .AsWritable(uow)
                    .AddProduct(postModel.ProductReference, postModel.Quantity);

                commerceApi.SaveOrder(order);

                uow.Complete();
                response.Success = true;
                response.TotalQuantity = order.TotalQuantity;
            });

            return response;
        }
        catch (Exception e)
        {
            logger.LogError(e, "Failed to add product to cart");
            throw;
        }
    }
}

public class ProductAddToCartDto
{
    public string ProductReference { get; set; } = string.Empty;
    public decimal Quantity { get; set; } = 1;

}

public class ProductAddToCartResponseDto
{
    public bool Success { get; set; }
    public decimal TotalQuantity { get; set; } = 0;
}
