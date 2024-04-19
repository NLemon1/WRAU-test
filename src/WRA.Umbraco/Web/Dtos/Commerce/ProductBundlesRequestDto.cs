using WRA.Umbraco.Models.Custom;

namespace WRA.Umbraco.Dtos;
public record ProductBundlesRequestDto(
    string Category,
    string SubCategory,

    Pagination Pagination
);
