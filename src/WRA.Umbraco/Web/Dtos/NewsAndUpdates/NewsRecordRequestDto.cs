using WRA.Umbraco.Models.Custom;

namespace WRA.Umbraco.Dtos;

public record NewsRecordRequest
{
    public string SearchPhrase { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public Pagination Pagination { get; set; } = new Pagination();
}
