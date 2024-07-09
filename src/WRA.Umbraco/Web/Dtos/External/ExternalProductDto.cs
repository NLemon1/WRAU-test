using System.Text.Json.Serialization;

namespace WRA.Umbraco.Web.Dtos.External;

public class ProductStage
{
    [JsonPropertyName("value")]
    public int Value { get; set; }

    [JsonPropertyName("name")]
    public string Name { get; set; } = string.Empty;

    [JsonPropertyName("description")]
    public string Description { get; set; } = string.Empty;
}

public class ExternalProductDto
{
    [JsonPropertyName("id")]
    public Guid Id { get; set; }

    [JsonPropertyName("name")]
    public string Name { get; set; } = string.Empty;

    [JsonPropertyName("description")]
    public string Description { get; set; } = string.Empty;

    [JsonPropertyName("sku")]
    public string Sku { get; set; } = string.Empty;

    [JsonPropertyName("productTypeId")]
    public Guid ProductTypeId { get; set; }

    [JsonPropertyName("productTypeName")]
    public string ProductType { get; set; } = string.Empty;

    [JsonPropertyName("productCategoryId")]
    public Guid ProductCategoryId { get; set; }

    [JsonPropertyName("productCategoryName")]
    public string Category { get; set; } = string.Empty;

    [JsonPropertyName("productSubcategoryId")]
    public Guid ProductSubcategoryId { get; set; }

    [JsonPropertyName("productSubcategoryName")]
    public string SubCategory { get; set; } = string.Empty;

    [JsonPropertyName("productTaxonomyId")]
    public Guid ProductTaxonomyId { get; set; }

    [JsonPropertyName("productTaxonomyName")]
    public string Taxonomy { get; set; } = string.Empty;

    [JsonPropertyName("memberPrice")]
    public decimal? MemberPrice { get; set; }

    [JsonPropertyName("nonMemberPrice")]
    public decimal? Price { get; set; }

    [JsonPropertyName("imageUrl")]
    public string ImageUrl { get; set; } = string.Empty;

    [JsonPropertyName("isTaxable")]
    public bool IsTaxable { get; set; }

    [JsonPropertyName("startDate")]
    public DateTime? StartDate { get; set; }

    [JsonPropertyName("endDate")]
    public DateTime? EndDate { get; set; }

    [JsonPropertyName("eventStartDate")]
    public DateTime? EventStartDate { get; set; }

    [JsonPropertyName("eventEndDate")]
    public DateTime? EventEndDate { get; set; }

    [JsonPropertyName("location")]
    public string Location { get; set; } = string.Empty;

    [JsonPropertyName("productStageId")]
    public int ProductStageId { get; set; }

    [JsonPropertyName("productStages")]
    public List<ProductStage> ProductStages { get; set; } = [];

    [JsonPropertyName("salesTaxCategoryCode")]
    public string? SalesTaxCategoryCode { get; set; }

    [JsonPropertyName("isShippable")]
    public bool IsShippable { get; set; }
}