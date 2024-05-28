namespace WRA.Umbraco.Web.Dtos.Member;

public class CourseDto
{
    public Guid CourseProductKey { get; set; }
    public DateTime GoodThruDate { get; set; }
    public string Name { get; set; }
    public string Location { get; set; }
    public int SortSequence { get; set; }
    public int UnitsRequired { get; set; }
}