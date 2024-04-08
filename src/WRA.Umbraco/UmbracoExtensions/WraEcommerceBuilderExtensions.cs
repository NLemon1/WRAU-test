using Umbraco.Commerce.Core.Adapters;
using Umbraco.Commerce.Extensions;

namespace WRA.Umbraco.UmbracoExtensions;

public static class WraEcommerceBuilderExtensions
{
    public static IUmbracoBuilder AddWraStore(this IUmbracoBuilder umbracoBuilder)
    {
        umbracoBuilder.AddUmbracoCommerce(v =>
        {
            // Enable SQLite support
            v.AddSQLite();
            v.AddStorefrontApi();
            v.Services.AddUnique<IProductAdapter, CustomProductAdapater>();


            // Replace the umbraco product name extractor with one that supports child variants
            // v.Services.AddUnique<IUmbracoProductNameExtractor, CompositeProductNameExtractor>();

            // Register event handlers
            // v.WithNotificationEvent<OrderProductAddingNotification>()
            //     .RegisterHandler<OrderProductAddingHandler>();

            // v.WithNotificationEvent<OrderLineChangingNotification>()
            //     .RegisterHandler<OrderLineChangingHandler>();

            // v.WithNotificationEvent<OrderLineRemovingNotification>()
            //     .RegisterHandler<OrderLineRemovingHandler>();

            // v.WithNotificationEvent<OrderPaymentCountryRegionChangingNotification>()
            //     .RegisterHandler<OrderPaymentCountryRegionChangingHandler>();

            // v.WithNotificationEvent<OrderShippingCountryRegionChangingNotification>()
            //     .RegisterHandler<OrderShippingCountryRegionChangingHandler>();

            // v.WithNotificationEvent<OrderShippingMethodChangingNotification>()
            //     .RegisterHandler<OrderShippingMethodChangingHandler>();

        });


        return umbracoBuilder;
    }
}
