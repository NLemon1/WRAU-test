namespace WRA.Umbraco.Dtos;

public record NewsAndUpdatesResponseDto(
    IEnumerable<NewsRecordDto> NewsRecords,
    SearchResultsDto SearchResultInfo
);