
using Umbraco.Cms.Core.Models.PublishedContent;

namespace WRA.Umbraco.Dtos;

public record ProductPageResponseDto(
    string Name,
    string ProductType,
    string Category,
    string SubCategory,
    decimal Price,
    string StartDate,
    string EndDate,
    string Url
);