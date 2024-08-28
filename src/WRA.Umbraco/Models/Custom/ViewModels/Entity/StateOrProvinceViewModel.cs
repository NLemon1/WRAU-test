using System.Text.Json.Serialization;

namespace WRA.Umbraco.Models.Custom.ViewModels.Entity;

public class StateOrProvinceViewModel
{
    [JsonPropertyName("id")]
    public string Id { get; set; } = string.Empty;

    [JsonPropertyName("abbreviation")]
    public string Abbreviation { get; set; } = string.Empty;

    [JsonPropertyName("name")]
    public string Name { get; set; } = string.Empty;

    [JsonPropertyName("sortSeqn")]
    public int SortSeqn { get; set; } = 0;
}