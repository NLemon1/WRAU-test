namespace WRA.Umbraco.Web.Dtos;

public class MemberGroupDto
{
    public Guid Id { get; set; }
    public string Type { get; set; }
    public string Description { get; set; }
    public bool IsMember { get; set; }
}