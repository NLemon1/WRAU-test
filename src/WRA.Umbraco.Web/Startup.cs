using MassTransit;
using NPoco.FluentMappings;
using WRA.Umbraco.Configurations;
using WRA.Umbraco.Contracts;
using WRA.Umbraco.Events.ServiceBusSubscriptions.Consumers;
using WRA.Umbraco.Events.ServiceBusSubscriptions.Publisher;
using WRA.Umbraco.Extensions.ServiceBus;
using WRA.Umbraco.Infrastructure.Messaging;
using WRA.Umbraco.UmbracoExtensions;
using WRA.Umbraco.Models.Custom.Events;
using WRA.Umbraco.Web.Services;
using Serilog;
using WRA.Umbraco.Events.ServiceBusSubscriptions;
using WRA.Umbraco.Helpers;
using WRA.Umbraco.Repositories;
using ILogger = Serilog.ILogger;
using IMemberEvent = WRA.Umbraco.Contracts.IMember;
using MemberEvent = WRA.Umbraco.Models.Custom.Events.Member;



namespace WRA.Umbraco.Web
{
    public class Startup
    {
        private readonly IWebHostEnvironment _env;
        private readonly IConfiguration _config;
        private static readonly ILogger _logger = Log.ForContext(typeof(Startup));


        /// <summary>
        /// Initializes a new instance of the <see cref="Startup" /> class.
        /// </summary>
        /// <param name="webHostEnvironment">The web hosting environment.</param>
        /// <param name="config">The configuration.</param>
        /// <remarks>
        /// Only a few services are possible to be injected here https://github.com/dotnet/aspnetcore/issues/9337.
        /// </remarks>
        public Startup(IWebHostEnvironment webHostEnvironment, IConfiguration config)
        {
            _env = webHostEnvironment ?? throw new ArgumentNullException(nameof(webHostEnvironment));
            _config = config ?? throw new ArgumentNullException(nameof(config));
        }

        /// <summary>
        /// Configures the services.
        /// </summary>
        /// <param name="services">The services.</param>
        /// <remarks>
        /// This method gets called by the runtime. Use this method to add services to the container.
        /// For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940.
        /// </remarks>
        public void ConfigureServices(IServiceCollection services)
        {
            // custom services
            services.AddScoped<GatedContentService>();
            services.AddScoped<WraExternalApiService>();
            services.AddScoped<WraMemberManagementService>();
            services.AddScoped<IMemberEvent, MemberEvent>();
            
            services.AddSingleton<IProductManagementService, WraProductManagementService>();
            services.AddSingleton<IBusEndpointProvider, SubscriptionEndpointProvider>();

            services.AddTransient<MemberHelper>();
            services.AddTransient<SearchService>();
            services.AddTransient<WraProductService>();
            services.AddTransient<MemberEventPublisher>();
            services.AddTransient<TopicEndpointProvider>();
            
            // repositories
            services.AddTransient<CompanyRepository>();
            services.AddTransient<BoardRepository>();
            services.AddTransient<CompanyRepository>();

            var settings = _config.GetSection(nameof(MessagingSettings)).Get<MessagingSettings>();

            if (settings != null)
            {
                services.AddSingleton(settings);
            }
            // umbraco services
            services.AddUmbraco(_env, _config)
                .AddBackOffice()
                .AddWebsite()
                .AddWraStore()
                .AddDeliveryApi()
                .AddComposers()
                .AddWraNotifications()
                .ConfigureMySwaggerGen()
                .AddWraPasswordHashing()
                .Build();

            // services.AddSingleton<IPasswordHasher<MemberIdentityUser>, CustomMemberPasswordHasher<MemberIdentityUser>>();
            // services.AddHostedService<EntityEvent<MemberDto>>();
            services.AddMassTransit(x =>
            {
                var memberEndpointSettings = settings.GetEndPointSettings<Member>();

                x.SetKebabCaseEndpointNameFormatter();

                if (memberEndpointSettings?.Enabled == true)
                {
                    _logger.Information("Added {Consumer} Consumer", typeof(MemberUpdateConsumer).GetGenericTypeName());
                    x.AddConsumer<MemberUpdateConsumer>();
                }

                x.UsingAzureServiceBus((context, cfg) =>
                {
                    if (settings != null)
                    {
                        cfg.Host(settings.BusConnectionString);
                        // cfg.ConfigureEndpoints(context);
                        // Base Service Bus connection string.
                        // Global Retry policy
                        cfg.UseMessageRetry(r => r.Interval(settings.GlobalRetryCount, TimeSpan.FromSeconds(settings.GlobalRetryDelaySeconds)));
                        // Global Exception handling
                        cfg.UseScheduledRedelivery(r => r.Intervals(settings.GetSchedulerRetryIntervals()));
                        cfg.UseMessageScheduler(settings.GetSchedulerSendEndpointUri());

                        // Member Subscription
                    }
                    var busEndpointProvider = new SubscriptionEndpointProvider(settings);
                    var subscription = busEndpointProvider.GetSubscriptionEndpoint<IEntityEvent<IMemberEvent>>();
                    
                    var memberSettings = settings.GetEndPointSettings<MemberEvent>();
                    if (memberSettings is { Enabled: true })
                    {
                        cfg.SubscriptionEndpoint<IEntityEvent<IMemberEvent>>(subscription, e =>
                        {
                            e.ConfigureConsumer<MemberUpdateConsumer>(context);
                            e.UseRateLimit(1000, TimeSpan.FromSeconds(5));
                            e.UseConcurrencyLimit(1);
                        });
                    }

                    // It's a good practice to also configure a message scheduler for scheduled delivery
                    cfg.UseServiceBusMessageScheduler();
                    cfg.ConfigureEndpoints(context);
                });

            });
        }

        /// <summary>
        /// Configures the application.
        /// </summary>
        /// <param name="app">The application builder.</param>
        /// <param name="env">The web hosting environment.</param>
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment() || _env.EnvironmentName == "Local")
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHttpsRedirection();
                app.UseExceptionHandler("/error");
            }

            app.UseUmbraco()
                .WithMiddleware(u =>
                {
                    u.UseBackOffice();
                    u.UseWebsite();
                })
                .WithEndpoints(u =>
                {
                    u.UseInstallerEndpoints();
                    u.UseBackOfficeEndpoints();
                    u.UseWebsiteEndpoints();
                });

        }
    }
}
