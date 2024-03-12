using Examine;
using System.Linq;
using System.Collections.Generic;
using Umbraco.Cms.Core;
using Umbraco.Cms.Core.Events;
using Umbraco.Cms.Core.Notifications;
using Umbraco.Cms.Core.Web;
using Umbraco.Extensions;
using WRA.Umbraco.Models;
using System.Text;

namespace WRA.Umbraco.Events
{
    public class TransformExamineValues
    {
        private readonly IExamineManager _examineManager;
        private readonly IUmbracoContextFactory _umbracoContextFactory;

        public TransformExamineValues(IExamineManager examineManager,
            IUmbracoContextFactory umbracoContextFactory)
        {
            _examineManager = examineManager;
            _umbracoContextFactory = umbracoContextFactory;
        }


        public void SetCategoriesOnProducts()
        {
            // Listen for nodes being reindexed in the external index set
            if (_examineManager.TryGetIndex("ExternalIndex", out var index))
            {
                try
                {

                    ((BaseIndexProvider)index).TransformingIndexValues += (object sender, IndexingItemEventArgs e) =>
                    {
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
                                        var category = ctx.UmbracoContext.Content.GetById(categoryId);
                                        if (category != null)
                                        {
                                            categoryAliases.Add(category.UrlSegment);
                                        }
                                    }
                                }

                                // If we have some aliases, add these to the lucene index in a searchable way
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
                                    .Select(x => UdiParser.TryParse<GuidUdi>(x, out var id) ? id : null)
                                    .Where(x => x != null)
                                    .ToList();

                                // Fetch the category nodes and extract the category alias, adding it to the aliases collection
                                using (var ctx = _umbracoContextFactory.EnsureUmbracoContext())
                                {
                                    foreach (var subCategoryId in subCategoryIds)
                                    {
                                        var subCategory = ctx.UmbracoContext.Content.GetById(subCategoryId);
                                        if (subCategory != null)
                                        {
                                            subCategoryAliases.Add(subCategory.UrlSegment);
                                        }
                                    }
                                }

                                // If we have some aliases, add these to the lucene index in a searchable way
                                if (subCategoryAliases.Count > 0)
                                {
                                    SetOrUpdateExamineValue(values, "subCategoryAliases", string.Join(" ", subCategoryAliases));
                                    // bool valueExists = values.TryGetValue("subCategoryAliases", out var y);
                                    // if (valueExists)
                                    // {
                                    //     values["subCategoryAliases"] = new[] { string.Join(" ", subCategoryAliases) };
                                    // }
                                    // else
                                    // {

                                    //     values.Add("subCategoryAliases", new[] { string.Join(" ", subCategoryAliases) });
                                    // }
                                }
                            }
                        }

                        // ================================================================
                        // Do some generally usefull modifications
                        // ================================================================

                        // Create searchable path
                        if (e.ValueSet.Values.ContainsKey("path"))
                        {
                            SetOrUpdateExamineValue(values, "subCategoryAliases", new[] { e.ValueSet.GetValue("path").ToString().Replace(',', ' ') });

                            // values.Add("searchPath", new[] { e.ValueSet.GetValue("path").ToString().Replace(',', ' ') });
                        }

                        // Stuff all the fields into a single field for easier searching
                        var combinedFields = new StringBuilder();

                        foreach (var kvp in e.ValueSet.Values)
                        {
                            foreach (var value in kvp.Value)
                            {
                                combinedFields.AppendLine(value.ToString());
                            }
                        }

                        // values.Add("contents", new[] { combinedFields.ToString() });
                        SetOrUpdateExamineValue(values, "contents", new[] { combinedFields.ToString() });

                        // Update the value
                        e.SetValues(values);
                    };
                }
                catch (System.Exception)
                {

                    throw;
                }
            }
        }

        private void SetOrUpdateExamineValue(Dictionary<string, IEnumerable<object>> values, string key, string value)
        {
            if (values.ContainsKey(key))
            {
                values[key] = new[] { value };
            }
            else
            {
                values.Add(key, new[] { value });
            }
        }

        private void SetOrUpdateExamineValue(Dictionary<string, IEnumerable<object>> values, string key, string[] value)
        {
            SetOrUpdateExamineValue(values, key, string.Join(" ", value));
        }
    }
}
