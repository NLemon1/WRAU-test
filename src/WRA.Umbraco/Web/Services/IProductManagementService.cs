using WRA.Umbraco.Web.Dtos.External;
using WRA.Umbraco.Web.Dtos.WraExternal;

namespace WRA.Umbraco.Web.Services;

public interface IProductManagementService
{
    Task CreateProduct(ExternalProductDto product);

    Task UpdateProduct(ExternalProductDto product);

    Task<ExternalProductDto> GetProduct(string sku);
}