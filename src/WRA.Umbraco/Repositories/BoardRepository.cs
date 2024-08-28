using Umbraco.Cms.Core;
using Umbraco.Cms.Core.Models;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Core.PublishedCache;
using Umbraco.Cms.Core.Scoping;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Core.Web;
using WRA.Umbraco.Exceptions;
using WRA.Umbraco.Helpers.Constants;
using WRA.Umbraco.Models;
using WRA.Umbraco.Web.Dtos.External;
using Umbraco.Extensions;

namespace WRA.Umbraco.Helpers;

public class BoardRepository
{
    private readonly IContentService _contentService;
    private readonly ICoreScopeProvider _coreScopeProvider;
    private readonly IUmbracoContextFactory _umbracoContextFactory;
    private readonly ILogger _logger;

    public BoardRepository(
        IContentService contentService,
        ICoreScopeProvider coreScopeProvider,
        IUmbracoContextFactory umbracoContextFactory,
        ILogger logger)
    {
        _contentService = contentService;
        _coreScopeProvider = coreScopeProvider;
        _umbracoContextFactory = umbracoContextFactory;
        _logger = logger.ForContext<BoardRepository>();
    }

    public IContent? CreateOrUpdateBoard(ExternalBoardDto mb)
    {
        try
        {
            using var scope = _coreScopeProvider.CreateCoreScope();
            using var umbracoContextReference = _umbracoContextFactory.EnsureUmbracoContext();
            var contentCache = umbracoContextReference.UmbracoContext.Content;
            var siteRoot = contentCache.GetAtRoot().FirstOrDefault();

            var boardContentType = contentCache.GetContentType(Board.ModelTypeAlias);
            if (boardContentType == null)
            {
                scope.Complete();
                return null;
            }

            var allBoars = contentCache.GetByContentType(boardContentType);

            // first get the board page that all individual boards will be under.
            var boardsContainer = siteRoot?.Children
                .FirstOrDefault(x => x.ContentType.Alias == Boards.ModelTypeAlias);
            if (boardsContainer == null)
            {
                scope.Complete();
                return null;
            }

            var existingBoardResult = allBoars
                .Where(x => x.ContentType.Alias == Board.ModelTypeAlias)
                .FirstOrDefault(x => x.Value<Guid>(GlobalConstants.ExternalId) == mb.Id);

            var board = existingBoardResult != null ?
                _contentService.GetById(existingBoardResult.Id) :
                _contentService.Create(mb.Name, boardsContainer.Id, Board.ModelTypeAlias);

            board.SetValue(GlobalConstants.ExternalId, mb.Id);
            board.SetValue("chapterId", mb.Chapter);
            board.SetValue("rosterOptIn", mb.RosterOptIn);
            board.SetValue("rosterOptInDate", mb.RosterOptInDate);

            _contentService.SaveAndPublish(board);
            scope.Complete();

            return board;
        }
        catch (Exception e)
        {
            _logger.Error(e, "Error creating or updating board");
            throw;
        }
    }

    // get by external id
    public IContent? Get(Guid externalId)
    {
        using var scope = _coreScopeProvider.CreateCoreScope();
        using var umbracoContextReference = _umbracoContextFactory.EnsureUmbracoContext();
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
            x.Value<Guid>(GlobalConstants.ExternalId).Equals(externalId));
        if (boardQuery == null)
        {
            scope.Complete();
            return null;
        }

        var board = _contentService.GetById(boardQuery.Id);
        scope.Complete();
        return board;
    }

    public List<Board> GetAllBoards()
    {
        ICoreScope? scope = null;
        using var activity = _logger.StartActivity(LogEventLevel.Information, "Umbraco Repository - {Repository}:{Method}", nameof(BoardRepository), nameof(GetAllBoards));
        try
        {
            scope = _coreScopeProvider.CreateCoreScope();

            List<Board> boards = GetAllBoardsFromPublishedSnapshot();

            scope.Complete();
            activity.Complete();

            return boards;
        }
        catch (Exception ex)
        {
            activity.Complete(LogEventLevel.Error, ex);
            _logger.Error(ex, "An error occurred while retrieving all boards.");
            throw new UmbracoRepositoryException($"An error occurred while retrieving all boards from {nameof(BoardRepository)}", ex);
        }
        finally
        {
            scope?.Dispose();
        }
    }

    private List<Board> GetAllBoardsFromPublishedSnapshot()
    {
        using var umbracoContextReference = _umbracoContextFactory.EnsureUmbracoContext();
        IPublishedSnapshot publishedSnapshot = umbracoContextReference.UmbracoContext.PublishedSnapshot;

        if (publishedSnapshot == null)
        {
            _logger.Warning("Published snapshot not available when trying to get all boards from Umbraco.");
            return [];
        }

        var contentType = publishedSnapshot.Content.GetContentType(Boards.ModelTypeAlias);
        if (contentType == null)
        {
            _logger.Warning("Boards content type not found when trying to get all boards.");
            return [];
        }

        var boardsContainers = publishedSnapshot.Content
            .GetByContentType(contentType)
            .ToList();

        var boards = boardsContainers
            .SelectMany(boardsContainer => boardsContainer.Children
                .Where(child => child.ContentType.Alias == Board.ModelTypeAlias)
                .Select(child => child as Board))
            .Where(board => board != null)
            .Cast<Board>()
            .ToList();

        _logger.Debug("Retrieved {Count} local boards from Umbraco.", boards.Count);

        return boards;
    }

    public OperationResult? Delete(ExternalBoardDto mb)
    {
        try
        {
            using var scope = _coreScopeProvider.CreateCoreScope();
            var existingBoard = Get(mb.Id);
            if (existingBoard == null)
            {
                scope.Complete();
                return null;
            }

            var deleteResult = _contentService.Delete(existingBoard);
            scope.Complete();
            return deleteResult;
        }
        catch (Exception e)
        {
            _logger.Error(e, "Error deleting board");
            throw;
        }
    }

    public OperationResult? Delete(Guid externalId)
    {
        try
        {
            using var scope = _coreScopeProvider.CreateCoreScope();
            var existingBoard = Get(externalId);
            if (existingBoard == null)
            {
                scope.Complete();
                return null;
            }

            var deleteResult = _contentService.Delete(existingBoard);
            scope.Complete();
            return deleteResult;
        }
        catch (Exception e)
        {
            _logger.Error(e, "Error deleting board");
            throw;
        }
    }
}