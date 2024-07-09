namespace WRA.Umbraco.Web.Dtos.External;

public class ExternalCourseProgressDto
{
    public string Id { get; set; } = string.Empty;
    public string MemberId { get; set; } = string.Empty;
    public bool MemberIsAdmin { get; set; }
    public string AdminId { get; set; } = string.Empty;
    public string CourseId { get; set; } = string.Empty;
    public string CourseToken { get; set; } = string.Empty;
    public string CourseType { get; set; } = string.Empty;
    public bool IsExamOnly { get; set; }
    public bool CourseHasCertificate { get; set; }
    public int TrackPercentComplete { get; set; }
    public string CourseGroupId { get; set; } = string.Empty;
    public string CourseGroupTitle { get; set; } = string.Empty;
    public int CourseGroupSortSequence { get; set; }
    public string CourseTitle { get; set; } = string.Empty;
    public string CourseSubtitle { get; set; } = string.Empty;
    public string CourseDescription { get; set; } = string.Empty;
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
    public string ExtensionProductCode { get; set; } = string.Empty;
    public string ExternalRequirements { get; set; } = string.Empty;
    public string NotificationMessage { get; set; } = string.Empty;
    public string NotificationColor { get; set; } = string.Empty;
    public int NotificationSort { get; set; }
}