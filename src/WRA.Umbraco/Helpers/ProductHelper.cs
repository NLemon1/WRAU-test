using Umbraco.Cms.Core;
using Umbraco.Cms.Core.Cache;
using Umbraco.Cms.Core.Models;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Core.Web;
using WRA.Umbraco.Contracts;
using WRA.Umbraco.Services.Caching;
using System.Text.Json;
using Umbraco.Commerce.Core.Models;
using Umbraco.Commerce.Core.Services;
using WRA.Umbraco.Extensions;
using WRA.Umbraco.Models;


namespace WRA.Umbraco.Helpers;

public class ProductHelper(
    ICacheKeyProvider cacheKeyProvider,
    IUmbracoContextFactory contextFactory,
    AppCaches appCache,
    IContentService contentService,
    ICurrencyService currencyService,
    bool autoSave = true)
: ContentHelperBase<IContent, ProductEvent>(cacheKeyProvider, appCache)
{
    private CurrencyReadOnly GetCurrency(Guid storeId) => currencyService.GetCurrencies(storeId).First(c => c.Name == "USD");

    public void Update(IContent target, ProductEvent source)
    {
         DynamicUpdate(target, source);
         SetProductProperties(target, source);
         if (autoSave)
         {
             contentService.Save(target);
         }
    }

    private void SetProductProperties(IContentBase content, ProductEvent productEvent)
    {
        var context = contextFactory.EnsureUmbracoContext();
        var contentCache = context.UmbracoContext.Content;
        var siteRoot = contentCache?.GetAtRoot().FirstOrDefault();

        var (categories, subCategories) = GetCategories(productEvent.Category, productEvent.SubCategory);

        // if category exists...
        if (categories != null)
        {
            // get category node Udi. This is fully qualified node reference.
            var categoryPageUdi = Udi.Create(Constants.UdiEntityType.Document, categories.Key);
            List<string> categoryUdis = new() { categoryPageUdi.ToString() };

            // set category uid on content (product)
            content.SetValue("categories", string.Join(",", categoryUdis));
        }
        // First, lets get the currencies from our store...
        // for now we will just support USD
        var store = siteRoot.GetStore();
        var currency = GetCurrency(store.Id);

        // Curency must be set as a Json object. Serialize dictionary.
        var basePrice = JsonSerializer.Serialize(new Dictionary<string, string> {
            { currency.Id.ToString(), productEvent.Price?.ToString() ?? "0"}
        });
        var memberPrice = JsonSerializer.Serialize(new Dictionary<string, string> {
            { currency.Id.ToString(), productEvent.MemberPrice?.ToString() ?? "0" }
        });

        if (subCategories != null)
        {
            var subCategoryPageUdi = subCategories.GetUdi();
            List<string> subCategoryIds = [subCategoryPageUdi.ToString()];
            content.SetValue("subCategories", string.Join(",", subCategoryIds));
        }

        content.SetValue("price", basePrice);
        content.SetValue("memberPrice", memberPrice);
    }

    private (IPublishedContent?, IPublishedContent?) GetCategories(string categoryName, string subCategoryName)
    {
        var context = contextFactory.EnsureUmbracoContext();
        var contentCache = context.UmbracoContext.Content;
        var siteRoot = contentCache?.GetAtRoot().FirstOrDefault();

        // get category.
        var category = siteRoot.Children
            .Where(c => c.ContentType.Alias == CategoryPage.ModelTypeAlias)
            .FirstOrDefault(cat => cat.Name.Equals(categoryName, StringComparison.OrdinalIgnoreCase));

        // Get Subcategory. Make sure the parent (which should be a category) matches the
        // category we just got back form the previous query.
        var idAlias = "externalId";
        var subCategories = siteRoot.Children
            .Where(c => c.ContentType.Alias == CategoryPage.ModelTypeAlias);

        var subCategory = subCategories
            .FirstOrDefault(sc => sc.Parent.Value(idAlias) == category.Value(idAlias) &&
                                  sc.Name.Equals(subCategoryName, StringComparison.OrdinalIgnoreCase));

        // return both.
        return (category, subCategory);
    }
}