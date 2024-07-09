using System.Web.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Umbraco.Cms.Api.Common.Attributes;
using Umbraco.Cms.Core.Mapping;
using WRA.Umbraco.Contracts;
using WRA.Umbraco.Web.Dtos.External;
using WRA.Umbraco.Web.Services;

namespace WRA.Umbraco.Web.Controllers.Api;

[ApiController]
[MapToApi("product-api")]
[Route("WraProductApi")]

public class ProductSyncApiController(
    WraProductManagementService wraProductManagementService,
    IUmbracoMapper mapper)
    : ApiController
{
    [HttpPost]
    [Route("CreateProduct")]
    public async Task CreateProduct(ExternalProductDto product)
    {
        var productEvent = mapper.Map<ProductEvent>(product);
        if (productEvent != null) wraProductManagementService.CreateOrUpdate(productEvent);
    }

    [HttpPost]
    [Route("UpdateProduct")]
    public async Task UpdateProduct(ExternalProductDto product)
    {
        await CreateProduct(product);
    }

    [HttpPost]
    [Route("DeleteProduct")]
    public void DeleteProduct(ExternalProductDto product)
    {
        var productEvent = mapper.Map<ProductEvent>(product);
        if (productEvent != null) wraProductManagementService.Delete(productEvent);
    }

}