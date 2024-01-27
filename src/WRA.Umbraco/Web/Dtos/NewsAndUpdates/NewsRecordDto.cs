namespace WRA.Umbraco.Dtos;

public record NewsRecordDto(
    string Url,

    string Name,

    string Category,

    string Image,

    string Excerpt,

    string Title,

    string Date,

    string DateDisplay
);
