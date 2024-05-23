using WRA.Umbraco.Contracts;

namespace WRA.Umbraco.Web.Dtos.Member;

public class EditMemberDto
{
    public int MemberId { get; set; }
    // information
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Address1 { get; set; }
    public string Address2 { get; set; }
    public string Address3 { get; set; }
    public string City { get; set; }
    public string State { get; set; }
    public string ZipCode { get; set; }
    public string WorkPhone { get; set; }
    public string HomePhone { get; set; }
    public string CellPhone { get; set; }

    // settings
    public string Email { get; set; }

    //  subscriptions?


}