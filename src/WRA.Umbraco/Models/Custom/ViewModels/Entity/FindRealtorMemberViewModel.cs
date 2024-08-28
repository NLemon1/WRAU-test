using System.Text.Json.Serialization;

namespace WRA.Umbraco.Models.Custom.ViewModels.Entity;
public class FindRealtorMemberViewModel
{
    [JsonPropertyName("imisId")]
    public string? IMISId { get; set; }

    [JsonPropertyName("prefix")]
    public string? Prefix { get; set; }

    [JsonPropertyName("firstName")]
    public string? FirstName { get; set; }

    [JsonPropertyName("lastName")]
    public string? LastName { get; set; }

    [JsonPropertyName("fullName")]
    public string? FullName { get; set; }

    [JsonPropertyName("lastFirst")]
    public string? LastFirst { get; set; }

    [JsonPropertyName("suffix")]
    public string? Suffix { get; set; }

    [JsonPropertyName("city")]
    public string? City { get; set; }

    [JsonPropertyName("workPhone")]
    public string? WorkPhone { get; set; }

    [JsonPropertyName("memberTypeId")]
    public Guid? MemberTypeId { get; set; }

    [JsonPropertyName("memberTypeCode")]
    public string? MemberTypeCode { get; set; }

    [JsonPropertyName("companyId")]
    public Guid? CompanyId { get; set; }

    [JsonPropertyName("companyName")]
    public string? CompanyName { get; set; }

    [JsonPropertyName("primaryLocalBoardId")]
    public Guid? PrimaryLocalBoardId { get; set; }

    [JsonPropertyName("primaryLocalBoardName")]
    public string? PrimaryLocalBoardName { get; set; }

    [JsonPropertyName("secondaryLanguage")]
    public string? SecondaryLanguage { get; set; }
}
