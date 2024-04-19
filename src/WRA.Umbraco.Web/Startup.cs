using Serilog;
using WRA.Umbraco.UmbracoExtensions;
using ILogger = Serilog.ILogger;

namespace WRA.Umbraco.Web;

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
        _logger.Information("Starting up the application: {Environment}", _env.EnvironmentName);
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
        // umbraco services
        services.AddUmbraco(_env, _config)
        .AddBackOffice()
        .AddWebsite()
        .AddWraStore()
        .AddDeliveryApi()
        .AddComposers()
        .AddWraNotifications()
        .Build();
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
