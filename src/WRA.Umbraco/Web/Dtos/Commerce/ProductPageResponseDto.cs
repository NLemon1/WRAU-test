
using Umbraco.Cms.Core.Models.PublishedContent;

namespace WRA.Umbraco.Dtos;

public record ProductPageResponseDto(
    string Title,
    string ProductType,
    string Taxonomy,
    string Category,
    string SubCategory,
    string Price,
    string MemberPrice,
    string Start,
    string End,
    string Url,
    int ResourceId,
    object ExtendedProps,
    string startDate,
    string startTime,
    string endDate,
    string endTime,
    int productId,
    int creditHours
);