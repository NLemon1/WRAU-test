using Serilog;
using WRA.Umbraco.UmbracoExtensions;
using ILogger = Serilog.ILogger;

namespace WRA.Umbraco.Web;

public class Startup
{
    private readonly IWebHostEnvironment _env;
    private readonly IConfiguration _config;
    private readonly ILogger _logger;

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

        _logger = Log.ForContext(typeof(Startup));
        _logger.Information("Starting application: {Environment}", _env.EnvironmentName);
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
        // Only add response compression in non-development environments
        if (!_env.IsDevelopment() && _env.EnvironmentName != "Local")
        {
            _logger.Information("Response Compression Enabled.");
            services.AddResponseCompression(options => options.EnableForHttps = true);
        }

        // umbraco services
        IUmbracoBuilder? builder = services.AddUmbraco(_env, _config)
        .AddBackOffice()
        .AddWebsite()
        .AddWraStore()
        .AddDeliveryApi()
        .AddComposers()
        .AddWraNotifications();

        // Enables using 'Async' suffix in action names with nameof.
        // Necessary because ASP.NET Core MVC strips 'Async' suffix by default.
        builder.Services.AddMvc(options =>
        {
            options.SuppressAsyncSuffixInActionNames = false;
        });

        // Build the host.
        builder.Build();
        _logger.Information("Umbraco Services Built Successfully");
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
            app.UseResponseCompression();
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

                LogRoutes(u.EndpointRouteBuilder, _logger);
            });

    }

    private void LogRoutes(IEndpointRouteBuilder endpoints, ILogger logger)
    {
        foreach (var endpoint in endpoints.DataSources.SelectMany(src => src.Endpoints))
        {
            if (endpoint is RouteEndpoint routeEndpoint && routeEndpoint.RoutePattern.RawText.Contains("umbraco/surface"))
            {
                logger.Information("SurfaceController Route: {RoutePattern}", routeEndpoint.RoutePattern.RawText);
            }
        }
    }
}
