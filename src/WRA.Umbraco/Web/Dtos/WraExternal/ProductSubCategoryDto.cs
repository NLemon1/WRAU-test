using System.Text.Json.Serialization;

namespace WRA.Umbraco.Dtos;

public class ProductSubCategoryDto
{
    [JsonPropertyName("id")]
    public Guid ExternalId { get; set; }

    [JsonPropertyName("productCategoryId")]
    public Guid ExternalCategoryId { get; set; }

    [JsonPropertyName("productCategoryName")]
    public string ProductCategoryName { get; set; }

    [JsonPropertyName("name")]
    public string Name { get; set; }

    [JsonPropertyName("description")]
    public string Description { get; set; }
}
