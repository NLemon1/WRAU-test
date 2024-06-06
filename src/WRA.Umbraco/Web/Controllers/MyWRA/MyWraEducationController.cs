using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ViewEngines;
using Microsoft.Extensions.Logging;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Core.Security;
using Umbraco.Cms.Core.Web;
using Umbraco.Cms.Web.Common.Controllers;
using WRA.Umbraco.Models;
using WRA.Umbraco.Web.Dtos.External;
using WRA.Umbraco.Web.Dtos.Member;
using WRA.Umbraco.Web.Services;

namespace WRA.Umbraco.Web.Controllers.MyWRA;
public class MyWraEducationController(
    ILogger<RenderController> logger,
    ICompositeViewEngine compositeViewEngine,
    IUmbracoContextAccessor umbracoContextAccessor,
    IMemberManager memberManager,
    IPublishedValueFallback publishedValueFallback,
    CourseService courseService,
    MemberOrderHistoryService memberOrderHistoryService
    )
    : RenderController(logger, compositeViewEngine, umbracoContextAccessor)
{

    public override IActionResult Index()
    {
        List<OrderHistoryDto> orderHistory;
        var currentMember = memberManager.GetCurrentMemberAsync().GetAwaiter().GetResult();
        if (currentMember == null) return Redirect("/login");

        var publishedMember = memberManager.AsPublishedMember(currentMember);
        var member = new Member(publishedMember, new NoopPublishedValueFallback());

        if (member.ExternalId == null) return Redirect("/login");
        orderHistory = memberOrderHistoryService.GetMemberOrderHistory(member.ExternalId).GetAwaiter()
            .GetResult();

        var courseProgressResponse = GetCourseProgress(member).GetAwaiter().GetResult() ?? [];
        var requiredCoursesResponse = GetRequiredCourses(member).GetAwaiter().GetResult() ?? [];
        // var completedCourses = courseService.GetCompletedCourses(member.ExternalId).GetAwaiter().GetResult() ?? [];

        var now = DateTime.Now;
        const int archivedCourseExpirationThresholdDays = 90;
        var archivedCourses = courseProgressResponse
            .Where(cp => !cp.Completed && cp.GoodThroughDate.AddDays(archivedCourseExpirationThresholdDays) < now)
            .ToList();
        var currentCourses = courseProgressResponse
            .Where(c => !c.Completed && c.GoodThroughDate > now)
            .ToList();
        var requiredCourses = requiredCoursesResponse.Where(rq => !rq.Status.Equals("Complete")).ToList();

        MywraEducation viewModel = new(CurrentPage!, publishedValueFallback)
        {
            Orders = orderHistory,
            RequiredCourses = requiredCourses,
            CurrentCourses = currentCourses,
            // CompletedCourses = completedCourses,
            ArchivedCourses = archivedCourses
        };
        return CurrentTemplate(viewModel);
    }

    public async Task<List<CourseDto>?> GetRequiredCourses(Member member)
    {
        // call WRA's api to get member courses
        var requiredCourses = await courseService.GetRequiredCourses(member.ExternalId);
        return requiredCourses;
    }

    public async Task<List<ExternalCourseProgressDto>> GetCourseProgress(Member member)
    {
        // call WRA's api to get member courses
        var requiredCourses = await courseService.GetCourseProgress(member.ExternalId);
        return requiredCourses;
    }
}
