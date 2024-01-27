
namespace WRA.Umbraco.Dtos;

public record MultimediaResponseDto(
    IEnumerable<MultimediaDto> MultimediaItems,
    // IEnumerable<PlaylistDto> Playlists,
    SearchResultsDto SearchResultInfo
);