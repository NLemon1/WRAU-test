using System.Text.Json.Serialization;

namespace WRA.Umbraco.Web.Dtos.External;
public class ExternalProductCategoryDto
{
    [JsonPropertyName("id")]
    public Guid Id { get; set; }

    [JsonPropertyName("productTypeId")]
    public string ProductTypeId { get; set; }

    [JsonPropertyName("productTypeName")]
    public string ProductTypeName { get; set; }

    [JsonPropertyName("name")]
    public string Name { get; set; }

    [JsonPropertyName("description")]
    public string Description { get; set; }
}
