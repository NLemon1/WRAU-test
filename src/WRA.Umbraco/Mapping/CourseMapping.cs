using Umbraco.Cms.Core.Mapping;
using Umbraco.Cms.Core.Web;
using WRA.Umbraco.Models;
using WRA.Umbraco.Web.Dtos.External;
using WRA.Umbraco.Web.Dtos.Member;

namespace WRA.Umbraco.Mapping;

public class CourseMapping(
    MappingHelper mappingHelper,
    IUmbracoContextFactory contextFactory
) : IMapDefinition
{
    public void DefineMaps(
        IUmbracoMapper mapper)
    {
        mapper.Define<ExternalCourseDto, CourseDto>((_, _) => new CourseDto(), ExternalCourseToCourseDto);

    }

    private void ExternalCourseToCourseDto(ExternalCourseDto source, CourseDto target, MapperContext _)
    {
        target.CourseProduct =
            mappingHelper.FindRelatedContentByExternalId(source.ProductId, ProductPage.ModelTypeAlias);
        target.GoodThruDate = source.GoodThruDate ?? DateTime.MinValue;
        target.Name = source.Program;
        target.Location = source.Location;
        target.SortSequence = source.SortSequence;
        target.UnitsRequired = source.UnitsRequired ?? 0;
        target.Status = source.Status;
        target.CourseLauncherUrl = source.CourseLauncherUrl;
    }
}