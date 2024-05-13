namespace WRA.Umbraco.Dtos;

public record LegalUpdateResponseDto(
    IEnumerable<LegalUpdateDto> LegalUpdates,
    SearchResultsDto SearchInfo
);