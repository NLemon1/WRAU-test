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
        target.CourseProductKey = mappingHelper
            .FindRelatedContentByExternalId(source.ProductId, ProductPage.ModelTypeAlias)?.Key ?? Guid.Empty;
        target.GoodThruDate = source.GoodThruDate;
        target.Name = source.Program;
        target.Location = source.Location;
        target.SortSequence = source.SortSequence;
        target.UnitsRequired = source.UnitsRequired;
    }
}