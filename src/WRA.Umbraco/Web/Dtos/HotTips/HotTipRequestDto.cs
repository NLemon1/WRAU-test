namespace WRA.Umbraco.Dtos;

public record HotTipRequestDto(
    IEnumerable<string> Categories,
    IEnumerable<string> SubCategories,
    Pagination Pagination
);
