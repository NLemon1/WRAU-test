using System.Text.Json.Serialization;

namespace WRA.Umbraco.Web.Dtos.External;

public class ExternalMemberDto
{
    [JsonPropertyName("id")]
    public Guid ExternalId { get; set; }

    [JsonPropertyName("umbracoId")]
    public string? UmbracoId { get; set; }

    [JsonPropertyName("iMISId")]
    public string IMISId { get; set; }

    [JsonPropertyName("nrdsId")]
    public string NRDSId { get; set; }

    [JsonPropertyName("commonId")]
    public int CommonId { get; set; }

    [JsonPropertyName("passwordHash")]
    public string PasswordHash { get; set; }

    [JsonPropertyName("passwordSalt")]
    public string PasswordSalt { get; set; }

    [JsonPropertyName("userName")]
    public string UserName { get; set; }

    [JsonPropertyName("prefix")]
    public string Prefix { get; set; }

    [JsonPropertyName("firstName")]
    public string FirstName { get; set; }

    [JsonPropertyName("lastName")]
    public string LastName { get; set; }

    [JsonPropertyName("suffix")]
    public string Suffix { get; set; }

    [JsonPropertyName("fullName")]
    public string FullName { get; set; }

    [JsonPropertyName("lastFirst")]
    public string LastFirst { get; set; }

    [JsonPropertyName("address1")]
    public string Address1 { get; set; }

    [JsonPropertyName("address2")]
    public string Address2 { get; set; }

    [JsonPropertyName("address3")]
    public string Address3 { get; set; }

    [JsonPropertyName("city")]
    public string City { get; set; }

    [JsonPropertyName("stateProvince")]
    public string StateProvince { get; set; }

    [JsonPropertyName("zip")]
    public string Zip { get; set; }

    [JsonPropertyName("email")]
    public string Email { get; set; }

    [JsonPropertyName("marketingEmail")]
    public string MarketingEmail { get; set; }

    [JsonPropertyName("brokerFullName")]
    public string BrokerFullName { get; set; }

    [JsonPropertyName("brokerEmail")]
    public string BrokerEmail { get; set; }

    [JsonPropertyName("homePhone")]
    public string HomePhone { get; set; }

    [JsonPropertyName("workPhone")]
    public string WorkPhone { get; set; }

    [JsonPropertyName("cellPhone")]
    public string CellPhone { get; set; }

    [JsonPropertyName("imageUrl")]
    public string ImageUrl { get; set; }

    [JsonPropertyName("mandatoryHotlineLetter")]
    public bool MandatoryHotlineLetter { get; set; }

    [JsonPropertyName("canUseHotline")]
    public bool CanUseHotline { get; set; }

    [JsonPropertyName("fax")]
    public string Fax { get; set; }

    [JsonPropertyName("gender")]
    public string Gender { get; set; }

    [JsonPropertyName("minnesotaLicense")]
    public string MinnesotaLicense { get; set; }

    [JsonPropertyName("joinDate")]
    public DateTime? JoinDate { get; set; }

    [JsonPropertyName("companyLogoUrl")]
    public string CompanyLogoUrl { get; set; }

    [JsonPropertyName("memberTypeId")]
    public Guid MemberTypeId { get; set; }

    [JsonPropertyName("memberTypeCode")]
    public string MemberTypeCode { get; set; }

    [JsonPropertyName("companyId")]
    public string CompanyId { get; set; }

    [JsonPropertyName("companyName")]
    public string? CompanyName { get; set; }

    [JsonPropertyName("primaryLocalBoardId")]
    public string PrimaryLocalBoardId { get; set; }

    [JsonPropertyName("primaryLocalBoardChapter")]
    public string? PrimaryLocalBoardChapter { get; set; }

    [JsonPropertyName("primaryLocalBoardName")]
    public string? PrimaryLocalBoardName { get; set; }

    [JsonPropertyName("paidThruDate")]
    public DateTime? PaidThruDate { get; set; }

    [JsonPropertyName("fairhavenDate")]
    public DateTime? FairhavenDate { get; set; }
}
