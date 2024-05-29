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

        var products = JsonSerializer.Deserialize<List<ExternalCourseDto>>(response.Content, SerializationOptions);
        return products.ConvertAll(mapper.Map<CourseDto>);
    }
}