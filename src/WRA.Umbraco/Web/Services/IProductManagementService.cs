using Umbraco.Cms.Core.Models.PublishedContent;

namespace WRA.Umbraco.Services;

public interface IProductManagementService
{
    Task CreateProduct(WraProductDto product);
    Task UpdateProduct(WraProductDto product);
    Task<WraProductDto> GetProduct(string sku);
}