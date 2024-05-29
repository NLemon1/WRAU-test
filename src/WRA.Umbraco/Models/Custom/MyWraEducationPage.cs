using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WRA.Umbraco.Web.Dtos.External;
using WRA.Umbraco.Web.Dtos.Member;

namespace WRA.Umbraco.Models;
public partial class MywraEducation
{
    public List<OrderHistoryDto> Orders { get; set; }
    public List<CourseDto> RequiredCourses { get; set; }
    public List<ExternalCourseProgressDto> CourseProgress { get; set; }
    public List<ExternalMemberCourseCertificateDto> CompletedCourses { get; set; }
}