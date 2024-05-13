using System.Web.Http;
using Microsoft.AspNetCore.Mvc;
using Umbraco.Cms.Api.Common.Attributes;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Core.Web;
using Umbraco.Cms.Web.Common;
using WRA.Umbraco.Dtos;
using WRA.Umbraco.Dtos.Hottips;
using WRA.Umbraco.Dtos.LegalUpdates;
using WRA.Umbraco.Extensions;
using WRA.Umbraco.Models;
using WRA.Umbraco.Web.Services;

namespace WRA.Umbraco.Web.Controllers.Api;

[ApiController]
[MapToApi("content-api")]
public class ContentApiController(
    SearchService searchService)
    : ApiController
{

    [HttpPost]
    [Route("NewsAndUpdates")]
    public NewsAndUpdatesResponseDto GetNewsAndUpdates(NewsRecordRequest request)
    {
        // broad initial search
        var (rawResults, _) = ConductSearch(Article.ModelTypeAlias, request.SearchPhrase);

        // cast search to strongly typed object
        var responseResults = rawResults
            .Select(result => new Article(result.Content, new NoopPublishedValueFallback()));

        // filtering
        if (!string.IsNullOrEmpty(request.Category))
        {
            responseResults = responseResults.Where(rr => CategoryMatch(rr.Category.Name, request.Category));
        }

        // cast and paginate to DTO response
        var paginatedResults = responseResults
            .OrderBy(p => p.Date).Reverse()
            .Paginate<Article>(request.Pagination)
            .Select(r => r.AsDto());

        SearchResultsDto SearchInfo = new(responseResults.Count());
        return new NewsAndUpdatesResponseDto(paginatedResults, SearchInfo);
    }

    [HttpPost]
    [Route("HotTips")]
    public HotTipResponseDto GetHotTips(HotTipRequestDto request)
    {
        var (rawResults, _) = ConductSearch(HotTipEntry.ModelTypeAlias);

        var responseResults = rawResults
                .Select(result => new HotTipEntry(result.Content, new NoopPublishedValueFallback()));

        // check if there are any requested categories...
        if (request.Categories?.Any() ?? false)
        {
            // if so, do a match
            responseResults = responseResults.Where(rr => CategoryMatch(rr.Category, request.Categories));
            if (request.SubCategories.Any())
            {
                responseResults = responseResults.Where(rr => CategoryMatch(rr.Subcategories, request.SubCategories));
            }
        }

        IEnumerable<HotTipDto> paginatedResults = responseResults
            .Paginate<HotTipEntry>(request.Pagination)
            .Select(r => r.AsDto());

        SearchResultsDto searchInfo = new(responseResults.Count());
        return new HotTipResponseDto(paginatedResults, searchInfo);
    }

    [HttpPost]
    [Route("LegalUpdates")]
    public LegalUpdateResponseDto GetLegalUpdates(LegalUpdateRequestDto request)
    {
        var (rawResults, _) = ConductSearch(LegalUpdate.ModelTypeAlias);

        var responseResults = rawResults
            .Select(result => new LegalUpdate(result.Content, new NoopPublishedValueFallback()));

        // check if there are any requested years
        if (!string.IsNullOrEmpty(request.Year))
        {
            // if so, filter by year
            responseResults = responseResults.Where(r => r.OriginalPublishDate.Year == Convert.ToInt32(request.Year));
        }

        if (request.Topics?.Any() ?? false)
        {
            responseResults = responseResults.Where(r => CategoryMatch(r.Topics, request.Topics));
        }

        IEnumerable<LegalUpdateDto> paginatedResults = responseResults
            .Paginate<LegalUpdate>(request.Pagination)
            .Select(r => r.AsDto());

        SearchResultsDto searchInfo = new(responseResults.Count());
        return new LegalUpdateResponseDto(paginatedResults, searchInfo);
    }

    [HttpPost]
    [Route("Multimedia")]
    public MultimediaResponseDto GetMultiMedia(MultimediaRequestDto request)
    {
        // conduct search
        var (rawResults, _) = ConductSearch(MultimediaItem.ModelTypeAlias, request.SearchPhrase);
        var responseResults = rawResults
            .Select(result => new MultimediaItem(result.Content, new NoopPublishedValueFallback()));
        if (!string.IsNullOrEmpty(request.MediaType))
        {
            responseResults = responseResults.Where(rr => CategoryMatch(rr.MediaType, request.MediaType));
        }

        // if request is for "all" then we return playlists
        if (string.IsNullOrEmpty(request.SearchPhrase))
        {
            List<MultimediaDto> mmResponseItems = new();
            List<int> itemsAddedToCollection = new();
            foreach (var mmItem in responseResults)
            {
                if (mmItem.Children.Any())
                {
                    List<MultimediaDto> childMediaItems = new();

                    // we got a playlist on our hands
                    foreach (var child in mmItem.Children)
                    {
                        var mmChild = new MultimediaItem(child, new NoopPublishedValueFallback());
                        childMediaItems.Add(mmChild.AsDto());
                        itemsAddedToCollection.Add(mmChild.Id);
                    }

                    mmResponseItems.Add(mmItem.AsDto(childMediaItems));
                }
                else
                {
                    if (!itemsAddedToCollection.Contains(mmItem.Id))
                    {
                        mmResponseItems.Add(mmItem.AsDto());
                    }
                }
            }

            var paginatedResults = mmResponseItems
                .OrderByDescending(mmri => mmri.Date)
                .Paginate(request.Pagination);

            return new MultimediaResponseDto(
                paginatedResults,
                new SearchResultsDto(responseResults.Count()));
        }
        else
        {
            // paginate and convert to a DTO
            var paginatedResults = responseResults
                .OrderByDescending(rr => rr.Date)
                .Paginate(request.Pagination)
                .Select(r => r.AsDto())
                .Where(r => !r.IsPlaylist);

            return new MultimediaResponseDto(
                paginatedResults,
                new SearchResultsDto(responseResults.Count()));
        }
    }


    private (IEnumerable<PublishedSearchResult>, int) ConductSearch(string nodeAlias, string searchPhrase = "")
    {
        var rawResults = searchService
                    .Search(nodeAlias, searchPhrase);
        return (rawResults, rawResults.Count());
    }

    private static bool CategoryMatch(string? resultCategory, string category)
    {
        if (resultCategory == null) { return false; }
        return resultCategory.Equals(category, StringComparison.OrdinalIgnoreCase);
    }

    private static bool CategoryMatch(IEnumerable<IPublishedContent> resultSubCategories, IEnumerable<string> requestSubcategories)
    {
        if (resultSubCategories == null || !resultSubCategories.Any()) { return false; }
        var subcategories = resultSubCategories.Select(x => x.Name);
        return subcategories.ContainsAny(requestSubcategories);
    }

}