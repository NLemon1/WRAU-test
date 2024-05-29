using System.Net;
using MapsterMapper;
using Newtonsoft.Json;
using Umbraco.Cms.Core.Mapping;
using WRA.Umbraco.Web.Dtos.External;
using WRA.Umbraco.Web.Dtos.Member;

namespace WRA.Umbraco.Web.Services;

public class CourseService(
    WraExternalApiService wraExternalApiService,
    IUmbracoMapper mapper)
{
    public async Task<List<CourseDto>> GetRequiredCourses(string ExternalId)
    {
        var response = await wraExternalApiService.GetRequiredCourses(ExternalId);
        if (response.StatusCode != HttpStatusCode.OK) return [];

        var products = JsonConvert.DeserializeObject<List<ExternalProductDto>>(response.Content);
        return products.ConvertAll(mapper.Map<CourseDto>);
    }
}