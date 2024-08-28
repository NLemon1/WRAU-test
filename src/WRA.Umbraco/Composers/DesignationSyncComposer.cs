using Hangfire;
using Hangfire.Console;
using Hangfire.Server;
using Microsoft.Extensions.DependencyInjection;
using Umbraco.Cms.Core.Composing;
using Umbraco.Cms.Core.Sync;
using Umbraco.Cms.Core.Web;
using Umbraco.Cms.Infrastructure.Sync;
using WRA.Umbraco.Web.Dtos.External;
using WRA.UmbracoBridgeServices;
using WRA.Umbraco.Helpers.Constants;
using Umbraco.Cms.Core.Mapping;
using Cultiv.Hangfire;
using WRA.Umbraco.Configuration;
using WRA.Umbraco.Extensions;
using WRA.Umbraco.Exceptions;
using Microsoft.Extensions.Configuration;
using WRA.Umbraco.Configuration.Settings;

namespace WRA.Umbraco.Composers;

[ComposeAfter(typeof(HangfireComposer))]
public class DesignationSyncComposer : IComposer
{
    public void Compose(IUmbracoBuilder builder)
    {
        // Retrieve Settings
        RecurringJobSettings settings = builder.Config.GetRequiredSection<RecurringJobSettings>();

        // If all jobs are disabled return before registering.
        if (settings.DisableJobs) return;

        // Register the scheduler in DI as a scoped job runner.
        builder.Services.AddScoped<IDesignationSyncJob, DesignationSyncJob>();

        RecurringJob.AddOrUpdate<IDesignationSyncJob>(
            "Sync all Designations",
            x => x.SyncDesignationsAsync(null),
            settings.AllJobsManual ? Cron.Never : Cron.Daily);

    }
}

public interface IDesignationSyncJob
{
    Task SyncDesignationsAsync(PerformContext? context = null);
}

public class DesignationSyncJob : IDesignationSyncJob
{
    private readonly IServiceProvider _serviceProvider;
    private readonly IUmbracoContextFactory _umbracoContextFactory;
    private readonly IServerMessenger _serverMessenger;
    private readonly IUmbracoBridgeServiceClient _umbracoBridgeServiceClient;
    private readonly ILogger _logger;
    private readonly IUmbracoMapper _umbracoMapper;

    public DesignationSyncJob(
        IServiceProvider serviceProvider,
        IUmbracoContextFactory umbracoContextFactory,
        IServerMessenger serverMessenger,
        IUmbracoBridgeServiceClient umbracoBridgeServiceClient,
        IUmbracoMapper umbracoMapper,
        ILogger logger)
    {
        _serviceProvider = serviceProvider;
        _umbracoContextFactory = umbracoContextFactory;
        _serverMessenger = serverMessenger;
        _umbracoBridgeServiceClient = umbracoBridgeServiceClient;
        _umbracoMapper = umbracoMapper;
        _logger = logger;
    }

