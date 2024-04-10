using Umbraco.Cms.Core.Models;
using Umbraco.Cms.Core.PublishedCache;
using Umbraco.Cms.Core.Services;
using WRA.Umbraco.Dtos;
using WRA.Umbraco.Models;

namespace WRA.Umbraco.Helpers;

public class BoardRepository(IContentService contentService)
{
    public IContent CreateOrUpdateBoard(MemberBoardDto mb, IPublishedContentCache contentCache)
    {
        var siteRoot = contentCache.GetAtRoot().FirstOrDefault();

        // first get the board page that all indivial boards will be under.
        var BoardsContainer = siteRoot?.Children
            .FirstOrDefault(x => x.ContentType.Alias == Boards.ModelTypeAlias);
        // var BoardsContainer = _searchService.Search(Boards.ModelTypeAlias)?
        //     .FirstOrDefault()?
        //     .Content as Boards;

        var existingBoard = siteRoot?.Children
            .Where(x => x.ContentType.Alias == Board.ModelTypeAlias)
            .FirstOrDefault(x => x.Value("externalId") == mb.Id);

        // var existingBoard = _searchService.Search(Board.ModelTypeAlias)?
        //     .FirstOrDefault(x => x.Content.Value("externalId") == mb.Id);
        bool boardExists = existingBoard != null;

        var board = boardExists ?
            existingBoard as IContent :
            contentService.Create(mb.Name, BoardsContainer.Id, Board.ModelTypeAlias);

        board.SetValue("externalId", mb.Id);
        board.SetValue("chapterId", mb.Chapter);
        board.SetValue("rosterOptIn", mb.RosterOptIn);
        board.SetValue("rosterOptInDate", mb.RosterOptInDate);

        contentService.SaveAndPublish(board);

        return board;
    }
    // add a get
    // add a delete

}