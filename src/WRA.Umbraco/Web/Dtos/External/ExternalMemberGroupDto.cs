namespace WRA.Umbraco.Web.Dtos.External;

public class ExternalMemberGroupDto
{
    public Guid Id { get; set; }
    public string Type { get; set; }
    public string Description { get; set; }
    public bool IsMember { get; set; }
}