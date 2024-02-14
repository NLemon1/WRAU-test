

using System.Text.Json;
using System.Text.Json.Serialization;

namespace WRA.Umbraco.Dtos;
public class WraExternalProductCategoryDto
{
    [JsonPropertyName("id")]
    public Guid ExternalId { get; set; }

    [JsonPropertyName("productTypeId")]
    public string ProductTypeId { get; set; }

    [JsonPropertyName("productTypeName")]
    public string ProductTypeName { get; set; }

    [JsonPropertyName("name")]
    public string Name { get; set; }

    [JsonPropertyName("description")]
    public string Description { get; set; }
}


