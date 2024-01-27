namespace WRA.Umbraco.Dtos;

public record HotTipResponseDto(
    IEnumerable<HotTipDto> HotTips,
    SearchResultsDto SearchInfo
);