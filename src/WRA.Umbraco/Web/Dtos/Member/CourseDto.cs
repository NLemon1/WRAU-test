using Umbraco.Cms.Core.Models.PublishedContent;

namespace WRA.Umbraco.Web.Dtos.Member;

public class CourseDto
{
    public string? CourseLauncherUrl { get; set; }
    public IPublishedContent? CourseProduct { get; set; }
    public DateTime GoodThruDate { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Location { get; set; } = string.Empty;
    public int SortSequence { get; set; }
    public decimal UnitsRequired { get; set; }
    public string Status { get; set; } = string.Empty;
}