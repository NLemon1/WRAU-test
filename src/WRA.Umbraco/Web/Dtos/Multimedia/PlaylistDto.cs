namespace WRA.Umbraco.Dtos;
public record PlaylistDto(
        IEnumerable<MultimediaDto> PlaylistItems,
        DateTime Date,
        string Description,
        string MediaType,
        string Title
);