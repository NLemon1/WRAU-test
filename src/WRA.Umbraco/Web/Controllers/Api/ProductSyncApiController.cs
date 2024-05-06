using System.Web.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Umbraco.Cms.Api.Common.Attributes;
using Umbraco.Cms.Core.Mapping;
using WRA.Umbraco.Contracts;
using WRA.Umbraco.Web.Dtos.External;
using WRA.Umbraco.Web.Dtos.WraExternal;
using WRA.Umbraco.Web.Services;

namespace WRA.Umbraco.Web.Controllers.Api;

[ApiController]
[MapToApi("product-api")]
[Route("WraProductApi")]

public class ProductSyncApiController(
    WraProductManagementService wraProductManagementService,
    IUmbracoMapper mapper,
    ILogger<ProductSyncApiController> logger)
    : ApiController
{
    [HttpPost]
    [Route("CreateProduct")]
    public async Task CreateProduct(ExternalProductDto product)
    {
        var productEvent = mapper.Map<ProductEvent>(product);
        await wraProductManagementService.CreateOrUpdate(productEvent);
    }

}