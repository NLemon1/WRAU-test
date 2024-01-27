
namespace WRA.Umbraco.Dtos;

public record MultimediaRequestDto(
    string SearchPhrase,
    string MediaType,
    Pagination Pagination
);