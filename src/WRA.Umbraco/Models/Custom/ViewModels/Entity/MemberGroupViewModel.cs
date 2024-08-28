using System.Text.Json.Serialization;

namespace WRA.Umbraco.Models.Custom.ViewModels.Entity;

public class MemberGroupViewModel
{
    [JsonPropertyName("id")]
    public int Id { get; set; }

    [JsonPropertyName("externalId")]
    public Guid ExternalId { get; set; }

    [JsonPropertyName("type")]
    public string? Type { get; set; }

    [JsonPropertyName("description")]
    public string? Description { get; set; }

    [JsonPropertyName("isMember")]
    public bool IsMember { get; set; }

}