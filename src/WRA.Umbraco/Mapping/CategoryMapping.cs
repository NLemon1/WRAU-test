using Umbraco.Cms.Core.Mapping;
using Umbraco.Cms.Core.Models;
using WRA.Umbraco.Contracts.Product;
using WRA.Umbraco.Dtos;
using WRA.Umbraco.Extensions;
using WRA.Umbraco.Helpers;
using WRA.Umbraco.Web.Dtos.External;

namespace WRA.Umbraco.Mapping;

public class CategoryMapping: IMapDefinition
{
    public void DefineMaps(IUmbracoMapper mapper)
    {
        mapper.Define<IContent, ExternalProductCategoryDto>((_, _) => new ExternalProductCategoryDto(), CategoryContentToDto);
        mapper.Define<IContent, ProductCategoryEvent>((_, _) => new ProductCategoryEvent(), CategoryContentToEvent);

        mapper.Define<ExternalProductCategoryDto, ProductCategoryEvent>((_, _) => new ProductCategoryEvent(), CategoryDtoToEvent);
    }

    private void CategoryContentToDto(IContent source, ExternalProductCategoryDto target, MapperContext _)
    {
        target.Id = source.GetValue<Guid>(GlobalAliases.ExternalId).SafeGuid();
        target.Name = source.Name;
        target.Description = source.GetValue<string>("description");
    }
    private void CategoryContentToEvent(IContent source, ProductCategoryEvent target, MapperContext _)
    {
        target.Id = source.GetValue<Guid>(GlobalAliases.ExternalId).SafeGuid();
        target.Name = source.Name;
        target.Description = source.GetValue<string>("description");
    }

    private void CategoryDtoToEvent (ExternalProductCategoryDto source, ProductCategoryEvent Target, MapperContext _)
    {
        Target.Id = source.Id;
        Target.Name = source.Name;
        Target.Description = source.Description;
    }
}