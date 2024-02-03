using Newtonsoft.Json;

namespace WRA.Umbraco.Dtos;
// public class LocalBoard
// {
//     [JsonProperty("chapter")]
//     public string Chapter { get; set; }

//     [JsonProperty("id")]
//     public string Id { get; set; }

//     [JsonProperty("localBoardName")]
//     public string LocalBoardName { get; set; }

//     [JsonProperty("rosterOptIn")]
//     public bool RosterOptIn { get; set; }

//     [JsonProperty("rosterOptInDate")]
//     public DateTime RosterOptInDate { get; set; }
// }

// public class MyLocalBoard
// {
//     [JsonProperty("chapter")]
//     public string Chapter { get; set; }

//     [JsonProperty("id")]
//     public string Id { get; set; }

//     [JsonProperty("localBoardName")]
//     public string LocalBoardName { get; set; }

//     [JsonProperty("rosterOptIn")]
//     public bool RosterOptIn { get; set; }

//     [JsonProperty("rosterOptInDate")]
//     public DateTime RosterOptInDate { get; set; }
// }
public class MemberDto
{
    [JsonProperty("address1")]
    public string Address1 { get; set; }

    [JsonProperty("address2")]
    public string Address2 { get; set; }

    [JsonProperty("address3")]
    public string Address3 { get; set; }

    [JsonProperty("brokerEmail")]
    public string BrokerEmail { get; set; }

    [JsonProperty("brokerFullName")]
    public string BrokerFullName { get; set; }

    [JsonProperty("canUseHotline")]
    public bool CanUseHotline { get; set; }

    [JsonProperty("cellPhone")]
    public string CellPhone { get; set; }

    [JsonProperty("city")]
    public string City { get; set; }

    [JsonProperty("companyId")]
    public int CompanyId { get; set; }

    [JsonProperty("companyLogoUrl")]
    public string CompanyLogoUrl { get; set; }

    [JsonProperty("companyName")]
    public string CompanyName { get; set; }

    [JsonProperty("companySubscriptions")]
    public List<object> CompanySubscriptions { get; set; }

    [JsonProperty("email")]
    public string Email { get; set; }

    [JsonProperty("fairhavenDate")]
    public object FairhavenDate { get; set; }

    [JsonProperty("fax")]
    public string Fax { get; set; }

    [JsonProperty("firstName")]
    public string FirstName { get; set; }

    [JsonProperty("fullName")]
    public string FullName { get; set; }

    [JsonProperty("gender")]
    public string Gender { get; set; }

    [JsonProperty("homePhone")]
    public string HomePhone { get; set; }

    [JsonProperty("id")]
    public int Id { get; set; }

    [JsonProperty("imageUrl")]
    public string ImageUrl { get; set; }

    [JsonProperty("joinDate")]
    public DateTime JoinDate { get; set; }

    [JsonProperty("lastFirst")]
    public string LastFirst { get; set; }

    [JsonProperty("lastName")]
    public string LastName { get; set; }

    //[JsonProperty("localBoards")]
    // public List<LocalBoard> LocalBoards { get; set; }

    [JsonProperty("mandatoryHotlineLetter")]
    public bool MandatoryHotlineLetter { get; set; }

    [JsonProperty("memberType")]
    public string MemberType { get; set; }

    [JsonProperty("minnesotaLicense")]
    public object MinnesotaLicense { get; set; }

    // [JsonProperty("myLocalBoard")]
    // public MyLocalBoard MyLocalBoard { get; set; }

    [JsonProperty("nrdsId")]
    public string NrdsId { get; set; }

    [JsonProperty("paidThruDate")]
    public DateTime PaidThruDate { get; set; }

    [JsonProperty("prefix")]
    public string Prefix { get; set; }

    [JsonProperty("stateProvince")]
    public string StateProvince { get; set; }

    [JsonProperty("subscriptions")]
    public List<object> Subscriptions { get; set; }

    [JsonProperty("suffix")]
    public string Suffix { get; set; }

    [JsonProperty("workPhone")]
    public string WorkPhone { get; set; }

    [JsonProperty("zip")]
    public string Zip { get; set; }
}
