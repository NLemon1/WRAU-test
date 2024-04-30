using Umbraco.Cms.Core.Mapping;
using Umbraco.Cms.Core.Models;
using WRA.Umbraco.Contracts;
using WRA.Umbraco.Extensions;
using WRA.Umbraco.Web.Dtos.WraExternal;

namespace WRA.Umbraco.Mapping;

public class ProductMapping : IMapDefinition
{
    public void DefineMaps(IUmbracoMapper mapper)
    {
        // Dtos
        mapper.Define<IContent, ProductEvent>((_, _) => new ProductEvent(), ContentToProductEvent);
        mapper.Define<WraProductDto, ProductEvent>((_, _) => new ProductEvent(), DtoToEvent);
    }

    private void ContentToProductEvent(IContent content, ProductEvent productEvent, MapperContext _)
    {
        productEvent.Id = content.GetValue<Guid>(GlobalAliases.ExternalId);
        productEvent.Sku = content.GetValue<string>("sku");
        productEvent.Name = content.Name;
        productEvent.Description = content.GetValue<string>("description");
        productEvent.Price = content.GetValue<decimal>("price");
        productEvent.MemberPrice = content.GetValue<decimal>("memberPrice");
        productEvent.ImageUrl = content.GetValue<string>("imageUrl");
        productEvent.Taxonomy = content.GetValue<string>("taxonomy");
        productEvent.StartDate = GetValidDate(content.GetValue<DateTime>("startDate"));
        productEvent.EndDate = content.GetValue<DateTime>("endDate");
    }

    private void DtoToEvent(WraProductDto source, ProductEvent target, MapperContext _)
    {
        target.Id = source.Id;
        target.Sku = source.Sku;
        target.Name = source.Name;
        target.Description = source.Description;
        target.Price = source.Price;
        target.MemberPrice = source.MemberPrice;
        target.ImageUrl = source.ImageUrl;
        target.Taxonomy = source.Taxonomy;
        target.ProductType = source.ProductType;
        target.ProductTypeId = source.ProductTypeId;
        target.Category = source.Category;
        target.ProductCategoryId = source.ProductCategoryId;
        target.SubCategory = source.SubCategory;
        target.ProductSubcategoryId = source.ProductSubcategoryId;
        target.StartDate = GetValidDate(source.StartDate);
        target.EndDate = GetValidDate(source.EndDate);


    }

    private DateTime? GetValidDate(DateTime? date)
    {
        if (date == null || date <= DateTime.MinValue || date >= DateTime.MaxValue)
        {
            return null;
        }

        return date;
    }
}