    public async Task SyncDesignationsAsync(PerformContext? context = null)
    {
        using var backgroundScope = new BackgroundScope(_serverMessenger);
        using var umbracoContext = _umbracoContextFactory.EnsureUmbracoContext();
        using var serviceScope = _serviceProvider.CreateScope();
        var designationRepository = serviceScope.ServiceProvider.GetRequiredService<DesignationRepository>();

        context?.WriteLine("Starting designation sync...");

        using var activity = _logger.StartActivity(LogEventLevel.Information, "Umbraco Background Job - {Job}:{Method}", nameof(DesignationSyncJob), nameof(SyncDesignationsAsync));
        try
        {
            // Fetch designations from API (this remains async)
            var apiDesignations = await _umbracoBridgeServiceClient.Designation_GetDesignationListAsync();
            context?.WriteLine($"Fetched {apiDesignations.Count} designations from API");

            // Use Task.Run for the synchronous operations
            await Task.Run(() =>
            {
                // Fetch existing Umbraco designations
                var umbracoDesignations = designationRepository.GetAllDesignations().ToList();
                context?.WriteLine($"Found {umbracoDesignations.Count} existing designations in Umbraco");

                // Create or update designations
                foreach (var apiDesignation in apiDesignations)
                {
                    var extDesignation = _umbracoMapper.Map<DesignationDto, ExternalDesignationDto>(apiDesignation);
                    if (extDesignation == null)
                    {

                        context?.WriteLine($"Failed to map the api designation to the dto required for creation. {apiDesignation.Name}");
                        _logger.Warning("Failed to map the api designation to the dto required for creation. {DesignationName}", apiDesignation.Name);
                        continue;
                    }

                    // Check if designation already exists.
                    var umbracoDesignation = umbracoDesignations.Find(d => d.Value<Guid>(GlobalConstants.ExternalId) == apiDesignation.Id);

                    if (umbracoDesignation == null)
                    {
                        // Create new designation
                        var newDesignation = designationRepository.CreateOrUpdateDesignation(extDesignation);
                        _logger.Debug("Created new designation: {DesignationName}", newDesignation?.Name);
                        context?.WriteLine($"Created new designation: {newDesignation?.Name}");
                    }
                    else
                    {
                        // Update existing designation
                        var updatedDesignation = designationRepository.CreateOrUpdateDesignation(extDesignation);
                        _logger.Debug("Created new designation: {DesignationName}", extDesignation.Name);
                        context?.WriteLine($"Updated designation: {updatedDesignation?.Name}");
                    }
                }

                // Delete designations that no longer exist in the API
                var designationsToDelete = umbracoDesignations.Where(d => !apiDesignations.Any(a => a.Id == d.Value<Guid>(GlobalConstants.ExternalId)));
                foreach (var designationToDelete in designationsToDelete)
                {
                    var deleted = designationRepository.DeleteDesignation(designationToDelete.Value<Guid>(GlobalConstants.ExternalId));
                    if (deleted)
                    {
                        _logger.Debug("Deleted designation: {DesignationName}", designationToDelete.Name);
                        context?.WriteLine($"Deleted designation: {designationToDelete.Name}");
                    }
                    else
                    {
                        _logger.Warning("Failed to delete designation: {DesignationName}", designationToDelete.Name);
                        context?.WriteLine($"Failed to delete designation: {designationToDelete.Name}");
                    }
                }
            });

            activity.Complete();
            _logger.Debug("Designation sync completed successfully");
            context?.WriteLine("Designation sync completed successfully");
        }
        catch (Exception ex)
        {
            _logger.Error(ex, "Failed to sync designations from bridge api to umbraco cloud.");
            activity.Complete(LogEventLevel.Error, ex);
            context?.SetTextColor(ConsoleTextColor.Red);
            context?.WriteLine($"Error during designation sync: {ex.Message}");
            context?.ResetTextColor();
        }
    }
}

public class BackgroundScope : IDisposable
{
    private readonly IServerMessenger _serverMessenger;
    private bool _disposed = false;

    public BackgroundScope(IServerMessenger serverMessenger)
    {
        _serverMessenger = serverMessenger;
    }

    protected virtual void Dispose(bool disposing)
    {
        if (!_disposed)
        {
            if (disposing)
            {
                // Dispose managed state
                if (_serverMessenger is BatchedDatabaseServerMessenger batchedDatabaseServerMessenger)
                {
                    batchedDatabaseServerMessenger.SendMessages();
                }
            }

            // Free unmanaged resources (unmanaged objects) and override finalizer
            // Set large fields to null

            _disposed = true;
        }
    }

    // Override finalizer only if 'Dispose(bool disposing)' has code to free unmanaged resources
    ~BackgroundScope()
    {
        Dispose(disposing: false);
    }

    public void Dispose()
    {
        // Dispose of unmanaged resources and suppress finalization
        Dispose(disposing: true);
        GC.SuppressFinalize(this);
    }
}