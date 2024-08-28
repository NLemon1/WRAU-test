using Serilog;
using Serilog.Events;
using Serilog.Templates.Themes;
using SerilogTracing;
using SerilogTracing.Expressions;
using System.Diagnostics;
using Umbraco.Cms.Core.Logging;
using Umbraco.Cms.Infrastructure.Logging.Serilog;
using WRA.Umbraco.Configuration.Settings;
using WRA.Umbraco.Extensions;

namespace WRA.Umbraco.Web;

public static class Program
{
    public static async Task Main(string[] args)
    {
        // Create a serilog bootstrap logger so we can capture and log
        // application startup and the bootstrap process. This logger is
        // replaced by the umbraco logger and eventually our custom logger.
        Log.Logger = new LoggerConfiguration()
            .MinimumLevel.Override("Microsoft", LogEventLevel.Warning)
            .Enrich.FromLogContext()
            .WriteTo.Debug(Formatters.CreateConsoleTextFormatter(TemplateTheme.Code), restrictedToMinimumLevel: LogEventLevel.Information)
            .WriteTo.Console(Formatters.CreateConsoleTextFormatter(TemplateTheme.Code), restrictedToMinimumLevel: LogEventLevel.Information)
            .CreateBootstrapLogger();

        // The umbraco application host.
        IHost? host = null;

        try
        {
            // Get the assembly name for logging purposes.
            string? assemblyName = System.Reflection.Assembly.GetExecutingAssembly().GetName().Name;
            Log.Information("Starting Application - {AssemblyName}", assemblyName);

            // Build and run the umbraco application host keeping a reference to it for the lifetime of the application
            host = CreateHostBuilder(args).Build();

            // Configures the activity listener to trace to the shared logger (whatever is configured).
            // It needs to exist for the lifetime of the application so we don't dispose of it.
            using IDisposable _ = new ActivityListenerConfiguration().TraceToSharedLogger();

            IHostApplicationLifetime lifetime = host.Services.GetRequiredService<IHostApplicationLifetime>();

            // Triggered at the beginning of the application stopping lifecycle.
            lifetime.ApplicationStopping.Register(() =>
            {
                Log.Information("Application shutdown initiated");

                // Dispose of any resources that are safe to dispose of early in the application stopping lifecycle.
                // Services may still be in use here so selection is key.
                try
                {
                    // Example : Dispose of a custom service that's safe to stop early
                    // var messagingBus = host.Services.GetRequiredService<IBus>();
                    // messagingBus.Stop(TimeSpan.FromSeconds(10));

                    // #todoeric Add any early shutdown logic here, such as:
                    // - Stopping background job processors
                    // - Closing non-critical network connections
                    // - Flushing in-memory caches to persistent storage

                    Log.Information("Early disposal of resources completed");
                }
                catch (Exception ex)
                {
                    Log.Error(ex, "Error during early resource disposal");
                }
            });

            lifetime.ApplicationStopped.Register(() =>
            {
                Log.Information("Umbraco Application has fully stopped");

                // It's safe to dispose of remaining resources here
                // However, be aware that some services might already be disposed

                // #todoeric  Add any final cleanup logic here, such as:
                // - File handlers are closed
                // - Logging any final application state
                // - Sending shutdown notifications to external systems

                Log.Information("Umbraco Final resource cleanup completed");
            });

            // Actually run the application.
            await host.RunAsync();
        }
        catch (Exception ex)
        {
            Log.Fatal(ex, "Unhandled exception occurred. The application will exit.");

            // Exit code 1 indicates an abnormal termination signaling the host to the state of the shutdown.
            Environment.Exit(1);
        }
        finally
        {
            if (host != null)
            {
                Log.Information("Application shutdown process starting");

                try
                {
                    // Attempt to stop the host gracefully
                    // The timeout here should be long enough to allow for graceful shutdown,
                    // but not so long that it delays terminating unnecessarily.
                    await host.StopAsync(TimeSpan.FromSeconds(30));
                    Log.Information("All hosted services stopped successfully");
                }
                catch (Exception ex)
                {
                    Log.Error(ex, "An error occurred while stopping the host");

                    // Don't throw from here so we can ensure the logs are flushed.
                }
            }

            Log.Information("Application shutdown process completed");

            // Ensure that all logs are flushed before the application exits
            // This is required for capturing shutdown logs.
            await Log.CloseAndFlushAsync();
        }
    }

    public static IHostBuilder CreateHostBuilder(string[] args) =>

