using System.Threading;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Extensions;
using Umbraco.Commerce.Core.Api;
using Umbraco.Commerce.Core.Models;
using WRA.Umbraco.Models;
using Umbraco.Commerce.Extensions;
using WRA.Umbraco.Dtos;
using static System.Runtime.InteropServices.JavaScript.JSType;
using static Umbraco.Cms.Core.Constants.HttpContext;
using WRA.Umbraco.Controllers;
using System.Linq;
using Umbraco.Commerce.Cms.Web.Api.Storefront.Models;
using Umbraco.Cms.Core.Models;
using Umbraco.Commerce.Cms.Adapters;

namespace WRA.Umbraco
{
    public static class PublishedContentExtensions
    {

        /// <summary>
        /// General Published Content Extensions
        /// </summary>
        /// <param name="General Published Content Extensions"></param>
        /// <returns></returns>
        public static Home GetHomePage(this IPublishedContent content)
        {
            return content.AncestorOrSelf<Home>()!;
        }

        public static IEnumerable<T> Paginate<T>(this IEnumerable<T> results, Pagination pagination)
        {
            var paginatedItems = results
                .Skip((pagination.PageNumber - 1) * pagination.PageSize)
                .Take(pagination.PageSize);

            return paginatedItems;
        }


        /// <summary>
        /// DTO Extensions
        /// </summary>
        /// <param name="DTO specific Extensions"></param>
        /// <returns></returns>
        public static NewsRecordDto AsDto(this Article content)
        {
            return new NewsRecordDto(
                content.UrlSegment,
                content.Name,
                content?.Category?.Name,
                content?.Image?.MediaUrl().ToString() ?? string.Empty,
                content?.Excerpt ?? string.Empty,
                content.Title ?? content.Name,
                System.String.Format("{0:yyyy-MM-dd}", content.Date),
                System.String.Format("{0:MMMM d, yyyy}", content.Date)
            );
        }

        public static HotTipDto AsDto(this HotTipEntry content)
        {
            return new HotTipDto(
                content.Name,
                content.Category?.Name,
                content.Subcategories.Select(cat => cat.Name),
                content?.Question?.ToString() ?? string.Empty,
                content?.Answer?.ToString() ?? string.Empty,
                content.CreateDate.ToString()
            );
        }

        public static MultimediaDto AsDto(this MultimediaItem content, List<MultimediaDto>? children = null)
        {


            return new MultimediaDto(
                content.Title ?? content.Name,
                content.Url() ?? string.Empty,
                content.MediaType ?? string.Empty,
                content.YouTubeId ?? string.Empty,
                content.Description ?? string.Empty,
                content?.ThumbnailOverride?.MediaUrl().ToString() ?? string.Empty,
                System.String.Format("{0:yyyy-MM-dd}", content.Date),
                System.String.Format("{0:MMMM d, yyyy}", content.Date),
                content.Children.Any(),
                children ?? new List<MultimediaDto>()
            );
        }

        public static ProductPageResponseDto AsDto(this ProductPage p, string productType)
        {
            var currency = p.GetStore().BaseCurrencyId ?? Guid.Empty;
            return new ProductPageResponseDto(
                p.Name,
                productType,
                p?.Categories?.First().Name ?? string.Empty,
                p?.SubCategories?.First().Name ?? string.Empty,
                p.Price.GetPriceFor(currency).Value,
                p.StartDate.ToString(),
                p.EndDate.ToString(),
                p.Url()
            );
        }
        /*        public static PlaylistDto AsDto(this MultimediaPlaylist playlist)
                {
                    var playlistItems = playlist.Children();
                    IEnumerable<MultimediaDto> playlistMediaItems = playlistItems
                        .Select(pmi => new MultimediaItem(pmi, new NoopPublishedValueFallback())
                        .AsDto());
                    PlaylistDto playlistResponse = new(
                        playlistMediaItems,
                        playlist.Date,
                        playlist.Description ?? string.Empty,
                        playlist.MediaType ?? string.Empty,
                        playlist.Title ?? string.Empty
                    );

                    return playlistResponse;
                }*/

        /// <summary>
        /// Commerce Specific Extensions
        /// </summary>
        /// <param name="Commerce Extensions"></param>
        /// <returns></returns>

        public static StoreReadOnly GetStore(this IPublishedContent content)
        {
            return content.AncestorOrSelf<Home>()?.Store!;
        }

        public static OrderReadOnly GetCurrentOrder(this IPublishedContent content)
        {
            return UmbracoCommerceApi.Instance.GetCurrentOrder(content.GetStore().Id);
        }

        public static string GetProductReference(this IProductComp content)
        {
            return content.Key.ToString();
        }



        public static IProductSnapshot AsProduct(this IProductComp content)
        {
            var page = content as IPublishedContent;
            if (page == null)
                return null;

            var store = page.GetStore();
            return UmbracoCommerceApi.Instance.GetProduct(store.Id, content.GetProductReference(), Thread.CurrentThread.CurrentCulture.Name) as CustomProductSnapshot;
            // var y = new UmbracoProductAdapter()
        }

        public static IProductSnapshot AsProduct(this IProductComp variant, IProductComp parent)
        {
            var page = parent as IPublishedContent;
            if (page == null)
                page = variant as IPublishedContent;
            if (page == null)
                return null;

            var store = page.GetStore();


            return UmbracoCommerceApi.Instance.GetProduct(store.Id, parent.GetProductReference(), variant.GetProductReference(), Thread.CurrentThread.CurrentCulture.Name);
        }

        public static bool ContainsProductCategory(this IEnumerable<IPublishedContent> content, string category)
        {
            if (content != null && content.Any())
            {
                return content.Any(c => c.Name == category);
            }

            return false;
        }

        public static Price CalculatePrice(this IProductComp content)
        {
            return content.AsProduct()?.CalculatePrice();
        }

        public static Price CalculatePrice(this IProductComp variant, IProductComp parent)
        {
            return variant.AsProduct(parent)?.CalculatePrice();
        }

        public static CheckoutPage GetCheckoutPage(this CheckoutStepPage content)
        {
            return content.AncestorOrSelf<CheckoutPage>();
        }

        public static Home GetHome(this IPublishedContent checkoutStepPage)
        {
            return checkoutStepPage.Ancestor<Home>();
        }
    }
}