using WRA.Umbraco.Models.Custom;

namespace WRA.Umbraco.Dtos;

public record ProductsRequestDto(
    string ProductType,
    List<int> Categories,
    List<int> SubCategories,
    string Taxonomy,
    Pagination Pagination
);