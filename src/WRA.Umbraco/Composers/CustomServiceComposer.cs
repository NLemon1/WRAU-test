using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using Polly;
using Umbraco.Cms.Core.Composing;
using Umbraco.Cms.Core.Security;
using Umbraco.Commerce.Extensions;
using WRA.Umbraco.BackOffice;
using WRA.Umbraco.Commerce.Adjustments;
using WRA.Umbraco.Configuration.Settings;
using WRA.Umbraco.Contracts;
using WRA.Umbraco.Events.Publishers;
using WRA.Umbraco.Extensions;
using WRA.Umbraco.Filters;
using WRA.Umbraco.Repositories;
using WRA.Umbraco.Services.Caching;
using WRA.Umbraco.Shared.Messaging;
using WRA.Umbraco.Web.Services;
using WRA.UmbracoBridgeServices;
using MemberRepository = WRA.Umbraco.Repositories.MemberRepository;

namespace WRA.Umbraco.Composers;

[ComposeAfter(typeof(DateFolderComposer))]
public class CustomServiceComposer : IComposer
{
    [Obsolete("Fix Tax Jar Registration")]
    public void Compose(IUmbracoBuilder builder)
    {

        // Register the CacheKeyProvider as a singleton one instance per application lifetime.
        builder.Services.AddSingleton<ICacheKeyProvider, CacheKeyProvider>();

        // Register the GatedContentService as scoped (one instance per request).
        builder.Services.AddScoped<GatedContentService>();

        // Register the WRA external API service as singleton (one instance per lifetime, no state in this).
        builder.Services.AddSingleton<WraExternalApiService>();

        // Register umbraco member helper service as transient (different instance every time it's requested).
        // #erictodo Check these over again for scope issues.
        builder.Services.AddScoped<MemberHelper>();
        builder.Services.AddScoped<ProductHelper>();
        builder.Services.AddScoped<CategoryHelper>();
        builder.Services.AddSingleton<MappingHelper>();
        builder.Services.AddScoped<SubscriptionHelper>();

        // Register the WRA external API service as scoped (one instance per request).
        builder.Services.AddScoped<WraMemberManagementService>();
        builder.Services.AddScoped<MemberDuesService>();
        builder.Services.AddScoped<WraProductManagementService>();
        builder.Services.AddScoped<MemberOrderHistoryService>();
        builder.Services.AddScoped<MemberDonationService>();
        builder.Services.AddScoped<CourseService>();
        builder.Services.AddScoped<MemberMarketingSubscriptionService>();
        builder.Services.AddScoped<MemberCommitteesService>();
        builder.Services.AddScoped<WraShippingService>();

        // Register the TaxJar API service
        builder.Services.AddScoped<TaxJarExternalApiService>();

        // Binds IMember event to APIs member DTO.
        builder.Services.AddScoped<MemberEvent>();

        // Register the search service as transient (different instance every time its requested).
        builder.Services.AddTransient<SearchService>();

        // Register the WRA product service as a transient (different instance every time it's requested).
        builder.Services.AddTransient<WraProductService>();

        // Register data repositories as transient (different instance every time it's requested).
        builder.Services.AddTransient<CompanyRepository>();
        builder.Services.AddTransient<BoardRepository>();
        builder.Services.AddTransient<ProductPageRepository>();
        builder.Services.AddTransient<MemberRepository>();
        builder.Services.AddTransient<CategoryRepository>();
        builder.Services.AddTransient<MemberGroupRepository>();
        builder.Services.AddTransient<TaxonomyRepository>();
        builder.Services.AddTransient<OrderRepository>();
        builder.Services.AddTransient<DesignationRepository>();
        builder.Services.AddTransient<StateOrProvinceRepository>();
        builder.Services.AddTransient<LanguageRepository>();

        // Register the Bridge API Client and configure it's underlying HttpClient.
        RegisterAndConfigureBridgeApi(builder);

        // Register the reCAPTCHA API Client and configure it's underlying HttpClient.
        RegisterAndConfigureRecaptchaApi(builder);

        // Generic repositories
        builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));

        builder.Services.AddTransient<MemberEventPublisher>();
        builder.Services.AddTransient<ProductEventPublisher>();
        builder.Services.AddTransient<OrderEventPublisher>();

        // custom table repositories

        // Register the Member password hasher as a singleton (one instance per application lifetime).
        builder.Services.AddSingleton<IPasswordHasher<MemberIdentityUser>, CustomMemberPasswordHasher<MemberIdentityUser>>();

        // Register the Service bus subscription name generator as a singleton (one instance per application lifetime).
        builder.Services.AddSingleton<ISubscriptionNameGenerator, AzureSubscriptionNameGenerator>();

        // Api Authorization
        builder.Services.AddSingleton<IApiKeyValidator, ApiKeyValidator>();
        builder.Services.AddTransient<ApiKeyAuthorizationFilter>();

        // #todolightburn this is obsolete.
        builder.WithPriceAdjusters().Append<TaxJarAdjuster>();

        builder.Services.AddMemoryCache();
    }

    /// <summary>
    /// Registers the Bridge service as transient, configures named http client, configures resiliency policies.
    /// </summary>
    /// <param name="builder">The Umbraco builder.</param>
    private void RegisterAndConfigureBridgeApi(IUmbracoBuilder builder)
    {
        // Umbraco Bridge API Client Setup.
        WraExternalApiSettings? bridgeSettings = builder.Config.GetRequiredSection<WraExternalApiSettings>();
        builder.Services.AddHttpClient<IUmbracoBridgeServiceClient, UmbracoBridgeServiceClient>()
        .ConfigureHttpClient(client =>
        {
            // WRA Bridge Service - Generated from https://app2.wra.org/umbraco/swagger/v1/swagger.json
            client.BaseAddress = new Uri(bridgeSettings.SwaggerBaseUrl);
            client.DefaultRequestHeaders.Add(bridgeSettings.ApiKeyHeader, bridgeSettings.ApiKey);
            client.DefaultRequestHeaders.Add("Accept", "application/json");
        })

        // #erictodo - (move these to settings)
        // Keep the handler available for 5 minutes instead of 2, recreating it less often
        // Handler can be shared between requests even for transient services.
        // Retries request twice for transient errors with 500 ms delay.
        // Stops making requests after 5 failed attempts for 10 seconds, prevent flooding with bad requests.
        .SetHandlerLifetime(TimeSpan.FromMinutes(5))
        .AddTransientHttpErrorPolicy(builder => builder.WaitAndRetryAsync(2, _ => TimeSpan.FromMilliseconds(500)))
        .AddTransientHttpErrorPolicy(builder => builder.CircuitBreakerAsync(5, TimeSpan.FromSeconds(3)));

        // Explicitly register the service as transient so it overrides the automatic scoped registration of AddHttpClient.
        builder.Services.AddTransient<IUmbracoBridgeServiceClient, UmbracoBridgeServiceClient>();
    }

    /// <summary>
    /// Registers the Recaptcha service as transient, configures named http client, configures resiliency policies.
    /// </summary>
    /// <param name="builder">The Umbraco builder.</param>
    private void RegisterAndConfigureRecaptchaApi(IUmbracoBuilder builder)
    {
        // Google reCAPTCHA API Client Setup
        RecaptchaSettings? recaptchaSettings = builder.Config.GetRequiredSection<RecaptchaSettings>();
        builder.Services.AddHttpClient<IRecaptchaService, RecaptchaService>()
        .ConfigureHttpClient(client =>
        {
            // Base url from api settings
            client.BaseAddress = new Uri(recaptchaSettings.DefaultEndpoint);
        })

        // #erictodo - (move these to settings)
        // Keep the handler available for 5 minutes instead of 2, recreating it less often
        // Handler can be shared between requests even for transient services.
        // Retries request twice for transient errors with 500 ms delay.
        // Stops making requests after 5 failed attempts for 3 seconds (It's google after all hammer away).
        .SetHandlerLifetime(TimeSpan.FromMinutes(5))
        .AddTransientHttpErrorPolicy(builder => builder.WaitAndRetryAsync(2, _ => TimeSpan.FromMilliseconds(500)))
        .AddTransientHttpErrorPolicy(builder => builder.CircuitBreakerAsync(5, TimeSpan.FromSeconds(3)));

        // Explicitly register as transient as AddHttpClient registered it as scoped.
        builder.Services.AddTransient<IRecaptchaService, RecaptchaService>();
    }
}