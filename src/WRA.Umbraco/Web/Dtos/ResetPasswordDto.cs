namespace WRA.Umbraco.Web.Dtos;
public record ResetPasswordDto
{
    public string? email { get; set; }
    public string? token { get; set; }
    public string? userid { get; set; }
    public string? NewPassword { get; set; }
    public string? confirmPassword { get; set; }
}