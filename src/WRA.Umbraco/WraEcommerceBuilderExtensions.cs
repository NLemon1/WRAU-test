using Umbraco.Commerce.Core.Events.Notification;
using Umbraco.Commerce.Cms.Extractors;
using Umbraco.Commerce.Extensions;
using Umbraco.Cms.Core.DependencyInjection;
using Umbraco.Extensions;
using Umbraco.Cms.Core.Notifications;
using Umbraco.Commerce.Core.Adapters;
using Umbraco.Commerce.Cms.Adapters;
using WRA.Umbraco.Services;

namespace WRA.Umbraco;

public static class WraEcommerceBuilderExtensions
{
    public static IUmbracoBuilder AddWraStore(this IUmbracoBuilder umbracoBuilder)
    {
        umbracoBuilder.AddUmbracoCommerce(v =>
        {
            // Enable SQLite support
            v.AddSQLite();
            v.Services.AddUnique<IProductAdapter, CustomProductAdapater>();

            // v.Services.AddUnique<ProductAdapterBase, CustomProductAdapater>();
            // v.Services.AddUnique<UmbracoProductSnapshot, CustomProductSnapshot>();


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

        // umbracoBuilder.AddNotificationHandler<UmbracoApplicationStartingNotification, TransformExamineValues>();

        return umbracoBuilder;
    }
}
