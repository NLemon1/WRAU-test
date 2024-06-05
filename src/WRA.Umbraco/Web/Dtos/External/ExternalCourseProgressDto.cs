public class ExternalCourseProgressDto
{
    public string Id { get; set; }
    public string MemberId { get; set; }
    public bool MemberIsAdmin { get; set; }
    public string AdminId { get; set; }
    public string CourseId { get; set; }
    public string CourseToken { get; set; }
    public string CourseType { get; set; }
    public bool IsExamOnly { get; set; }
    public bool CourseHasCertificate { get; set; }
    public int TrackPercentComplete { get; set; }
    public string CourseGroupId { get; set; }
    public string CourseGroupTitle { get; set; }
    public int CourseGroupSortSequence { get; set; }
    public string CourseTitle { get; set; }
    public string CourseSubtitle { get; set; }
    public string CourseDescription { get; set; }
    public int CourseSortSequence { get; set; }
    public DateTime? StartDate { get; set; }
    public DateTime? OriginalGoodThroughDate { get; set; }
    public DateTime GoodThroughDate { get; set; }
    public DateTime? LastAccessedDate { get; set; }
    public int PercentComplete { get; set; }
    public bool Completed { get; set; }
    public DateTime? CompletedDate { get; set; }
    public int CertificateSequence { get; set; }
    public bool IsExtendable { get; set; }
    public int ExtensionWindow { get; set; }
    public int ExtensionDays { get; set; }
    public string ExtensionProductCode { get; set; }
    public string ExternalRequirements { get; set; }
    public string NotificationMessage { get; set; }
    public string NotificationColor { get; set; }
    public int NotificationSort { get; set; }
}