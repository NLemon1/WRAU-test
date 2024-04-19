namespace WRA.Umbraco.Dtos;

public record HotTipDto(
    string Name,
    IEnumerable<string> Categories,
    IEnumerable<string> SubCategory,
    string Question,
    string Answer,
    string PublishDate
);