using System.Text.Json.Serialization;

namespace WRA.Umbraco.Web.Dtos.External;
public class ExternalDesignationDto
{
    [JsonPropertyName("id")]
    public Guid Id { get; set; }

    [JsonPropertyName("designationCode")]
    public string? DesignationCode { get; set; }

    [JsonPropertyName("name")]
    public string? Name { get; set; }

    [JsonPropertyName("designationText")]
    public string? DesignationText { get; set; }

    [JsonPropertyName("description")]
    public string? Description { get; set; }

    [JsonPropertyName("longDescription")]
    public string? LongDescription { get; set; }

    [JsonPropertyName("sortSeqn")]
    public int? SortSeqn { get; set; }
}