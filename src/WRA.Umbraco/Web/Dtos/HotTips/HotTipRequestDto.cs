using WRA.Umbraco.Models.Custom;

namespace WRA.Umbraco.Dtos.Hottips;

public record HotTipRequestDto(
    IEnumerable<string> Categories,
    IEnumerable<string> SubCategories,
    Pagination Pagination
);
