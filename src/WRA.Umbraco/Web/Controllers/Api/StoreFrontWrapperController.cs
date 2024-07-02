using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Umbraco.Cms.Api.Common.Attributes;
using Umbraco.Cms.Web.Common.Controllers;
using Umbraco.Commerce.Core.Api;
using Umbraco.Commerce.Extensions;

namespace WRA.Umbraco.Web.Controllers.Api;

[ApiController]
[MapToApi("Commerce-api")]
[Route("WraStoreFrontApi")]
public class StoreFrontWrapperController(
    IUmbracoCommerceApi commerceApi,
    ILogger<StoreFrontWrapperController> logger) : UmbracoApiController
{
    [HttpPost]
    [Route("AddToCart")]
    public bool AddToCart(Guid orderId, [FromBody] ProductAddToCartDto postModel)
    {
        try
        {
            commerceApi.Uow.Execute(uow =>
            {
                var order = commerceApi.GetOrder(orderId)
                    .AsWritable(uow)
                    .AddProduct(postModel.ProductReference, postModel.Quantity);

                commerceApi.SaveOrder(order);

                uow.Complete();
            });
            return true;
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