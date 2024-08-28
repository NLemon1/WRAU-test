using Umbraco.Cms.Core.Mapping;
using WRA.Umbraco.Extensions;
using WRA.Umbraco.Models;
using WRA.Umbraco.Models.Custom.ViewModels.Entity;
using WRA.Umbraco.Web.Dtos.External;

namespace WRA.Umbraco.Mapping;
public class BoardMapping : IMapDefinition
{
    public void DefineMaps(IUmbracoMapper mapper)
    {
        mapper.Define<Board, ExternalBoardDto>((_, _) => new ExternalBoardDto(), BoardToDto);
        mapper.Define<Board, BoardViewModel>((_, _) => new BoardViewModel(), BoardToViewModel);
    }

    private void BoardToDto(Board source, ExternalBoardDto target, MapperContext context)
    {
        target.Chapter = source.ChapterId;
        target.Id = source.ExternalId.SafeGuid();
        target.Name = source.Name;
        target.RosterOptIn = source.RosterOptIn;
        target.RosterOptInDate = source.RosterOptInDate;
    }

    private void BoardToViewModel(Board source, BoardViewModel target, MapperContext context)
    {
        target.Chapter = source.ChapterId;
        target.Id = source.ExternalId.SafeGuid();
        target.Name = source.Name;
        target.RosterOptIn = source.RosterOptIn;
        target.RosterOptInDate = source.RosterOptInDate;
    }
}