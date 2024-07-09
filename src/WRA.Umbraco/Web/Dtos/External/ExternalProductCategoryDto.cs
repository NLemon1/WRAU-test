using System.Text.Json.Serialization;

namespace WRA.Umbraco.Web.Dtos.External;
public class ExternalProductCategoryDto
{
    [JsonPropertyName("id")]
    public Guid Id { get; set; }

    [JsonPropertyName("productTypeId")]
    public string ProductTypeId { get; set; } = string.Empty;

    [JsonPropertyName("productTypeName")]
    public string ProductTypeName { get; set; } = string.Empty;

    [JsonPropertyName("name")]
    public string Name { get; set; } = string.Empty;

    [JsonPropertyName("description")]
    public string Description { get; set; } = string.Empty;
}
