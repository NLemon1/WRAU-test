using System.Text.Json.Serialization;

namespace WRA.Umbraco.Web.Dtos.External;

public class ExternalProductSubCategoryDto
{
    [JsonPropertyName("id")]
    public Guid Id { get; set; }

    [JsonPropertyName("productCategoryId")]
    public Guid ExternalCategoryId { get; set; }

    [JsonPropertyName("productCategoryName")]
    public string ProductCategoryName { get; set; } = string.Empty;

    [JsonPropertyName("name")]
    public string Name { get; set; } = string.Empty;

    [JsonPropertyName("description")]
    public string Description { get; set; } = string.Empty;
}
