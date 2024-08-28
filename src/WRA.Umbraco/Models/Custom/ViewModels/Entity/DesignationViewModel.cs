using System.Text.Json.Serialization;

namespace WRA.Umbraco.Models.Custom.ViewModels.Entity;

public class DesignationViewModel
{
    [JsonPropertyName("id")]
    public Guid Id { get; set; }

    [JsonPropertyName("designationCode")]
    public string? DesignationCode { get; set; }

    [JsonPropertyName("designationText")]
    public string? DesignationText { get; set; }

    [JsonPropertyName("title")]
    public string? Title { get; set; }

    [JsonPropertyName("description")]
    public string? Description { get; set; }

    [JsonPropertyName("longDescription")]
    public string? LongDescription { get; set; }
}
