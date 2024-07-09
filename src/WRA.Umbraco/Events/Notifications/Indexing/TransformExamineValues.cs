using Examine;
using Umbraco.Cms.Core;
using Umbraco.Cms.Core.Web;
using WRA.Umbraco.Models;
using System.Text;
using Microsoft.Extensions.Logging;
using Umbraco.Cms.Core.Models.PublishedContent;

namespace WRA.Umbraco.Events;

public class TransformExamineValues(IExamineManager examineManager, IUmbracoContextFactory umbracoContextFactory, ILogger<TransformExamineValues> logger)
{
    private readonly IExamineManager _examineManager = examineManager ?? throw new ArgumentNullException(nameof(examineManager));
    private readonly IUmbracoContextFactory _umbracoContextFactory = umbracoContextFactory ?? throw new ArgumentNullException(nameof(umbracoContextFactory));
    private readonly ILogger<TransformExamineValues> _logger = logger ?? throw new ArgumentNullException(nameof(logger));

    public void SetCategoriesOnProducts()
    {
        // Listen for nodes being reindexed in the external index set
        if (_examineManager.TryGetIndex("ExternalIndex", out IIndex? index))
        {
            try
            {
                ((BaseIndexProvider)index).TransformingIndexValues += (object? sender, IndexingItemEventArgs e) =>
                {
                    ArgumentNullException.ThrowIfNull(e);

                    var values = e.ValueSet.Values.ToDictionary(x => x.Key, x => (IEnumerable<object>)x.Value);

                    // ================================================================
                    // Make product categories searchable
                    // ================================================================

                    // Make sure node is a product page node
                    if (e.ValueSet.ItemType.InvariantEquals(ProductPage.ModelTypeAlias)
                        || e.ValueSet.ItemType.InvariantEquals(MultiVariantProductPage.ModelTypeAlias)
                            || e.ValueSet.ItemType.InvariantEquals(BundlePage.ModelTypeAlias))
                    {
                        // Make sure some categories are defined
                        if (e.ValueSet.Values.ContainsKey("categories"))
                        {
                            // Prepare a new collection for category aliases
                            var categoryAliases = new List<string>();

                            // Parse the comma separated list of category UDIs
                            var categoryIds = e.ValueSet.GetValue("categories").ToString().Split(',')
                                .Select(x => UdiParser.TryParse<GuidUdi>(x, out var id) ? id : null)
                                .Where(x => x != null)
                                .ToList();

                            // Fetch the category nodes and extract the category alias, adding it to the aliases collection
                            using (var ctx = _umbracoContextFactory.EnsureUmbracoContext())
                            {
                                foreach (var categoryId in categoryIds)
                                {
                                    if (categoryId == null) continue;
                                    var category = ctx.UmbracoContext.Content.GetById(categoryId);
                                    if (category?.UrlSegment != null)
                                    {
                                        categoryAliases.Add(category.UrlSegment);
                                    }
                                }
                            }

                            // If we have some aliases, add these to the Lucene index in a searchable way
                            if (categoryAliases.Count > 0)
                            {
                                SetOrUpdateExamineValue(values, "subCategoryAliases", string.Join(" ", categoryAliases));

                                // values.Add("categoryAliases", new[] { string.Join(" ", categoryAliases) });
                            }
                        }

                        if (e.ValueSet.Values.ContainsKey("subCategories"))
                        {
                            // Prepare a new collection for category aliases
                            var subCategoryAliases = new List<string>();

                            // Parse the comma separated list of category UDIs
                            var subCategoryIds = e.ValueSet.GetValue("subCategories").ToString().Split(',')
                                .Select(x => UdiParser.TryParse<GuidUdi>(x, out GuidUdi? id) ? id : null)
                                .Where(x => x != null)
                                .ToList();

                            // Fetch the category nodes and extract the category alias, adding it to the aliases collection
                            using (var ctx = _umbracoContextFactory.EnsureUmbracoContext())
                            {
                                foreach (var subCategoryId in subCategoryIds.Where(s => s != null))
                                {
                                    if (subCategoryId == null) continue;

                                    IPublishedContent? subCategory = ctx.UmbracoContext.Content.GetById(subCategoryId);

                                    if (subCategory?.UrlSegment != null)
                                    {
                                        subCategoryAliases.Add(subCategory.UrlSegment);
                                    }
                                }
                            }

                            // If we have some aliases, add these to the Lucene index in a searchable way
                            if (subCategoryAliases.Count > 0)
                            {
                                SetOrUpdateExamineValue(values, "subCategoryAliases", string.Join(" ", subCategoryAliases));
                            }
                        }
                    }

                    // ================================================================
                    // Do some generally useful modifications
                    // ================================================================

                    // Create searchable path
                    if (e.ValueSet.Values.ContainsKey("path"))
                    {
                        SetOrUpdateExamineValue(values, "subCategoryAliases", [e.ValueSet.GetValue("path").ToString().Replace(',', ' ')]);
                    }

                    // Stuff all the fields into a single field for easier searching
                    var combinedFields = new StringBuilder();

                    foreach (var kvp in e.ValueSet.Values)
                    {
                        foreach (object? value in kvp.Value)
                        {
                            combinedFields.AppendLine(value.ToString());
                        }
                    }

                    SetOrUpdateExamineValue(values, "contents", [combinedFields.ToString()]);

                    // Update the value
                    e.SetValues(values);
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to set categories on products.");
                throw;
            }
        }
    }

    private static void SetOrUpdateExamineValue(Dictionary<string, IEnumerable<object>> values, string key, string value)
    {
        values[key] = [value];
    }

    private static void SetOrUpdateExamineValue(Dictionary<string, IEnumerable<object>> values, string key, string[] value)
    {
        SetOrUpdateExamineValue(values, key, string.Join(" ", value));
    }
}
