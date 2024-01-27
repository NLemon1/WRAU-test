namespace WRA.Umbraco.Dtos;

public record NewsRecordRequest
{
    public string SearchPhrase { get; set; }
    public string Category { get; set; }
    public Pagination? Pagination { get; set; }

}
