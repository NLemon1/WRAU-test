namespace WRA.Umbraco.Web.Dtos.External;

public class ExternalMemberGroupDto
{
    public Guid Id { get; set; }
    public string Type { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public bool IsMember { get; set; }
}