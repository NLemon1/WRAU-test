using System.Text.Json.Serialization;

namespace WRA.Umbraco.Web.Dtos.External
{
    public class ExternalCompanyDto
    {
        [JsonPropertyName("id")]
        public string ExternalId { get; set; } = string.Empty;
        public string iMISId { get; set; } = string.Empty;
        public string organizationCode { get; set; } = string.Empty;
        public Guid memberTypeId { get; set; } = Guid.Empty;
        public string category { get; set; } = string.Empty;
        public string status { get; set; } = string.Empty;
        public string address { get; set; } = string.Empty;
        public string name { get; set; } = string.Empty;
        public string city { get; set; } = string.Empty;
        public string state { get; set; } = string.Empty;
        public string zip { get; set; } = string.Empty;
        public string email { get; set; } = string.Empty;
        public string websiteUrl { get; set; } = string.Empty;
    }
}
