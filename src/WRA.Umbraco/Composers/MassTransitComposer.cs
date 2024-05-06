using Azure.Messaging.ServiceBus.Administration;
using MassTransit;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Umbraco.Cms.Core.Composing;
using WRA.Umbraco.Contracts;
using WRA.Umbraco.Events.Consumers;
using WRA.Umbraco.Exceptions;
using WRA.Umbraco.Shared.Exceptions;
using WRA.Umbraco.Shared.Messaging;

namespace WRA.Umbraco.Composers;

[ComposeAfter(typeof(WebhookComposer))]
public class MassTransitComposer : IComposer
{
    public void Compose(IUmbracoBuilder builder)
    {
        // Retrieve messaging settings
        var settings = builder.Config.GetSection(nameof(MessagingSettings)).Get<MessagingSettings>() ?? throw new ApplicationConfigurationException(nameof(MessagingSettings));

        // Bind messaging settings to a singleton
        builder.Services.AddSingleton(settings);

        builder.Services.AddMassTransit(x =>
        {
            // Use kebab-case for endpoint names.
            x.SetKebabCaseEndpointNameFormatter();

            var memberEndPointSettings = settings.GetEndPointSettings(nameof(MemberEvent));
            var productEndpointSettings = settings.GetEndPointSettings(nameof(ProductEvent));

            // Add the member update consumer if enabled in settings.
            if (memberEndPointSettings is { Enabled: true })
            {
                x.AddConsumer<MemberEntityEventConsumer>();
            }

            if (productEndpointSettings is { Enabled: true })
            {
                x.AddConsumer<ProductEntityEventConsumer>();
            }

            x.UsingAzureServiceBus((context, cfg) =>
            {
                // Base connection string for the service bus.
                cfg.Host(settings.BusConnectionString);

                // Message retry settings.
                cfg.UseMessageRetry(r => r.Interval(settings.GlobalRetryCount, TimeSpan.FromSeconds(settings.GlobalRetryDelaySeconds)));

                // Scheduler Redelivery timing.
                cfg.UseScheduledRedelivery(r => r.Intervals(settings.SchedulerRetryDelaySeconds.Select(z => TimeSpan.FromMinutes(z)).ToArray()));

                // Use configured message scheduler.
                cfg.UseMessageScheduler(settings.GetSchedulerSendEndpointUri());

                var subscriptionNameGenerator = context.GetRequiredService<ISubscriptionNameGenerator>();

                // Configure the member subscription if it's enabled.
                if (memberEndPointSettings is { Enabled: true })
                {
                    // Configure the member subscription endpoint.
                    cfg.SubscriptionEndpoint<EntityEvent<MemberEvent>>(subscriptionNameGenerator.GetSubscriptionName<EntityEvent<MemberEvent>>(), e =>
                    {
                        e.Rule = new CreateRuleOptions
                        {
                            Name = $"Filter{settings.BusEventSource}Events",
                            Filter = new SqlRuleFilter($"{nameof(EntityEvent<MemberEvent>.Source)} <> '{settings.BusEventSource}' AND {nameof(EntityEvent<MemberEvent>.Originator)} <> '{settings.BusEventSource}'")
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
                            e.UseConcurrencyLimit(memberEndPointSettings.ConcurrencyLimitSettings.ConcurrencyLimit);
                        }
                    });
                }

                if (productEndpointSettings is { Enabled: true })
                {
                    cfg.SubscriptionEndpoint<EntityEvent<ProductEvent>>(subscriptionNameGenerator.GetSubscriptionName<EntityEvent<ProductEvent>>(), e =>
                    {
                        e.Rule = new CreateRuleOptions
                        {
                            Name = $"Filter{settings.BusEventSource}Products",
                            Filter = new SqlRuleFilter($"{nameof(EntityEvent<ProductEvent>.Source)} <> '{settings.BusEventSource}' AND {nameof(EntityEvent<ProductEvent>.Originator)} <> '{settings.BusEventSource}'")
                        };
                        e.ConfigureConsumer<ProductEntityEventConsumer>(context, options =>
                        {
                            options.UseMessageRetry(r => r.Interval(5, 400).Handle<TransientException>());
                        });

                        // Configure rate limiting if enabled for this subscription endpoint.
                        if (productEndpointSettings.RateLimitSettings is { Enabled: true })
                        {
                            e.UseRateLimit(productEndpointSettings.RateLimitSettings.RateLimit, TimeSpan.FromSeconds(memberEndPointSettings.RateLimitSettings.IntervalSeconds));
                        }

                        // Configure concurrency limit if enabled for this subscription endpoint.
                        if (productEndpointSettings.ConcurrencyLimitSettings is { Enabled: true })
                        {
                            e.UseConcurrencyLimit(productEndpointSettings.ConcurrencyLimitSettings.ConcurrencyLimit);
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
