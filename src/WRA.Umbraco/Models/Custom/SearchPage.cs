using MailKit.Search;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
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
