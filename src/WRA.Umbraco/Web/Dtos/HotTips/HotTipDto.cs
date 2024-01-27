
namespace WRA.Umbraco.Dtos;

public record HotTipDto(
    string Name,
    string Category,
    IEnumerable<string> SubCategory,
    string Question,
    string Answer,
    string PublishDate
);