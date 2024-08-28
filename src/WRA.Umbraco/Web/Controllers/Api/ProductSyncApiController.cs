using System.Web.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Umbraco.Cms.Api.Common.Attributes;
using Umbraco.Cms.Core.Mapping;
using WRA.Umbraco.Attributes;
using WRA.Umbraco.Contracts;
using WRA.Umbraco.Web.Dtos.External;
using WRA.Umbraco.Web.Services;
using Umbraco.Cms.Web.Common.Filters;

namespace WRA.Umbraco.Web.Controllers.Api;

[ApiController]
[MapToApi("product-api")]
[Route("WraProductApi")]
[UmbracoMemberAuthorize("Admins", "", "")]

public class ProductSyncApiController(
    WraProductManagementService wraProductManagementService,
    IUmbracoMapper mapper)
    : ApiController
{
    [ApiKeyRequired]
    [HttpPost]
    [Route("CreateProduct")]
    public async Task CreateProduct(ExternalProductDto product)
    {
            // #todolightburn: No await?
        var productEvent = mapper.Map<ProductEvent>(product);
        if (productEvent != null) wraProductManagementService.CreateOrUpdate(productEvent);
    }

    [ApiKeyRequired]
    [HttpPost]
    [Route("UpdateProduct")]
    public async Task UpdateProduct(ExternalProductDto product)
    {
        await CreateProduct(product);
    }

    [ApiKeyRequired]
    [HttpPost]
    [Route("DeleteProduct")]
    public void DeleteProduct(ExternalProductDto product)
    {
        var productEvent = mapper.Map<ProductEvent>(product);
        if (productEvent != null) wraProductManagementService.Delete(productEvent);
    }
}