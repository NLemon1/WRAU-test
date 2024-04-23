using Umbraco.Cms.Core;
using Umbraco.Cms.Core.Cache;
using Umbraco.Cms.Core.Models;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Core.Web;
using WRA.Umbraco.Contracts;
using WRA.Umbraco.Services.Caching;
using System.Text.Json;
using NUglify.Helpers;
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
    private CurrencyReadOnly GetCurrency(Guid storeId) =>
        currencyService.GetCurrencies(storeId).First(c => c.Name == "USD");

    public void Update(IContent target, ProductEvent source)
    {
         DynamicUpdate(target, source);
         SetProductProperties(target, source);
         contentService.Save(target);
    }

    private void SetProductProperties(IContentBase content, ProductEvent productEvent)
    {
        var context = contextFactory.EnsureUmbracoContext();
        var contentCache = context.UmbracoContext.Content;
        var home = contentCache?.GetAtRoot().FirstOrDefault();

        var (categories, subCategories) = GetCategories(
            productEvent.ProductCategoryId.SafeGuid(),
            productEvent.ProductSubcategoryId.SafeGuid());

        // if category exists...
        if (categories != null)
        {
            // get category node Udi. This is fully qualified node reference.
            var categoryPageUdi = Udi.Create(Constants.UdiEntityType.Document, categories.Key);
            List<string> categoryUdis = new() { categoryPageUdi.ToString() };

            // set category uid on content (product)
            content.SetValue("categories", string.Join(",", categoryUdis));
        }

        if (subCategories != null)
        {
            var subCategoryPageUdi = subCategories.GetUdi();
            List<string> subCategoryIds = [subCategoryPageUdi.ToString()];
            content.SetValue("subCategories", string.Join(",", subCategoryIds));
        }

        // First, lets get the currencies from our store...
        // for now we will just support USD
        if (home == null) return;
        var store = home.GetStore();
        var currency = GetCurrency(store.Id);

        // Currency must be set as a Json object. Serialize dictionary.
        string basePrice = JsonSerializer.Serialize(new Dictionary<string, string>
        {
            { currency.Id.ToString(), productEvent.Price?.ToString() ?? "0"}
        });
        string memberPrice = JsonSerializer.Serialize(new Dictionary<string, string>
        {
            { currency.Id.ToString(), productEvent.MemberPrice?.ToString() ?? "0" }
        });

        content.SetValue("price", basePrice);
        content.SetValue("memberPrice", memberPrice);
    }

    private (IPublishedContent? Category, IPublishedContent? SubCategory) GetCategories(Guid categoryId, Guid subCategoryId)
    {
        var context = contextFactory.EnsureUmbracoContext();
        var contentCache = context.UmbracoContext.Content;
        var home = contentCache?.GetAtRoot().FirstOrDefault();

        var categoriesPage = home.Children
            .First(c => c.ContentType.Alias == CategoriesPage.ModelTypeAlias);

        // get category pages
        var categoryPages = categoriesPage.Children
            .Where(c => c.ContentType.Alias == CategoryPage.ModelTypeAlias);

        var category = categoryPages.First(c =>
            c.Value<Guid>(GlobalAliases.ExternalId).Equals(categoryId));

        // Get Subcategory. Make sure the parent (which should be a category) matches the
        // category we just got back form the previous query.
        var subCategory = categoryPages.SelectMany(c => c.Children)
            .Where(sc =>
                sc.ContentType.Alias == SubCategoryPage.ModelTypeAlias)
            .First(x =>
                x.Parent != null &&
                x.Value<Guid>(GlobalAliases.ExternalId) == subCategoryId &&
                x.Parent.Value<Guid>(GlobalAliases.ExternalId) == categoryId);


        // return both.
        return (category, subCategory);
    }

}