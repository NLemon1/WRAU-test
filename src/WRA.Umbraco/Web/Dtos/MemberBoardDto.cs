using System.Text.Json.Serialization;

namespace WRA.Umbraco.Dtos
{
    public class MemberBoardDto
    {
        [JsonPropertyName("id")]
        public string Id { get; set; }

        [JsonPropertyName("chapter")]
        public string Chapter { get; set; }

        [JsonPropertyName("name")]
        public string Name { get; set; }

        [JsonPropertyName("rosterOptIn")]
        public bool RosterOptIn { get; set; }

        [JsonPropertyName("rosterOptInDate")]
        public DateTime? RosterOptInDate { get; set; }
    }
}
