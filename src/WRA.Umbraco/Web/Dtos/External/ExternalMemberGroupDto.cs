using System.Text.Json.Serialization;

namespace WRA.Umbraco.Web.Dtos.External;

public class ExternalMemberGroupDto
{
    [JsonPropertyName("id")]
    public Guid Id { get; set; }

    [JsonPropertyName("type")]
    public string? Type { get; set; }

    [JsonPropertyName("description")]
    public string? Description { get; set; }

    [JsonPropertyName("isMember")]
    public bool IsMember { get; set; }
}