using System.Text.Json.Serialization;

namespace WRA.Umbraco.Web.Dtos.WraExternal;

internal class SearchResponse<T>
{
    [JsonPropertyName("data")]
    public IEnumerable<T>? Data { get; set; }
    public int CurrentPage { get; set; }
    public int TotalPages { get; set; }
    public int TotalCount { get; set; }
    public int PageSize { get; set; }
    public bool HasPreviousPage { get; set; }
    public bool HasNextPage { get; set; }
}