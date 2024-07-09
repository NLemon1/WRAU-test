using System.Text.Json.Serialization;

namespace WRA.Umbraco.Web.Dtos.External;

public class ExternalMemberDto
{
    [JsonPropertyName("id")]
    public Guid ExternalId { get; set; }

    [JsonPropertyName("umbracoId")]
    public string? UmbracoId { get; set; }

    [JsonPropertyName("iMISId")]
    public string IMISId { get; set; } = string.Empty;

    [JsonPropertyName("nrdsId")]
    public string NRDSId { get; set; } = string.Empty;

    [JsonPropertyName("commonId")]
    public int CommonId { get; set; }

    [JsonPropertyName("passwordHash")]
    public string PasswordHash { get; set; } = string.Empty;

    [JsonPropertyName("passwordSalt")]
    public string PasswordSalt { get; set; } = string.Empty;

    [JsonPropertyName("userName")]
    public string UserName { get; set; } = string.Empty;

    [JsonPropertyName("prefix")]
    public string Prefix { get; set; } = string.Empty;

    [JsonPropertyName("firstName")]
    public string FirstName { get; set; } = string.Empty;

    [JsonPropertyName("lastName")]
    public string LastName { get; set; } = string.Empty;

    [JsonPropertyName("suffix")]
    public string Suffix { get; set; } = string.Empty;

    [JsonPropertyName("fullName")]
    public string FullName { get; set; } = string.Empty;

    [JsonPropertyName("lastFirst")]
    public string LastFirst { get; set; } = string.Empty;

    [JsonPropertyName("address1")]
    public string Address1 { get; set; } = string.Empty;

    [JsonPropertyName("address2")]
    public string Address2 { get; set; } = string.Empty;

    [JsonPropertyName("address3")]
    public string Address3 { get; set; } = string.Empty;

    [JsonPropertyName("city")]
    public string City { get; set; } = string.Empty;

    [JsonPropertyName("stateProvince")]
    public string StateProvince { get; set; } = string.Empty;

    [JsonPropertyName("zip")]
    public string Zip { get; set; } = string.Empty;

    [JsonPropertyName("email")]
    public string Email { get; set; } = string.Empty;

    [JsonPropertyName("marketingEmail")]
    public string MarketingEmail { get; set; } = string.Empty;

    [JsonPropertyName("brokerFullName")]
    public string BrokerFullName { get; set; } = string.Empty;

    [JsonPropertyName("brokerEmail")]
    public string BrokerEmail { get; set; } = string.Empty;

    [JsonPropertyName("homePhone")]
    public string HomePhone { get; set; } = string.Empty;

    [JsonPropertyName("workPhone")]
    public string WorkPhone { get; set; } = string.Empty;

    [JsonPropertyName("cellPhone")]
    public string CellPhone { get; set; } = string.Empty;

    [JsonPropertyName("imageUrl")]
    public string ImageUrl { get; set; } = string.Empty;

    [JsonPropertyName("mandatoryHotlineLetter")]
    public bool MandatoryHotlineLetter { get; set; }

    [JsonPropertyName("canUseHotline")]
    public bool CanUseHotline { get; set; }

    [JsonPropertyName("fax")]
    public string Fax { get; set; } = string.Empty;

    [JsonPropertyName("gender")]
    public string Gender { get; set; } = string.Empty;

    [JsonPropertyName("minnesotaLicense")]
    public string MinnesotaLicense { get; set; } = string.Empty;

    [JsonPropertyName("joinDate")]
    public DateTime? JoinDate { get; set; }

    [JsonPropertyName("companyLogoUrl")]
    public string CompanyLogoUrl { get; set; } = string.Empty;

    [JsonPropertyName("memberTypeId")]
    public Guid MemberTypeId { get; set; }

    [JsonPropertyName("memberTypeCode")]
    public string MemberTypeCode { get; set; } = string.Empty;

    [JsonPropertyName("companyId")]
    public string CompanyId { get; set; } = string.Empty;

    [JsonPropertyName("companyName")]
    public string? CompanyName { get; set; }

    [JsonPropertyName("primaryLocalBoardId")]
    public string PrimaryLocalBoardId { get; set; } = string.Empty;

    [JsonPropertyName("primaryLocalBoardChapter")]
    public string? PrimaryLocalBoardChapter { get; set; }

    [JsonPropertyName("primaryLocalBoardName")]
    public string? PrimaryLocalBoardName { get; set; }

    [JsonPropertyName("paidThruDate")]
    public DateTime? PaidThruDate { get; set; }

    [JsonPropertyName("fairhavenDate")]
    public DateTime? FairhavenDate { get; set; }
}
