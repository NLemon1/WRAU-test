using WRA.Umbraco.Web.Dtos.WraExternal;

namespace WRA.Umbraco.Web.Services;

public interface IProductManagementService
{
    Task CreateProduct(WraProductDto product);

    Task UpdateProduct(WraProductDto product);

    Task<WraProductDto> GetProduct(string sku);
}