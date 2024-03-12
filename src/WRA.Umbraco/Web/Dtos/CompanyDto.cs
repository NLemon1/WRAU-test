using System;
using System.Text.Json.Serialization;

namespace WRA.Umbraco.Models.Dtos.Commerce
{
    public class CompanyDto
    {
        [JsonPropertyName("ExternalId")]
        public string iMISId { get; set; }
        public string organizationCode { get; set; }
        public Guid memberTypeId { get; set; }
        public string category { get; set; }
        public string status { get; set; }
        public string address { get; set; }
        public string name { get; set; }
        public string city { get; set; }
        public string state { get; set; }
        public string zip { get; set; }
        public string email { get; set; }
        public string websiteUrl { get; set; }
    }
}
