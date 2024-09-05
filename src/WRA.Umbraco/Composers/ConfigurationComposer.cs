using Microsoft.Extensions.DependencyInjection;
using Umbraco.Cms.Core.Composing;
using WRA.Umbraco.Configuration;
using WRA.Umbraco.Configuration.Settings;
using WRA.Umbraco.Extensions;
using WRA.Umbraco.Shared.Messaging;

namespace WRA.Umbraco.Composers;


[ComposeBefore(typeof(CustomServiceComposer))]
public class ConfigurationComposer() : IComposer
{
    private readonly ILogger _logger = Log.Logger.ForContext<ConfigurationComposer>();

    public void Compose(IUmbracoBuilder builder)
    {
        // Register all our settings with the DI container as singletons.
        // Easy injection to services but for some of these we may way to move to options pattern.

        // #erictodo - Extract this to this project or move IConfigurationSettings to the shared project
        RegisterSettings<MessagingSettings>(builder);

        RegisterSettings<DateFolderSettings>(builder);
        RegisterSettings<RecurringJobSettings>(builder);
        RegisterSettings<GatedContentSettings>(builder);
        RegisterSettings<WraExternalApiSettings>(builder);
        RegisterSettings<ApiSettings>(builder);
        RegisterSettings<TaxJarApiSettings>(builder);
        RegisterSettings<RecurringJobSettings>(builder);

        // Configure some settings so we can change the keys live
        ConfigureSettings<RecaptchaSettings>(builder);

    }

    private void RegisterSettings<T>(IUmbracoBuilder builder)

    // #erictodo - restrict this to IConfigurationSettings once we resolve message settings.
    where T : class // , IConfigurationSettings
    {
        T settings = builder.Config.GetRequiredSection<T>();
        builder.Services.AddSingleton(settings);
        _logger.Debug("{SettingsName} settings registered. (Singleton)", typeof(T).Name);
    }

    private void ConfigureSettings<T>(IUmbracoBuilder builder)
    where T : class, IConfigurationSettings
    {
        var configurationSection = builder.Config.GetRequiredConfigurationSection<T>();
        builder.Services.Configure<T>(configurationSection);
        _logger.Debug("{SettingsName} settings configured. (Options Pattern)", typeof(T).Name);
    }
}
