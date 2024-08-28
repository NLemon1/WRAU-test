using System.Text.Json.Serialization;

namespace WRA.Umbraco.Web.Dtos.External;

// #todoeric wire this up or get rid of it, and keep the states in umbraco.
public class ExternalStateOrProvinceDto
{
    [JsonPropertyName("id")]
    public Guid Id { get; set; }

    [JsonPropertyName("abbreviation")]
    public string Abbreviation { get; set; } = string.Empty;

    [JsonPropertyName("name")]
    public string Name { get; set; } = string.Empty;

    [JsonPropertyName("sortSeqn")]
    public int SortSeqn { get; set; } = 0;
}
