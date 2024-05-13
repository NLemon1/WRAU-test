using WRA.Umbraco.Models.Custom;

namespace WRA.Umbraco.Dtos.LegalUpdates;

public record LegalUpdateRequestDto(
    string Year,
    IEnumerable<string> Topics,
    Pagination Pagination
);