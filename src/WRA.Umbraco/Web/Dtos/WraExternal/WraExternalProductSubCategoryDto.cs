using Newtonsoft.Json;


namespace WRA.Umbraco.Dtos;
public record WraExternalProductSubCategoryDto
{
    public string ExternalId;
    public string ExternalCategoryId;
    public string Name;
    public string Description;

    [JsonConstructor]
    public WraExternalProductSubCategoryDto(
        string id,
        string productCategoryId,
        string name,
        string description)
    {
        ExternalId = id;
        ExternalCategoryId = productCategoryId;
        Name = name;
        Description = description;

    }
}