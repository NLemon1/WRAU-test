using System.Text.Json;
using System.Text.Json.Serialization;


namespace WRA.Umbraco.Dtos;
public record WraExternalProductCategoryDto
{
    public string ExternalId;
    public string Name;
    public string Description;


    [JsonConstructor]
    public WraExternalProductCategoryDto(
        string id,
        string name,
        string description)
    {
        ExternalId = id;
        Name = name;
        Description = description;

    }
}