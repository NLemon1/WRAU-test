using System.Text.Json.Serialization;
using WRA.Umbraco.Contracts;

namespace WRA.Umbraco.Models.Custom.Events;


public record Member : IMemberEvent
{
    public string iMISId { get; set; }
    public string NrdsId { get; set; }
    public int CommonId { get; set; }
    public string PasswordHash { get; set; }
    public string PasswordSalt { get; set; }
    public string UserName { get; set; }
    public string Prefix { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Suffix { get; set; }
    public string FullName { get; set; }
    public string LastFirst { get; set; }
    public string Address1 { get; set; }
    public string Address2 { get; set; }
    public string Address3 { get; set; }
    public string City { get; set; }
    public string StateProvince { get; set; }
    public string Zip { get; set; }
    public string Email { get; set; }
    public string MarketingEmail { get; set; }
    public string CompanyName { get; set; }
    public string BrokerFullName { get; set; }
    public string BrokerEmail { get; set; }
    public string HomePhone { get; set; }
    public string WorkPhone { get; set; }
    public string CellPhone { get; set; }
    public Guid MemberTypeId { get; set; }
    public string ImageUrl { get; set; }
    public bool MandatoryHotlineLetter { get; set; }
    public bool CanUseHotline { get; set; }
    public string Fax { get; set; }
    public string Gender { get; set; }
    public string MinnesotaLicense { get; set; }
    public DateTime? JoinDate { get; set; }
    public Guid? PrimaryLocalBoardId { get; set; }
    public string CompanyLogoUrl { get; set; }
    public Guid? CompanyId { get; set; }
    public DateTime? PaidThruDate { get; set; }
    public DateTime? FairhavenDate { get; set; }
    public List<DomainEvent> DomainEvents { get; }
}