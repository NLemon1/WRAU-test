using WRA.Umbraco.Contracts;

namespace WRA.Umbraco.Web.Dtos.Member;

public class EditMemberDto : IEvent<Guid>
{
    public Guid Id { get; set; }
    // information
    public string FullName { get; set; }
    public string Address { get; set; }
    public string WorkPhone { get; set; }
    public string HomePhone { get; set; }
    public string CellPhone { get; set; }

    // settings
    public string Email { get; set; }
    public string Website { get; set; }

    //  subscriptions?


}