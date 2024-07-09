namespace WRA.Umbraco.Web.Dtos.Member;

public class EditMemberDto
{
    public int MemberId { get; set; }
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string Address1 { get; set; } = string.Empty;
    public string Address2 { get; set; } = string.Empty;
    public string Address3 { get; set; } = string.Empty;
    public string City { get; set; } = string.Empty;
    public string State { get; set; } = string.Empty;
    public string ZipCode { get; set; } = string.Empty;
    public string WorkPhone { get; set; } = string.Empty;
    public string HomePhone { get; set; } = string.Empty;
    public string CellPhone { get; set; } = string.Empty;
    public string PersonalWebSite { get; set; } = string.Empty;
    public string SecondaryLanguage { get; set; } = string.Empty;
    public string AreaOfSpecialty { get; set; } = string.Empty;
    public string PrimaryCounties { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string RedirectUrl { get; set; } = string.Empty;
}