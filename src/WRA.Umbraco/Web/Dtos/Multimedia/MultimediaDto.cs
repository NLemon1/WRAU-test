namespace WRA.Umbraco.Dtos;

public record MultimediaDto(
    string Title,
    string Url,
    string Type,
    string YouTubeId,
    string Description,
    string ThumbnailOverride,
    string Date,
    string DateDisplay,
    bool IsPlaylist,
    IEnumerable<MultimediaDto> Children
);