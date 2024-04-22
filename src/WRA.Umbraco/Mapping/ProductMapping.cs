using Umbraco.Cms.Core.Mapping;
using Umbraco.Cms.Core.Models;
using WRA.Umbraco.Contracts;
using WRA.Umbraco.Contracts.Product;
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
        productEvent.Id = content.GetValue<Guid>(GlobalAliases.ExternalId).SafeGuid();
        productEvent.Sku = content.GetValue<string>("sku");
        productEvent.Name = content.Name;
        productEvent.Description = content.GetValue<string>("description");
        productEvent.Price = content.GetValue<decimal>("price");
        productEvent.MemberPrice = content.GetValue<decimal>("memberPrice");
        productEvent.ImageUrl = content.GetValue<string>("imageUrl");
        productEvent.Taxonomy = content.GetValue<string>("taxonomy");
    }

    private void DtoToEvent(WraProductDto productDto, ProductEvent productEvent, MapperContext _)
    {
        productEvent.Id = productDto.Id;
        productEvent.Sku = productDto.Sku;
        productEvent.Name = productDto.Name;
        productEvent.Description = productDto.Description;
        productEvent.Price = productDto.Price;
        productEvent.MemberPrice = productDto.MemberPrice;
        productEvent.ImageUrl = productDto.ImageUrl;
        productEvent.Taxonomy = productDto.Taxonomy;
        productEvent.ProductType = productDto.ProductType;
        productEvent.Category = productDto.Category;
        productEvent.SubCategory = productDto.SubCategory;


    }
}