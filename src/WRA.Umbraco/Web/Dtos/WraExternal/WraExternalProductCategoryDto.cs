using Newtonsoft.Json;


namespace WRA.Umbraco.Dtos;
public record WraExternalProductCategoryDto
{
    public string ExternalId;
    public string Name;
    public string Description;

    public WraExternalProductCategoryDto() { }


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