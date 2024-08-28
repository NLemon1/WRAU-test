using Umbraco.Cms.Core.Mapping;
using Umbraco.Cms.Core.Models;
using WRA.Umbraco.Extensions;
using WRA.Umbraco.Helpers.Constants;
using WRA.Umbraco.Models.Custom.ViewModels.Entity;

namespace WRA.Umbraco.Mapping;
internal class MemberGroupMapping : IMapDefinition
{
    public void DefineMaps(IUmbracoMapper mapper)
    {
        mapper.Define<IMemberGroup, MemberGroupViewModel>((_, _) => new MemberGroupViewModel(), IMemberGroupToViewModel);
    }

    private void IMemberGroupToViewModel(IMemberGroup source, MemberGroupViewModel target, MapperContext context)
    {
        target.Id = source.Id;
        target.Type = source.Name;
        target.Description = source.Name;
        target.IsMember = true;

        // Cast to MemberGroup to access Properties
        if (source is MemberGroup memberGroup)
        {
            string? externalIdProperty = memberGroup.AdditionalData.FirstOrDefault(p => p.Key == GlobalConstants.ExternalId).Value as string;
            if (externalIdProperty != null && Guid.TryParse(externalIdProperty, out Guid externalId))
            {
                target.ExternalId = externalId;
            }
        }
    }
}
