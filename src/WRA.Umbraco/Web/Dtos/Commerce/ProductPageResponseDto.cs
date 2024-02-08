
using Umbraco.Cms.Core.Models.PublishedContent;

namespace WRA.Umbraco.Dtos;

public record ProductPageResponseDto(
    string Title,
    string ProductType,
    string Category,
    string SubCategory,
    decimal Price,
    string Start,
    string End,
    string Url,
    int ResourceId,
    object ExtendedProps
);