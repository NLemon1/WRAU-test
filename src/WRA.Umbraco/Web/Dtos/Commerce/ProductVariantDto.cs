using System.Runtime.Serialization;

namespace WRA.Umbraco.Dtos;

[DataContract(Name = "productVariant", Namespace = "")]
public record ProductVariantDto
{
    [DataMember(Name = "productVariantReference")]
    public string ProductVariantReference { get; set; } = string.Empty;

    [DataMember(Name = "sku")]
    public string Sku { get; set; } = string.Empty;

    [DataMember(Name = "priceFormatted")]
    public string PriceFormatted { get; set; } = string.Empty;

    [DataMember(Name = "imageUrl")]
    public string ImageUrl { get; set; } = string.Empty;

    [DataMember(Name = "thumbnailImageUrl")]
    public string ThumbnailImageUrl { get; set; } = string.Empty;
}
