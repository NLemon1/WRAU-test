using System.Text;
using System.Web;
using Umbraco.Cms.Core.Models;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Commerce.Core.Api;
using Umbraco.Commerce.Core.Models;
using Umbraco.Commerce.Extensions;
using WRA.Umbraco.Dtos;
using WRA.Umbraco.Models;
using Umbraco.Cms.Core;
using WRA.Umbraco.Models.Custom;
using WRA.Umbraco.Web.Dtos.WraExternal;
using WRA.Umbraco.Web.Adapters;

namespace WRA.Umbraco.Extensions
{
    public static class PublishedContentExtensions
    {
        /// <summary>
        /// General Published Content Extensions.
        /// </summary>
        /// <param name="content">IPublished Content Item.</param>
        /// <returns>Home Page.</returns>
        public static Home GetHomePage(this IPublishedContent content)
        {
            return content.AncestorOrSelf<Home>()!;
        }

        public static IEnumerable<T> Paginate<T>(this IEnumerable<T> results, Pagination pagination)
        {
            IEnumerable<T> paginatedItems = results
                .Skip((pagination.PageNumber - 1) * pagination.PageSize)
                .Take(pagination.PageSize);

            return paginatedItems;
        }

        /// <summary>
        /// DTO specific Extensions.
        /// </summary>
        /// <param name="content">Article Content Item.</param>
        /// <returns>News Record DTO Object.</returns>
        public static NewsRecordDto AsDto(this Article content)
        {
            string checkRichText = content.RichTextContent.SafeString().StripHtml().Length > 135 ? $"{content.RichTextContent.SafeString().StripHtml().AsSpan(0, 135)}..." : string.Empty;

            return new NewsRecordDto(
                content.UrlSegment?.SafeString()!,
                content.Name,
                content.Category?.Name.SafeString()!,
                content.Image?.MediaUrl().SafeString()!,
                content.Excerpt?.SafeString() ?? checkRichText,
                content.Title ?? content!.Name,
                string.Format("{0:yyyy-MM-dd}", content.Date),
                string.Format("{0:MMMM d, yyyy}", content.Date));
        }

        public static HotTipDto AsDto(this HotTipEntry content)
        {
            return new HotTipDto(
                content.Name,
                content.Category == null ? [] : content.Category!.Select(cat => cat.Name),
                content.Subcategories == null ? [] : content.Subcategories!.Select(cat => cat.Name),
                content.Question?.ToString() ?? string.Empty,
                content.Answer?.ToString() ?? string.Empty,
                content.OriginalPublishedDate.ToString());
        }

        public static MultimediaDto AsDto(this MultimediaItem content, List<MultimediaDto>? children = null)
        {
            return new MultimediaDto(
                content.Title ?? content.Name,
                content.Url() ?? string.Empty,
                content.MediaType ?? string.Empty,
                content.YouTubeId ?? string.Empty,
                content.Description ?? string.Empty,
                content?.ThumbnailOverride?.MediaUrl() ?? string.Empty,
                string.Format("{0:yyyy-MM-dd}", content!.Date),
                string.Format("{0:MMMM d, yyyy}", content!.Date),
                content.Children.Any(),
                children ?? []);
        }

        // move to mapper
        public static ProductPageResponseDto AsDto(this ProductPage p)
        {
            DefaultIdType currency = p.GetStore().BaseCurrencyId ?? Guid.Empty;
            return new ProductPageResponseDto(
                p.Name,
                p.Key,
                p.Collection.Name,
                p.ProductTaxonomy?.Name ?? string.Empty,
                p.Categories?.First().Name ?? string.Empty,
                p.SubCategories?.First()?.Name ?? string.Empty,
                p.Price!.GetPriceFor(currency).Formatted().Value,
                p.MemberPrice?.GetPriceFor(currency)?.Formatted()?.Value ?? string.Empty,
                string.Format("{0:yyyy-MM-dd H:mm}", p.StartDate),
                string.Format("{0:yyyy-MM-dd H:mm}", p.EndDate),
                p.Url(),
                p.Categories?.First()?.Id ?? 0,
                p.Url(),
                string.Format("{0:MMMM d}", p.StartDate) ?? string.Empty,
                string.Format("{0:h:mm tt}", p.StartDate) ?? string.Empty,
                string.Format("{0:MMMM d}", p.EndDate) ?? string.Empty,
                string.Format("{0:h:mm tt}", p.EndDate) ?? string.Empty,
                p.Id,
                p.CreditHours);
        }

        // public static WraProductDto AsWraProductDto(this IContent c)
        // {
        //     WraProductDto wraProductDto = new()
        //     {
        //         Id = c.GetValue<string>("productId").SafeString(),
        //         Name = c.Name!,
        //         Sku = c.GetValue<string>("sku").SafeString(),
        //         Taxonomy = c.GetValue<string>("taxonomy").SafeString(),
        //         Price = c.GetValue<decimal>("price"),
        //         Description = c.GetValue<string>("description").SafeString(),
        //         ImageUrl = c.GetValue<string>("imageUrl").SafeString(),
        //         Category = c.GetValue<string>("category").SafeString(),
        //         SubCategory = c.GetValue<string>("subCategory").SafeString(),
        //         StartDate = c.GetValue<DateTime>("startDate"),
        //         EndDate = c.GetValue<DateTime>("endDate"),
        //         ProductType = c.GetValue<string>("productType").SafeString()
        //     };
        //
        //     return wraProductDto;
        // }

