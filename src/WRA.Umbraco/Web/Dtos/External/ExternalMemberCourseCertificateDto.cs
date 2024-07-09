namespace WRA.Umbraco.Web.Dtos.External;

public class ExternalMemberCourseCertificateDto
{
    public string MemberId { get; set; } = string.Empty;
    public string MemberImisId { get; set; } = string.Empty;
    public string MemberName { get; set; } = string.Empty;
    public int ProgramId { get; set; }
    public string ProgramCode { get; set; } = string.Empty;
    public string ProgramTitle { get; set; } = string.Empty;
    public string RegistrationItem { get; set; } = string.Empty;
    public string CourseTitle { get; set; } = string.Empty;
    public DateTime? CompletionDate { get; set; }
    public int CertificateId { get; set; }
    public bool Downloadable { get; set; }
}