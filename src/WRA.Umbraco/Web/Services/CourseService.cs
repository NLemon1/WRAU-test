using System.Net;
using System.Text.Json;
using Umbraco.Cms.Core.Mapping;
using WRA.Umbraco.Web.Dtos.External;
using WRA.Umbraco.Web.Dtos.Member;

namespace WRA.Umbraco.Web.Services;

public class CourseService(
    WraExternalApiService wraExternalApiService,
    IUmbracoMapper mapper)
{
    private static readonly JsonSerializerOptions SerializationOptions = new()
    {
        PropertyNameCaseInsensitive = true
    };
    public async Task<List<CourseDto?>> GetRequiredCourses(string ExternalId)
    {
        var response = await wraExternalApiService.GetRequiredCourses(ExternalId);
        if (response.StatusCode != HttpStatusCode.OK) return [];
        if (response.Content == null) return [];
        var courses = JsonSerializer.Deserialize<List<ExternalCourseDto>>(response.Content, SerializationOptions);
        return courses.ConvertAll(mapper.Map<CourseDto>);
    }

    // apply translation layer for this
    public async Task<List<ExternalCourseProgressDto>?> GetCourseProgress(string ExternalId)
    {
        var response = await wraExternalApiService.GetMemberCourseProgress(ExternalId);
        if (response.StatusCode != HttpStatusCode.OK) return [];
        if (response.Content == null) return [];
        var courses = JsonSerializer.Deserialize<List<ExternalCourseProgressDto>>(response.Content, SerializationOptions);
        return courses;
    }

    public async Task<List<ExternalMemberCourseCertificateDto>?> GetCompletedCourses(string ExternalId)
    {
        var response = await wraExternalApiService.GetMemberCourseCertificates(ExternalId);
        if (response.StatusCode != HttpStatusCode.OK) return [];
        if (response.Content == null) return [];
        var courses = JsonSerializer.Deserialize<List<ExternalMemberCourseCertificateDto>>(response.Content, SerializationOptions);
        return courses;
    }
}