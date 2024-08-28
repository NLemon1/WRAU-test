using System.Text.Json.Serialization;

namespace WRA.Umbraco.Models.Custom.ViewModels.Entity;

public class BoardViewModel
{
    [JsonPropertyName("id")]
    public Guid Id { get; set; }

    [JsonPropertyName("chapter")]
    public string? Chapter { get; set; }

    [JsonPropertyName("name")]
    public string? Name { get; set; }

    [JsonPropertyName("rosterOptIn")]
    public bool RosterOptIn { get; set; }

    [JsonPropertyName("rosterOptInDate")]
    public DateTime? RosterOptInDate { get; set; }
}
