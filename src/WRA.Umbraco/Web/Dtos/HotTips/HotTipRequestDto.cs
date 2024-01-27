namespace WRA.Umbraco.Dtos;

public record HotTipRequestDto(
    string Category,
    IEnumerable<string> SubCategory,
    Pagination Pagination
);
