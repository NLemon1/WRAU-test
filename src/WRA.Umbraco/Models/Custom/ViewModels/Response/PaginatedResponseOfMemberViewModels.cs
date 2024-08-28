using System.Text.Json.Serialization;
using WRA.Umbraco.Models.Custom.ViewModels.Entity;

namespace WRA.Umbraco.Models.Custom.ViewModels;

public class PaginationResponseOfFindRealtorMemberViewModels
{
    /// <summary>
    /// List of items in the current page.
    /// </summary>
    [JsonPropertyName("data")]
    public List<FindRealtorMemberViewModel> Data { get; set; } = [];

    /// <summary>
    /// Current page number.
    /// </summary>
    [JsonPropertyName("currentPage")]
    public int CurrentPage { get; set; }

    /// <summary>
    /// Total number of pages.
    /// </summary>
    [JsonPropertyName("totalPages")]
    public int TotalPages { get; set; }

    /// <summary>
    /// Total count of items.
    /// </summary>
    [JsonPropertyName("totalCount")]
    public int TotalCount { get; set; }

    /// <summary>
    /// Number of items per page.
    /// </summary>
    [JsonPropertyName("pageSize")]
    public int PageSize { get; set; }

    /// <summary>
    /// Indicates whether there is a previous page.
    /// </summary>
    [JsonPropertyName("hasPreviousPage")]
    public bool HasPreviousPage { get; set; }

    /// <summary>
    /// Indicates whether there is a next page.
    /// </summary>
    [JsonPropertyName("hasNextPage")]
    public bool HasNextPage { get; set; }
}
