using System.Text.Json.Serialization;

namespace WRA.Umbraco.Web.Dtos.External
{
    public class ExternalMemberBoardDto
    {
        [JsonPropertyName("id")]
        public Guid Id { get; set; } = Guid.Empty;

        [JsonPropertyName("chapter")]
        public string Chapter { get; set; } = string.Empty;

        [JsonPropertyName("name")]
        public string Name { get; set; } = string.Empty;

        [JsonPropertyName("rosterOptIn")]
        public bool RosterOptIn { get; set; }

        [JsonPropertyName("rosterOptInDate")]
        public DateTime? RosterOptInDate { get; set; }
    }
}
