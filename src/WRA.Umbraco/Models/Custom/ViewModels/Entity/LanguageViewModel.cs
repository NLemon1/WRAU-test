using System.Text.Json.Serialization;

namespace WRA.Umbraco.Models.Custom.ViewModels.Entity;

public class LanguageViewModel
{
    [JsonPropertyName("id")]
    public string Id { get; set; } = string.Empty;

    [JsonPropertyName("value")]
    public string Value { get; set; } = string.Empty;

    [JsonPropertyName("name")]
    public string Name { get; set; } = string.Empty;

    [JsonPropertyName("sortSeqn")]
    public int SortSeqn { get; set; } = 0;
}