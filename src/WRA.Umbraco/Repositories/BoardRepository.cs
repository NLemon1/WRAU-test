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
    public IContent CreateOrUpdateBoard(MemberBoardDto mb)
    {
        try
        {
            using var scope = coreScopeProvider.CreateCoreScope();
            scope.Notifications.Suppress();

            using var umbracoContextReference = umbracoContextFactory.EnsureUmbracoContext();
            var contentCache = umbracoContextReference.UmbracoContext.Content;
            var siteRoot = contentCache.GetAtRoot().FirstOrDefault();

            // first get the board page that all indivial boards will be under.
            var BoardsContainer = siteRoot?.Children
                .FirstOrDefault(x => x.ContentType.Alias == Boards.ModelTypeAlias);


            var existingBoardResult = siteRoot?.Children
                .Where(x => x.ContentType.Alias == Board.ModelTypeAlias)
                .FirstOrDefault(x => x.Value<string>(GlobalAliases.ExternalId) == mb.Id);

            var board = existingBoardResult != null ?
                contentService.GetById(existingBoardResult.Id):
                contentService.Create(mb.Name, BoardsContainer.Id, Board.ModelTypeAlias);


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

        var boardContainer = content.FirstOrDefault(x =>
            x.ContentType.Alias == Boards.ModelTypeAlias);

        var board = boardContainer?.Children.FirstOrDefault(x =>
            x.Value<Guid>(GlobalAliases.ExternalId).Equals(externalId));

        scope.Complete();
        return board == null ? null : contentService.GetById(board.Id);
    }
    // add a delete

}