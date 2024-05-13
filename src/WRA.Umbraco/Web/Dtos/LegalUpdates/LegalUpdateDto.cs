namespace WRA.Umbraco.Dtos;

public record LegalUpdateDto(
    string Name,
    IEnumerable<string> Topics,
    string Content,
    string PDF,
    string PublishDate
);