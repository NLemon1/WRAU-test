using Umbraco.Cms.Core.Mapping;
using Umbraco.Cms.Core.Models;
using WRA.Umbraco.Contracts;
using WRA.Umbraco.Extensions;
using WRA.Umbraco.Helpers.Constants;
using WRA.Umbraco.Web.Dtos.External;

namespace WRA.Umbraco.Mapping;

public class ProductMapping(
    MappingHelper mappingHelper)
    : IMapDefinition
{
    public void DefineMaps(IUmbracoMapper mapper)
    {
        // Dtos
        mapper.Define<IContent, ProductEvent>((_, _) => new ProductEvent(), ContentToProductEvent);
        mapper.Define<ExternalProductDto, ProductEvent>((_, _) => new ProductEvent(), DtoToEvent);
    }

    private void ContentToProductEvent(IContent content, ProductEvent productEvent, MapperContext _)
    {
        productEvent.Id = content.GetValue<Guid>(GlobalConstants.ExternalId);
        productEvent.Sku = content.GetValue<string>(GlobalAliases.Sku) ?? string.Empty;
        productEvent.Name = content.Name ?? string.Empty;
        productEvent.Description = content.GetValue<string>("description").SafeString();
        productEvent.NonMemberPrice = content.GetValue<decimal>("price");
        productEvent.MemberPrice = content.GetValue<decimal>("memberPrice");
        productEvent.ImageUrl = content.GetValue<string>("imageUrl").SafeString();
        productEvent.EventStartDate = GetValidDate(content.GetValue<DateTime>("startDate"));
        productEvent.EventEndDate = content.GetValue<DateTime>("endDate") <= DateTime.MinValue ? null : content.GetValue<DateTime>("endDate");
        productEvent.ProductCategoryId = mappingHelper.GetExternalIdOnContent(content, "categories").SafeGuid();
        productEvent.ProductSubcategoryId = mappingHelper.GetExternalIdOnContent(content, "subCategories").SafeGuid();
        productEvent.ProductTaxonomyId = mappingHelper.GetExternalIdOnContent(content, "productTaxonomy").SafeGuid();
        productEvent.ProductTypeId = mappingHelper.GetExternalIdOnParent(content).SafeGuid();
        productEvent.IsShippable = content.GetValue<bool>("isShippable");
        productEvent.IsTaxable = content.GetValue<bool>("isTaxable");
    }

    private void DtoToEvent(ExternalProductDto source, ProductEvent target, MapperContext _)
    {
        target.Id = source.Id;
        target.Sku = source.Sku;
        target.Name = source.Name;
        target.Description = source.Description;
        target.NonMemberPrice = source.Price;
        target.MemberPrice = source.MemberPrice;
        target.ImageUrl = source.ImageUrl;
        target.ProductTaxonomyId = source.ProductTaxonomyId;
        target.ProductTypeId = source.ProductTypeId;
        target.ProductCategoryId = source.ProductCategoryId;
        target.ProductSubcategoryId = source.ProductSubcategoryId;
        target.ProductSalesTaxCategoryCode = source.SalesTaxCategoryCode ?? string.Empty;
        target.StartDate = GetValidDate(source.StartDate);
        target.EndDate = GetValidDate(source.EndDate);
        target.IsShippable = source.IsShippable;
        target.IsTaxable = source.IsTaxable;
        target.ProductSalesTaxCategoryCode = source.SalesTaxCategoryCode ?? string.Empty;
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