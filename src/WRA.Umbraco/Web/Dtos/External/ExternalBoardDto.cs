using System.Text.Json.Serialization;

namespace WRA.Umbraco.Web.Dtos.External;

public class ExternalBoardDto
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
