using Microsoft.Extensions.Logging;
using Umbraco.Cms.Core.Models;
using Umbraco.Cms.Core.Scoping;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Core.Web;
using WRA.Umbraco.Dtos;
using WRA.Umbraco.Models;

namespace WRA.Umbraco.Helpers;

public class BoardRepository
    (IContentService contentService,
    ICoreScopeProvider coreScopeProvider,
    IUmbracoContextFactory umbracoContextFactory,
    ILogger<BoardRepository> logger)
{
    public async Task<IContent> CreateOrUpdateBoard(MemberBoardDto mb)
    {
        try
        {
            using var scope = coreScopeProvider.CreateCoreScope();
            using var umbracoContextReference = umbracoContextFactory.EnsureUmbracoContext();
            var contentCache = umbracoContextReference.UmbracoContext.Content;
            var siteRoot = contentCache.GetAtRoot().FirstOrDefault();

            var boardContentType = contentCache.GetContentType(Board.ModelTypeAlias);
            var allBoars = contentCache.GetByContentType(boardContentType);

            // first get the board page that all indivial boards will be under.
            var boardsContainer = siteRoot?.Children
                .FirstOrDefault(x => x.ContentType.Alias == Boards.ModelTypeAlias);

            var existingBoardResult = allBoars
                .Where(x => x.ContentType.Alias == Board.ModelTypeAlias)
                .FirstOrDefault(x => x.Value<Guid>(GlobalAliases.ExternalId) == mb.Id);

            var board = existingBoardResult != null ?
                contentService.GetById(existingBoardResult.Id):
                contentService.Create(mb.Name, boardsContainer.Id, Board.ModelTypeAlias);


            board.SetValue(GlobalAliases.ExternalId, mb.Id);
            board.SetValue("chapterId", mb.Chapter);
            board.SetValue("rosterOptIn", mb.RosterOptIn);
            board.SetValue("rosterOptInDate", mb.RosterOptInDate);

            contentService.SaveAndPublish(board);
            scope.Complete();

            return board;
        }
        catch (Exception e)
        {
            logger.LogError(e, "Error creating or updating board");
            throw;
        }
    }

    // get by external id
    public IContent? Get(Guid externalId)
    {
        using var scope = coreScopeProvider.CreateCoreScope();
        using var umbracoContextReference = umbracoContextFactory.EnsureUmbracoContext();
        var content = umbracoContextReference.UmbracoContext.Content.GetAtRoot();
        var home = content.FirstOrDefault();
        if (home == null)
        {
            scope.Complete();
            return null;
        }

        var boardContainer = home.Children.FirstOrDefault(x =>
            x.ContentType.Alias == Boards.ModelTypeAlias);

        var boardQuery = boardContainer?.Children.FirstOrDefault(x =>
            x.Value<Guid>(GlobalAliases.ExternalId).Equals(externalId));
        if (boardQuery == null)
        {
            scope.Complete();
            return null;
        }
        var board = contentService.GetById(boardQuery.Id);
        scope.Complete();
        return board;

    }

    // add a delete

}