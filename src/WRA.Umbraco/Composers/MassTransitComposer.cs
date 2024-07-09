using Azure.Messaging.ServiceBus.Administration;
using MassTransit;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Umbraco.Cms.Core.Composing;
using WRA.Umbraco.Contracts;
using WRA.Umbraco.Events.Consumers;
using WRA.Umbraco.Exceptions;
using WRA.Umbraco.Shared.Exceptions;
using WRA.Umbraco.Shared.Messaging;
using WRA.Umbraco.Web.Dtos.External;

namespace WRA.Umbraco.Composers;

[ComposeAfter(typeof(WebhookComposer))]
public class MassTransitComposer : IComposer
{
    public void Compose(IUmbracoBuilder builder)
    {
        var logger = builder.BuilderLoggerFactory.CreateLogger<MassTransitComposer>();

        // Retrieve messaging settings
        var settings = builder.Config.GetSection(nameof(MessagingSettings)).Get<MessagingSettings>() ?? throw new ApplicationConfigurationException(nameof(MessagingSettings));

        // Bind messaging settings to a singleton
        builder.Services.AddSingleton(settings);
        builder.Services.AddMassTransit(x =>
        {
            // Use kebab-case for endpoint names.
            x.SetKebabCaseEndpointNameFormatter();

            if (!settings.Enabled) return;

            // Add the member update consumer if enabled in settings.
            var memberEndPointSettings = settings.GetEndPointSettings(nameof(MemberEvent));
            if (memberEndPointSettings is { Enabled: true })
            {
                logger.LogInformation("Member Consumer Enabled. Adding Consumer...");
                x.AddConsumer<MemberEntityEventConsumer>();
            }

            var productEndpointSettings = settings.GetEndPointSettings(nameof(ProductEvent));
            if (productEndpointSettings is { Enabled: true })
            {
                logger.LogInformation("Product Consumer Enabled. Adding Consumer...");
                x.AddConsumer<ProductEntityEventConsumer>();
            }

            var orderEndpointSettings = settings.GetEndPointSettings(nameof(OrderEvent));
            if (orderEndpointSettings is { Enabled: true })
            {
                logger.LogInformation("Order Consumer Enabled. Adding Consumer...");
                x.AddConsumer<OrderEntityEventConsumer>();
            }

            x.UsingAzureServiceBus((context, cfg) =>
            {
                // Base connection string for the service bus.
                cfg.Host(settings.BusConnectionString);

                // Message retry settings.
                cfg.UseMessageRetry(r => r.Interval(settings.GlobalRetryCount, TimeSpan.FromSeconds(settings.GlobalRetryDelaySeconds)));

                // Scheduler Redelivery timing.
                cfg.UseScheduledRedelivery(r =>
                    r.Intervals(settings.SchedulerRetryDelaySeconds.Select(z => TimeSpan.FromMinutes(z))
                        .ToArray()));

                // Use configured message scheduler.
                cfg.UseMessageScheduler(settings.GetSchedulerSendEndpointUri());

                var subscriptionNameGenerator = context.GetRequiredService<ISubscriptionNameGenerator>();

                // Configure the member subscription if it's enabled.
                if (memberEndPointSettings is { Enabled: true })
                {
                    // Configure the member subscription endpoint.
                    cfg.SubscriptionEndpoint<EntityEvent<MemberEvent>>(
                        subscriptionNameGenerator.GetSubscriptionName<EntityEvent<MemberEvent>>(), e =>
                        {
                            e.Rule = new CreateRuleOptions
                            {
                                Name = $"Filter{settings.BusEventSource}Events",
                                Filter = new SqlRuleFilter(
                                    $"{nameof(EntityEvent<MemberEvent>.Source)} <> '{settings.BusEventSource}' AND {nameof(EntityEvent<MemberEvent>.Originator)} <> '{settings.BusEventSource}'")
                            };
                            e.ConfigureConsumer<MemberEntityEventConsumer>(context);

                            // Configure rate limiting if enabled for this subscription endpoint.
                            if (memberEndPointSettings.RateLimitSettings is { Enabled: true })
                            {
                                e.UseRateLimit(memberEndPointSettings.RateLimitSettings.RateLimit, TimeSpan.FromSeconds(memberEndPointSettings.RateLimitSettings.IntervalSeconds));
                            }

                            // Configure concurrency limit if enabled for this subscription endpoint.
                            if (memberEndPointSettings.ConcurrencyLimitSettings is { Enabled: true })
                            {
                                e.UseConcurrencyLimit(memberEndPointSettings.ConcurrencyLimitSettings
                                    .ConcurrencyLimit);
                            }
                        });
                }

                if (productEndpointSettings is { Enabled: true })
                {
                    cfg.SubscriptionEndpoint<EntityEvent<ProductEvent>>(
                        subscriptionNameGenerator.GetSubscriptionName<EntityEvent<ProductEvent>>(), e =>
                        {
                            string sqlString = $"{nameof(EntityEvent<ProductEvent>.Source)} <> '{settings.BusEventSource}' AND {nameof(EntityEvent<ProductEvent>.Originator)} <> '{settings.BusEventSource}'";
                            e.Rule = new CreateRuleOptions
                            {
                                Name = $"Filter{settings.BusEventSource}Products",
                                Filter = new SqlRuleFilter(sqlString)
                            };
                            e.ConfigureConsumer<ProductEntityEventConsumer>(context, options => options.UseMessageRetry(r => r.Interval(5, 400).Handle<TransientException>()));

                            // Configure rate limiting if enabled for this subscription endpoint.
                            if (productEndpointSettings.RateLimitSettings is { Enabled: true })
                            {
                                e.UseRateLimit(productEndpointSettings.RateLimitSettings.RateLimit, TimeSpan.FromSeconds(memberEndPointSettings.RateLimitSettings.IntervalSeconds));
                            }

                            // Configure concurrency limit if enabled for this subscription endpoint.
                            if (productEndpointSettings.ConcurrencyLimitSettings is { Enabled: true })
                            {
                                e.UseConcurrencyLimit(productEndpointSettings.ConcurrencyLimitSettings
                                    .ConcurrencyLimit);
                            }
                        });
                }

                if (orderEndpointSettings is { Enabled: true })
                {
                    cfg.SubscriptionEndpoint<EntityEvent<OrderEvent>>(
                        subscriptionNameGenerator.GetSubscriptionName<EntityEvent<OrderEvent>>(), e =>
                        {
                            string sqlString = $"{nameof(EntityEvent<OrderEvent>.Source)} <> '{settings.BusEventSource}' AND {nameof(EntityEvent<OrderEvent>.Originator)} <> '{settings.BusEventSource}'";
                            e.Rule = new CreateRuleOptions
                            {
                                Name = $"Filter{settings.BusEventSource}Orders",
                                Filter = new SqlRuleFilter(sqlString)
                            };
                            e.ConfigureConsumer<OrderEntityEventConsumer>(context, options => options.UseMessageRetry(r => r.Interval(5, 400).Handle<TransientException>()));

                            // Configure rate limiting if enabled for this subscription endpoint.
                            if (orderEndpointSettings.RateLimitSettings is { Enabled: true })
                            {
                                e.UseRateLimit(orderEndpointSettings.RateLimitSettings.RateLimit, TimeSpan.FromSeconds(memberEndPointSettings.RateLimitSettings.IntervalSeconds));
                            }

                            // Configure concurrency limit if enabled for this subscription endpoint.
                            if (orderEndpointSettings.ConcurrencyLimitSettings is { Enabled: true })
                            {
                                e.UseConcurrencyLimit(orderEndpointSettings.ConcurrencyLimitSettings
                                    .ConcurrencyLimit);
                            }
                        });
                }

                // Use built in message scheduler instead of Quartz
                cfg.UseServiceBusMessageScheduler();

                // Configure all the endpoints using the DefaultEndpointNameFormatter
                cfg.ConfigureEndpoints(context);
            });
        });
    }
}
