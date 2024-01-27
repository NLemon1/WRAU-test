using Newtonsoft.Json;


namespace WRA.Umbraco.Dtos;
public record WraExternalProducctDto
{
    public string ExternalId;
    public string Name;
    public string Description;
    public string Sku;
    public string Taxonomy;
    public string Price;
    public string ProductType;
    public string StartDate;
    public string EndDate;
    public string Category;
    public string SubCategory;

    public WraExternalProducctDto() { }


    [JsonConstructor]
    public WraExternalProducctDto(
        string id,
        string name,
        string description,
        string sku,
        string productTaxonomyName,
        string nonMemberPrice,
        string productTypeName,
        string startDate,
        string endDate,
        string productCategoryName,
        string productSubcategoryName
        )
    {
        ExternalId = id;
        Name = name;
        Description = description;
        Sku = sku;
        Taxonomy = productTaxonomyName;
        Price = nonMemberPrice;
        ProductType = productTypeName;
        StartDate = startDate;
        EndDate = endDate;
        Category = productCategoryName;
        SubCategory = productSubcategoryName;
    }
}