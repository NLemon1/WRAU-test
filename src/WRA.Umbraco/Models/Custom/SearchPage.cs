using Umbraco.Cms.Core.Models.PublishedContent;

namespace WRA.Umbraco.Models
{
    public partial class SearchResults
    {
        public string searchTerm { get; set; }
        public IEnumerable<IPublishedContent> Results { get; set; } = Enumerable.Empty<IPublishedContent>();
        public bool HasSearched { get; set; }
    }
}
