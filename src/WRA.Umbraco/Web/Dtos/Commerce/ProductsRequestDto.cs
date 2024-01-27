
namespace WRA.Umbraco.Dtos;

public record ProductsRequestDto(
    string ProductType,
    string Category,
    string SubCategory,
    Pagination Pagination
);