        public static OrderAddressDto ShippingAddressDto(this Order order)
        {
            return new OrderAddressDto
            {
                FirstName = order.CustomerInfo.FirstName,
                LastName = order.CustomerInfo.LastName,
                Line1 = order.Properties["shippingAddressLine1"].SafeString(),
                Line2 = order.Properties["shippingAddressLine2"].SafeString(),
                City = order.Properties["shippingCity"].SafeString(),
                State = order.Properties["shippingState"].SafeString(),
                ZipCode = order.Properties["shippingZipCode"].SafeString()
            };
        }

        public static string ReadableShippingAddress(this OrderReadOnly order)
        {
            StringBuilder address = new();

            string line1 = order.Properties["shippingAddressLine1"].SafeString();
            string line2 = order.Properties["shippingAddressLine2"].SafeString();
            string city = order.Properties["shippingCity"].SafeString();
            string state = order.Properties["shippingState"].SafeString();
            string zipCode = order.Properties["shippingZipCode"].SafeString();

            address.Append($"{line1} ");
            if (!string.IsNullOrEmpty(line2))
            {
                address.Append($"{line2}, ");
            }

            address.Append($"{city} {state} {zipCode}");

            return address.ToString();
        }

        /// <summary>
        /// Commerce Specific Extensions.
        /// </summary>
        /// <param name="content">IPublished content.</param>
        /// <returns>Read only store.</returns>
        public static StoreReadOnly? GetStore(this IPublishedContent content)
        {
            return content.AncestorOrSelf<Home>()?.Store;
        }

        public static OrderReadOnly GetCurrentOrder(this IPublishedContent content)
        {
            return UmbracoCommerceApi.Instance.GetCurrentOrder(content.GetStore().Id);
        }

        public static OrderReadOnly GetOrCreateOrder(this IPublishedContent content)
        {
            return UmbracoCommerceApi.Instance.GetOrCreateCurrentOrder(content.GetStore().Id);
        }

        // public static OrderReadOnly GetCurrentCustomer(this IPublishedContent content)
        // {
        //     return UmbracoCommerceApi.Instance.custom(content.GetStore().Id);
        // }

        public static string GetProductReference(this IProductComp content)
        {
            return content.Key.ToString();
        }

        public static IProductSnapshot? AsProduct(this IProductComp content)
        {
            if (content is not IPublishedContent page)
            {
                // TODO: Add a static logger so we can log issues.
                return null;
            }

            StoreReadOnly? store = page.GetStore();
            var product = UmbracoCommerceApi.Instance.GetProduct(store.Id, content.GetProductReference(),
                Thread.CurrentThread.CurrentCulture.Name);
            return product;
        }

        public static IProductSnapshot? AsProduct(this IProductComp variant, IProductComp parent)
        {
            IPublishedContent? page = parent as IPublishedContent ?? variant as IPublishedContent;
            if (page == null)
                return null;

            StoreReadOnly? store = page.GetStore();

            return UmbracoCommerceApi.Instance.GetProduct(store.Id, parent.GetProductReference(), variant.GetProductReference(), Thread.CurrentThread.CurrentCulture.Name);
        }

        public static bool ContainsProductCategory(this IEnumerable<IPublishedContent> content, string category)
        {
            if (content.Any())
            {
                return content.Any(c => c.Name.Equals(category, StringComparison.OrdinalIgnoreCase));
            }

            return false;
        }

        public static bool ContainsCategories(this IEnumerable<IPublishedContent>? content, List<string> category)
        {
            if (content?.Any() == true)
            {
                return category.Exists(cat => content.Any(c =>
                    c.Name.Equals(HttpUtility.UrlDecode(cat), StringComparison.OrdinalIgnoreCase)));
            }

            return false;
        }
        public static bool ContainsCategories(this IEnumerable<IPublishedContent>? content, List<int> category)
        {
            if (content?.Any() == true)
            {
                return category.Exists(cat => content.Any(c =>
                    c.Id.Equals(cat)));
            }

            return false;
        }

        public static Price? CalculatePrice(this IProductComp content)
        {
            var attempt = content!.AsProduct()!.TryCalculatePrice();

            if (attempt.Success && attempt.Result is not null)
            {
                return attempt.Result;
            }
            else
            {
                // TODO: Probably do logging here as well.
                return null;
            }
        }

        public static Price? CalculatePrice(this IProductComp variant, IProductComp parent)
        {
            var attempt = variant?.AsProduct(parent).TryCalculatePrice();
            if (attempt.HasValue && attempt.Value.Success && attempt.Value.Result is not null)
            {
                return attempt.Value.Result;
            }
            else
            {
                // TODO:  Add logging
                return null;
            }
        }

        public static ProductPrice PercentDiscountedDisplayPrice(this ProductPrice productPrice, decimal discountPercent)
        {
            decimal discount = discountPercent / 100;
            decimal price = productPrice.Value;
            decimal discountedPrice = price - (price * discount);
            return new ProductPrice(discountedPrice, productPrice.CurrencyId);
        }

        public static CheckoutPage? GetCheckoutPage(this CheckoutStepPage content)
        {
            return content!.AncestorOrSelf<CheckoutPage>();
        }

        public static Home? GetHome(this IPublishedContent checkoutStepPage)
        {
            return checkoutStepPage.Ancestor<Home>();
        }

        public static string SafeString(this object? item)
        {
            return item?.ToString() ?? string.Empty;
        }

        public static Guid SafeGuid(this object? item)
        {
            string? value = item?.ToString();
            return Guid.TryParse(value, out DefaultIdType guid) ? guid : Guid.Empty;
        }
        public static Udi? GetUdi(this string content)
        {
            var contentUri = new Uri(content);
            return Udi.Create(contentUri);
        }

        public static Udi? GetUdi(this IPublishedContent content)
        {
            return content == null ? null : Udi.Create(Constants.UdiEntityType.Document, content.Key);
        }
    }
}