        // Create the default .NET Generic Host builder
        Host.CreateDefaultBuilder(args)

        // Configure Umbraco-specific defaults
        // This sets up essential Umbraco services and configurations
        .ConfigureUmbracoDefaults()

        // Configure the web host within the generic host
        .ConfigureWebHostDefaults(webBuilder =>
        {
            // Enable static web assets (default AspNetCore feature)
            // This allows serving of static files from libraries and packages
            webBuilder.UseStaticWebAssets();

            // Use the custom Startup class for additional configuration
            // The Startup class is where you configure services and the app's request pipeline
            webBuilder.UseStartup<Startup>();

        // Call UseSerilog again (previously called in the UmbracoDefaults, with new settings)
        }).UseSerilog((context, services, configuration) =>
        {
            // Reconfigure the logger with the already configured umbraco settings
            // and additional logging and tracing.
            ConfigureSerilog(context, services, configuration);
        });

    /// <summary>
    /// Reconfigures the umbraco logger configuration, adding tracing, formatting and additional sinks.
    /// Umbraco file sink is reconfigured using the same appsettings, so back office logging works as expected.
    /// </summary>
    /// <param name="context">Host builder context.</param>
    /// <param name="services">IServiceProvider services.</param>
    /// <param name="configuration">Logger configuration from app settings.</param>
    private static void ConfigureSerilog(HostBuilderContext context, IServiceProvider services, LoggerConfiguration configuration)
    {
        try
        {
            // Seq logging https://seq.wra.services/
            SeqSettings seqSettings = context.Configuration.GetRequiredSection<SeqSettings>();

            // This is the umbraco logger configuration, only used for the log directory.
            ILoggingConfiguration? loggerConfig = services.GetRequiredService<ILoggingConfiguration>();

            // This is the umbraco logger file sink configuration. Contains the file size limits and rolling interval.
            UmbracoFileConfiguration? fileConfig = services.GetRequiredService<UmbracoFileConfiguration>();

            // This is the umbraco hosting environment.
            IHostEnvironment? env = context.HostingEnvironment;

            // Replace the serilog configuration after umbraco has configured it so we can add our own settings
            configuration
                .ReadFrom.Configuration(context.Configuration)
                .MinimumLevel.Verbose()
                .Enrich.WithProcessId()
                .Enrich.WithProcessName()
                .Enrich.WithThreadId()
                .Enrich.WithProperty("Environment", env.EnvironmentName)
                .Enrich.WithProperty("Application", env.ApplicationName)
                .Enrich.WithProperty("ApplicationId", $"{env.EnvironmentName}.{env.ApplicationName}")
                .Enrich.WithProperty("MachineName", Environment.MachineName)
                .Enrich.FromLogContext()

            // This is the same way umbraco configures its sink
            // ensuring logs are visible in umbraco back office.
            // The log file is built from the following environment variables set by umbraco
            // Environment variables: BASEDIR, UMBLOGDIR, MACHINENAME.
            // Default Filename Format: UmbracoTraceLog.MachineName.YYYYMMDD.json
            // Default Output Folder: umbraco\Logs
            .WriteTo.UmbracoFile(
                path: fileConfig.GetPath(loggerConfig.LogDirectory),
                fileSizeLimitBytes: fileConfig.FileSizeLimitBytes, // 1 GB
                rollOnFileSizeLimit: fileConfig.RollOnFileSizeLimit,
                retainedFileCountLimit: fileConfig.RetainedFileCountLimit,
                rollingInterval: fileConfig.RollingInterval,
                flushToDiskInterval: null)

             // Log to the console and debug outputs with tracing formatters and vscode like theme.
             .WriteTo.Debug(Formatters.CreateConsoleTextFormatter(TemplateTheme.Code), restrictedToMinimumLevel: LogEventLevel.Information)
             .WriteTo.Console(Formatters.CreateConsoleTextFormatter(TemplateTheme.Code), restrictedToMinimumLevel: LogEventLevel.Information)

             // Write to the seq sink, with url and api key from application settings.
             // This ships traces, spans, and logs to seq, using serilog and serilog tracing sinks.
             .WriteTo.Seq(
                 serverUrl: seqSettings.ServerUrl,
                 restrictedToMinimumLevel: LogEventLevel.Information,
                 apiKey: seqSettings.ApiKey);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"An error occurred while configuring Serilog: {ex.Message}");
            Debug.WriteLine($"An error occurred while configuring Serilog: {ex.Message}");
        }
    }
}
