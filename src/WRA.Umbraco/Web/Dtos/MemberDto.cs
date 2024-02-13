using System.Text.Json.Serialization;
using Newtonsoft.Json;

namespace WRA.Umbraco.Dtos;
// public class LocalBoard
// {
//     [JsonPropertyName("chapter")]
//     public string Chapter { get; set; }

//     [JsonPropertyName("id")]
//     public string Id { get; set; }

//     [JsonPropertyName("localBoardName")]
//     public string LocalBoardName { get; set; }

//     [JsonPropertyName("rosterOptIn")]
//     public bool RosterOptIn { get; set; }

//     [JsonPropertyName("rosterOptInDate")]
//     public DateTime RosterOptInDate { get; set; }
// }

// public class MyLocalBoard
// {
//     [JsonPropertyName("chapter")]
//     public string Chapter { get; set; }

//     [JsonPropertyName("id")]
//     public string Id { get; set; }

//     [JsonPropertyName("localBoardName")]
//     public string LocalBoardName { get; set; }

//     [JsonPropertyName("rosterOptIn")]
//     public bool RosterOptIn { get; set; }

//     [JsonPropertyName("rosterOptInDate")]
//     public DateTime RosterOptInDate { get; set; }
// }
public class MemberDto
{

    [JsonProperty("umbracoMemberId")]
    public int? MemberId { get; set; }

    [JsonProperty("securityHash")]
    public string? SecurtyHash { get; set; }

    [JsonPropertyName("address1")]
    public string Address1 { get; set; }

    [JsonPropertyName("address2")]
    public string Address2 { get; set; }

    [JsonPropertyName("address3")]
    public string Address3 { get; set; }

    [JsonPropertyName("brokerEmail")]
    public string BrokerEmail { get; set; }

    [JsonPropertyName("brokerFullName")]
    public string BrokerFullName { get; set; }

    [JsonPropertyName("canUseHotline")]
    public bool CanUseHotline { get; set; }

    [JsonPropertyName("cellPhone")]
    public string CellPhone { get; set; }

    [JsonPropertyName("city")]
    public string City { get; set; }

    [JsonPropertyName("companyId")]
    public int CompanyId { get; set; }

    [JsonPropertyName("companyLogoUrl")]
    public string CompanyLogoUrl { get; set; }

    [JsonPropertyName("companyName")]
    public string CompanyName { get; set; }

    [JsonPropertyName("companySubscriptions")]
    public List<object> CompanySubscriptions { get; set; }

    [JsonPropertyName("email")]
    public string Email { get; set; }

    [JsonPropertyName("fairhavenDate")]
    public object FairhavenDate { get; set; }

    [JsonPropertyName("fax")]
    public string Fax { get; set; }

    [JsonPropertyName("firstName")]
    public string FirstName { get; set; }

    [JsonPropertyName("fullName")]
    public string FullName { get; set; }

    [JsonPropertyName("gender")]
    public string Gender { get; set; }

    [JsonPropertyName("homePhone")]
    public string HomePhone { get; set; }

    [JsonPropertyName("id")]
    public int Id { get; set; }

    [JsonPropertyName("imageUrl")]
    public string ImageUrl { get; set; }

    [JsonPropertyName("joinDate")]
    public DateTime JoinDate { get; set; }

    [JsonPropertyName("lastFirst")]
    public string LastFirst { get; set; }

    [JsonPropertyName("lastName")]
    public string LastName { get; set; }

    //[JsonPropertyName("localBoards")]
    // public List<LocalBoard> LocalBoards { get; set; }

    [JsonPropertyName("mandatoryHotlineLetter")]
    public bool MandatoryHotlineLetter { get; set; }

    [JsonPropertyName("memberType")]
    public string MemberType { get; set; }

    [JsonPropertyName("minnesotaLicense")]
    public object MinnesotaLicense { get; set; }

    // [JsonPropertyName("myLocalBoard")]
    // public MyLocalBoard MyLocalBoard { get; set; }

    [JsonPropertyName("nrdsId")]
    public string NrdsId { get; set; }

    [JsonPropertyName("paidThruDate")]
    public DateTime PaidThruDate { get; set; }

    [JsonPropertyName("prefix")]
    public string Prefix { get; set; }

    [JsonPropertyName("stateProvince")]
    public string StateProvince { get; set; }

    [JsonPropertyName("subscriptions")]
    public List<object> Subscriptions { get; set; }

    [JsonPropertyName("suffix")]
    public string Suffix { get; set; }

    [JsonPropertyName("workPhone")]
    public string WorkPhone { get; set; }

    [JsonPropertyName("zip")]
    public string Zip { get; set; }
}
