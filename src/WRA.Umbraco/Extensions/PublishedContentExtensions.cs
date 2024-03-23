using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Commerce.Core.Models;
using Umbraco.Commerce.Core.Api;
using WRA.Umbraco.Models;
using Umbraco.Commerce.Extensions;
using WRA.Umbraco.Dtos;
using Umbraco.Cms.Core.Models;
using System.Text;
using Umbraco.Cms.Core;
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

            var checkRichText = content!.RichTextContent.SafeString().StripHtml().Length > 135 ? content!.RichTextContent.SafeString().StripHtml().Substring(0, 135) + "..." : "";

            return new NewsRecordDto(
                content?.UrlSegment?.SafeString()!,
                content!.Name,
                content?.Category?.Name.SafeString()!,
                content?.Image?.MediaUrl().SafeString()!,
                content?.Excerpt?.SafeString() ?? checkRichText,
                content?.Title ?? content!.Name,
                System.String.Format("{0:yyyy-MM-dd}", content.Date),
                System.String.Format("{0:MMMM d, yyyy}", content.Date)
            );
        }

        public static HotTipDto AsDto(this HotTipEntry content)
        {
            return new HotTipDto(
                content.Name,
                content?.Category == null ? [] : content.Category!.Select(cat => cat.Name),
                content?.Subcategories == null ? [] : content.Subcategories!.Select(cat => cat.Name),
                content?.Question?.ToString() ?? string.Empty,
                content?.Answer?.ToString() ?? string.Empty,
                content?.OriginalPublishedDate == null ? string.Empty : content.OriginalPublishedDate.ToString()
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
                System.String.Format("{0:yyyy-MM-dd}", content!.Date),
                System.String.Format("{0:MMMM d, yyyy}", content!.Date),
                content.Children.Any(),
                children ?? new List<MultimediaDto>()
            );
        }

        public static ProductPageResponseDto AsDto(this ProductPage p)
        {
            var currency = p.GetStore().BaseCurrencyId ?? Guid.Empty;
            return new ProductPageResponseDto(
                p.Name,
                p.Collection.Name,
                p?.Taxonomy?.SafeString(),
                p?.Categories?.First().Name ?? string.Empty,
                p?.SubCategories?.First()?.Name ?? string.Empty,
                p!.Price!.GetPriceFor(currency).Formatted().Value,
                p!.MemberPrice?.GetPriceFor(currency)?.Formatted()?.Value ?? string.Empty,
                System.String.Format("{0:yyyy-MM-dd H:mm}", p.StartDate),
                System.String.Format("{0:yyyy-MM-dd H:mm}", p.EndDate),
                p.Url(),
                p?.Categories?.First()?.Id ?? 0,
                p.Url(),
                System.String.Format("{0:MMMM d}", p.StartDate) ?? string.Empty,
                System.String.Format("{0:h:mm tt}", p.StartDate) ?? string.Empty,
                System.String.Format("{0:MMMM d}", p.EndDate) ?? string.Empty,
                System.String.Format("{0:h:mm tt}", p.EndDate) ?? string.Empty,
                p.Id,
                p?.CreditHours ?? 0
            );
        }

        public static MemberDto AsDto(this IMember m)
        {
            MemberDto mdto = new MemberDto
            {
                ExternalId = m.GetValue<string>("externalId"),
                Email = m.Email,
                BrokerFullName = m.GetValue<string>("brokerFullName").SafeString(),
                BrokerEmail = m.GetValue<string>("brokerEmail").SafeString(),
                Address1 = m.GetValue<string>("address1").SafeString(),
                Address2 = m.GetValue<string>("address2").SafeString(),
                Address3 = m.GetValue<string>("address3").SafeString(),
                City = m.GetValue<string>("city").SafeString(),
                CellPhone = m.GetValue<string>("cellPhone").SafeString(),
                CanUseHotline = m.GetValue<bool>("canUseHotline"),
                CompanyLogoUrl = m.GetValue<string>("companyLogoUrl").SafeString(),
                CompanyId = m.GetValue<string>("companyId"),
                CompanyName = m.GetValue<string>("companyName").SafeString(),
                //Getber.SetValue("companySubscriptions", mdto.CompanySubscriptions);
                Fax = m.GetValue<string>("fax").SafeString(),
                FirstName = m.GetValue<string>("firstName").SafeString(),
                LastName = m.GetValue<string>("lastName").SafeString(),
                Gender = m.GetValue<string>("gender").SafeString(),
                HomePhone = m.GetValue<string>("homePhone").SafeString(),
                ImageUrl = m.GetValue<string>("imageUrl").SafeString(),
                JoinDate = m.GetValue<DateTime>("joinDate"),
                MandatoryHotlineLetter = m.GetValue<bool>("mandatoryHotlineLetter"),
                NRDSId = m.GetValue<string>("nrdsId").SafeString(),
                PaidThruDate = m.GetValue<DateTime>("paidThruDate"),
                Prefix = m.GetValue<string>("prefix").SafeString(),
                Suffix = m.GetValue<string>("suffix").SafeString(),
                StateProvince = m.GetValue<string>("stateProvince").SafeString(),
                Zip = m.GetValue<string>("zip").SafeString()
            };

            return mdto;
        }

        public static WraProductDto AsWraProductDto(this IContent c)
        {
            WraProductDto pdto = new WraProductDto
            {
                Id = c.GetValue<string>("productId").SafeString(),
                Name = c.Name!,
                Sku = c.GetValue<string>("sku").SafeString(),
                Taxonomy = c.GetValue<string>("taxonomy").SafeString(),
                Price = c.GetValue<decimal>("price"),
                Description = c.GetValue<string>("description").SafeString(),
                ImageUrl = c.GetValue<string>("imageUrl").SafeString(),
                Category = c.GetValue<string>("category").SafeString(),
                SubCategory = c.GetValue<string>("subCategory").SafeString(),
                StartDate = c.GetValue<DateTime>("startDate"),
                EndDate = c.GetValue<DateTime>("endDate"),
                ProductType = c.GetValue<string>("productType").SafeString()
            };

            return pdto;
        }

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
                ZipCode = order.Properties["shippingZipCode"].SafeString(),
                //Country = Guid.Parse(order.Properties["shippingCountry"].SafeString()),

            };
        }

        public static string ReadableShippingAddress(this OrderReadOnly order)
        {
            var address = new StringBuilder();

            var Line1 = order.Properties["shippingAddressLine1"].SafeString();
            var Line2 = order.Properties["shippingAddressLine2"].SafeString();
            var City = order.Properties["shippingCity"].SafeString();
            var State = order.Properties["shippingState"].SafeString();
            var ZipCode = order.Properties["shippingZipCode"].SafeString();

            address.Append($"{Line1} ");
            if (!string.IsNullOrEmpty(Line2))
            {
                address.Append($"{Line2}, ");
            }
            address.Append($"{City} {State} {ZipCode}");

            return address.ToString();
        }

        /// <summary>
        /// Member Specific Extensions
        /// </summary>
        /// <param name="member"></param>
        /// <param name="mdto"></param>
        /// <returns></returns>
        public static IMember? UpdateWRAMemberProperties(this IMember member, MemberDto mdto)
        {
            member.SetValue("externalId", mdto.ExternalId);
            member.SetValue("brokerFullName", mdto.BrokerFullName);
            member.SetValue("brokerEmail", mdto.BrokerEmail);
            member.SetValue("address1", mdto.Address1);
            member.SetValue("address2", mdto.Address2);
            member.SetValue("address3", mdto.Address3);
            member.SetValue("city", mdto.City);
            member.SetValue("cellPhone", mdto.CellPhone);
            member.SetValue("canUseHotline", mdto.CanUseHotline);
            member.SetValue("companyLogoUrl", mdto.CompanyLogoUrl);
            member.SetValue("companyId", mdto.CompanyId);
            member.SetValue("companyName", mdto.CompanyName);
            //member.SetValue("companySubscriptions", mdto.CompanySubscriptions);
            member.SetValue("fax", mdto.Fax);
            member.SetValue("firstName", mdto.FirstName);
            member.SetValue("lastName", mdto.LastName);
            member.SetValue("gender", mdto.Gender);
            member.SetValue("homePhone", mdto.HomePhone);
            member.SetValue("imageUrl", mdto.ImageUrl);
            member.SetValue("joinDate", mdto.JoinDate);
            member.SetValue("mandatoryHotlineLetter", mdto.MandatoryHotlineLetter);
            member.SetValue("nrdsId", mdto.NRDSId);
            member.SetValue("paidThruDate", mdto.PaidThruDate);
            member.SetValue("prefix", mdto.Prefix);
            member.SetValue("suffix", mdto.Suffix);
            member.SetValue("stateProvince", mdto.StateProvince);
            member.SetValue("zip", mdto.Zip);



            return member;
        }

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
            var page = content as IPublishedContent;
            if (page == null)
                return null;

            var store = page.GetStore();
            return UmbracoCommerceApi.Instance.GetProduct(store.Id, content.GetProductReference(), Thread.CurrentThread.CurrentCulture.Name) as CustomProductSnapshot;
            // var y = new UmbracoProductAdapter()
        }

        public static IProductSnapshot? AsProduct(this IProductComp variant, IProductComp parent)
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
                return content.Any(c => c.Name.Equals(category, StringComparison.OrdinalIgnoreCase));
            }

            return false;
        }

        public static Price CalculatePrice(this IProductComp content)
        {
            return content!.AsProduct()!.CalculatePrice();
        }

        public static ProductPrice PercentDiscountedDisplayPrice(this ProductPrice productPrice, Decimal discountPercent)
        {
            var discount = discountPercent / 100;
            var price = productPrice.Value;
            var DiscountedPrice = price - (price * discount);
            return new ProductPrice(DiscountedPrice, productPrice.CurrencyId);
        }

        public static Price? CalculatePrice(this IProductComp variant, IProductComp parent)
        {
            return variant?.AsProduct(parent)?.CalculatePrice();
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
        public static Udi? GetUdi(this IContent content)
        {
            return Udi.Create(Constants.UdiEntityType.Document, content.Key);
        }
        public static Udi? GetUdi(this IPublishedContent content)
        {
            return Udi.Create(Constants.UdiEntityType.Document, content.Key);
        }
    }
}