using System.Text.Json.Serialization;

namespace WRA.Umbraco.Web.Dtos.Commerce;

public class ProductDto
{
    [JsonPropertyName("id")]
    public Guid ExternalId { get; set; }
    public string Name { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    public string Sku { get; set; } = string.Empty;

    public string ProductTypeId { get; set; } = string.Empty;

    public string ProductType { get; set; } = string.Empty;

    public string ProductCategoryId { get; set; } = string.Empty;

    public string Category { get; set; } = string.Empty;

    public string ProductSubcategoryId { get; set; } = string.Empty;

    public string SubCategory { get; set; } = string.Empty;

    public string ProductTaxonomyId { get; set; } = string.Empty;

    public string Taxonomy { get; set; } = string.Empty;

    public decimal? MemberPrice { get; set; }

    public decimal? Price { get; set; }

    public string ImageUrl { get; set; } = string.Empty;

    public bool IsTaxable { get; set; }

    public DateTime? StartDate { get; set; }

    public DateTime? EndDate { get; set; }

    public DateTime? EventStartDate { get; set; }

    public DateTime? EventEndDate { get; set; }

    public string Location { get; set; } = string.Empty;

    public int ProductStageId { get; set; }
}