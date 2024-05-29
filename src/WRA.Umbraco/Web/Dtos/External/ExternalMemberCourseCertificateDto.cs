public class ExternalMemberCourseCertificateDto
{
    public string MemberId { get; set; }
    public string MemberImisId { get; set; }
    public string MemberName { get; set; }
    public int ProgramId { get; set; }
    public string ProgramCode { get; set; }
    public string ProgramTitle { get; set; }
    public string RegistrationItem { get; set; }
    public string CourseTitle { get; set; }
    public DateTime? CompletionDate { get; set; }
    public int CertificateId { get; set; }
    public bool Downloadable { get; set; }
}