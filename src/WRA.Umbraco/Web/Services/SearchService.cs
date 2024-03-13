using Examine;
using Examine.Search;
using MailKit.Search;
using Microsoft.AspNetCore.Http;
using Umbraco.Cms.Core;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Infrastructure.Examine;
using WRA.Umbraco.Models;

namespace WRA.Umbraco.Services;
public class SearchService
{
    private readonly IPublishedContentQuery _publishedContentQuery;
    private readonly IExamineManager _examineManager;

    public SearchService(
        IPublishedContentQuery publishedContentQuery,
        IExamineManager examineManager)
    {
        _publishedContentQuery = publishedContentQuery;
        _examineManager = examineManager;
    }
    public IEnumerable<PublishedSearchResult> Search(string nodeTypeAlias, string searchTerm = "")
    {
        if (!_examineManager.TryGetIndex(Constants.UmbracoIndexes.ExternalIndexName, out IIndex index))
        {
            throw new InvalidOperationException($"No index found by name{Constants.UmbracoIndexes.ExternalIndexName}");
        }

        var query = index.Searcher.CreateQuery(IndexTypes.Content);
        var queryExecutor = query.NodeTypeAlias(nodeTypeAlias);
        if (!string.IsNullOrEmpty(searchTerm))
        {
            _ = queryExecutor
                        .And()
                        .ManagedQuery(searchTerm);
        }
        foreach (var result in _publishedContentQuery.Search(queryExecutor))
        {
            yield return result;
        }
    }

    public IEnumerable<PublishedSearchResult> SearchProductBySku(string sku)
    {
        if (_examineManager.TryGetIndex(Constants.UmbracoIndexes.ExternalIndexName, out IIndex index))
        {
            var q = $"+(__NodeTypeAlias:{ProductPage.ModelTypeAlias}) +sku:{sku}";

            var searcher = index.Searcher;
            var query = searcher.CreateQuery().NativeQuery(q);

            var results = _publishedContentQuery.Search(query);
            foreach (var result in results)
            {
                yield return result;
            }

        }
    }

    public IEnumerable<PublishedSearchResult> SearchBySubCategory(GuidUdi subCategoryId, string contentAlias)
    {
        if (_examineManager.TryGetIndex(Constants.UmbracoIndexes.ExternalIndexName, out IIndex index))
        {
            var q = $"+(__NodeTypeAlias:{contentAlias})";

            if (subCategoryId != null)
            {
                q += $" +subCategories:\"{subCategoryId}\"";
            }

            var searcher = index.Searcher;
            var query = searcher.CreateQuery().NativeQuery(q);
            var results = _publishedContentQuery
                .Search(query.OrderBy(new SortableField("name", SortType.String)));

            foreach (var result in results)
            {
                yield return result;
            }
        }
    }
    public IEnumerable<PublishedSearchResult> SearchBySubCategory(string subCategoryAlias, string contentAlias)
    {
        if (_examineManager.TryGetIndex(Constants.UmbracoIndexes.ExternalIndexName, out IIndex index))
        {
            var q = $"+(__NodeTypeAlias:{contentAlias})";

            if (!subCategoryAlias.IsNullOrWhiteSpace())
            {
                q += $" +subCategoryAliases:\"{subCategoryAlias}\"";
            }

            var searcher = index.Searcher;
            var query = searcher.CreateQuery().NativeQuery(q);
            var results = _publishedContentQuery
                .Search(query.OrderBy(new SortableField("name", SortType.String)));

            foreach (var result in results)
            {
                yield return result;
            }
        }
    }
    public IEnumerable<PublishedSearchResult> SearchProductsByCategory(int? collectionId, string category)
    {

        if (_examineManager.TryGetIndex("ExternalIndex", out var index))
        {
            var q = $"+(__NodeTypeAlias:{ProductPage.ModelTypeAlias} __NodeTypeAlias:{MultiVariantProductPage.ModelTypeAlias})";

            if (collectionId.HasValue)
            {
                q += $" +searchPath:{collectionId.Value}";
            }

            if (!category.IsNullOrWhiteSpace())
            {
                q += $" +categoryAliases:\"{category}\"";
            }

            var searcher = index.Searcher;
            var query = searcher.CreateQuery().NativeQuery(q);
            var results = _publishedContentQuery
                .Search(query.OrderBy(new SortableField("name", SortType.String)));

            foreach (var result in results)
            {
                yield return result;
            }
        }
    }

    // public IEnumerable<PublishedSearchResult> SearchForMembers(string searchTerm)
    // {
    //     if (_examineManager.TryGetIndex(Constants.UmbracoIndexes.MembersIndexName, out IIndex index))
    //     {
    //         var q = $"+(__NodeTypeAlias:{MemberPage.ModelTypeAlias})";

    //         if (!searchTerm.IsNullOrWhiteSpace())
    //         {
    //             q += $" +name:{searchTerm}";
    //         }

    //         var searcher = index.Searcher;
    //         var query = searcher.CreateQuery().NativeQuery(q);
    //         var results = _publishedContentQuery
    //             .Search(query.OrderBy(new SortableField("name", SortType.String)));

    //         foreach (var result in results)
    //         {
    //             yield return result;
    //         }
    //     }
    // }

    // public IEnumerable<PublishedSearchResult> SearchProductsBySubCategory(string subCategory, int? collectionId = null)
    // {

    //     if (_examineManager.TryGetIndex("ExternalIndex", out var index))
    //     {
    //         var q = $"+(__NodeTypeAlias:{ProductPage.ModelTypeAlias} __NodeTypeAlias:{MultiVariantProductPage.ModelTypeAlias})";

    //         if (collectionId.HasValue)
    //         {
    //             q += $" +searchPath:{collectionId.Value}";
    //         }

    //         if (!subCategory.IsNullOrWhiteSpace())
    //         {
    //             q += $" +subCategoryAliases:\"{subCategory}\"";
    //         }

    //         var searcher = index.Searcher;
    //         var query = searcher.CreateQuery().NativeQuery(q);
    //         var results = _publishedContentQuery
    //             .Search(query.OrderBy(new SortableField("name", SortType.String)));

    //         foreach (var result in results)
    //         {
    //             yield return result;
    //         }

    //     }
    // }

}

