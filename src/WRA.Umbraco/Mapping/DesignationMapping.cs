using Umbraco.Cms.Core.Mapping;
using WRA.Umbraco.Extensions;
using WRA.Umbraco.Models;
using WRA.Umbraco.Models.Custom.ViewModels.Entity;
using WRA.Umbraco.Web.Dtos.External;
using WRA.UmbracoBridgeServices;

namespace WRA.Umbraco.Mapping;

public class DesignationMapping : IMapDefinition
{
    public void DefineMaps(IUmbracoMapper mapper)
    {
        mapper.Define<DesignationDto, ExternalDesignationDto>((_, _) => new ExternalDesignationDto(), DesignationDtoToExternalDto);
        mapper.Define<Designation, ExternalDesignationDto>((_, _) => new ExternalDesignationDto(), DesignationToDto);
        mapper.Define<Designation, DesignationViewModel>((_, _) => new DesignationViewModel(), DesignationToViewModel);
    }

    private void DesignationDtoToExternalDto(DesignationDto source, ExternalDesignationDto target, MapperContext context)
    {
        target.Id = source.Id;
        target.Name = source.Name;
        target.DesignationCode = source.DesignationCode;
        target.DesignationText = source.DesignationText;
        target.Description = source.Description;
        target.LongDescription = source.LongDescription;
        target.SortSeqn = source.SortSeqn;
    }

    private void DesignationToDto(Designation source, ExternalDesignationDto target, MapperContext context)
    {
        target.Description = source.Description;
        target.DesignationCode = source.Code;
        target.LongDescription = source.LongDescription;
        target.DesignationText = source.Text;
        target.Name = source.Name;
        target.Id = source.ExternalId.SafeGuid();
    }

    private void DesignationToViewModel(Designation source, DesignationViewModel target, MapperContext context)
    {
        target.Description = source.Description;
        target.DesignationCode = source.Code;
        target.LongDescription = source.LongDescription;
        target.DesignationText = source.Text;
        target.Title = source.Title;
        target.Id = source.ExternalId.SafeGuid();
    }
}