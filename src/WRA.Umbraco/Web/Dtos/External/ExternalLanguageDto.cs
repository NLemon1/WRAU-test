namespace WRA.Umbraco.Web.Dtos.External;

// #todoeric wire this up or get rid of it and store these in umbraco.
public class ExternalLanguageDto
{
    public Guid Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public string Value { get; set; } = string.Empty;

    public int SortSeqn { get; set; } = 0;
}