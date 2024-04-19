using WRA.Umbraco.Models.Custom;

namespace WRA.Umbraco.Dtos;

public record ProductsRequestDto(
    string ProductType,
    List<string> Categories,
    List<string> SubCategories,
    string Taxonomy,
    Pagination Pagination
);