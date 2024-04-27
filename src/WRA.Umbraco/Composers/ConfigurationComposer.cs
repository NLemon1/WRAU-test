using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Umbraco.Cms.Core.Composing;
using WRA.Umbraco.Configuration;
using WRA.Umbraco.Exceptions;
using WRA.Umbraco.Shared.Messaging;

namespace WRA.Umbraco.Composers;

[ComposeBefore(typeof(CustomServiceComposer))]
public class ConfigurationComposer : IComposer
{
    public void Compose(IUmbracoBuilder builder)
    {
        // Retrieve messaging settings
        MessagingSettings messagingSettings = builder.Config.GetSection(nameof(MessagingSettings)).Get<MessagingSettings>() ?? throw new ApplicationConfigurationException(nameof(MessagingSettings));

        // Bind messaging settings to a singleton (one per application lifetime)
        builder.Services.AddSingleton(messagingSettings);

        // Retrieve date folder settings
        DateFolderSettings dateFolderSettings = builder.Config.GetSection(nameof(DateFolderSettings)).Get<DateFolderSettings>() ?? throw new ApplicationConfigurationException(nameof(DateFolderSettings));

        // Bind date folder settings to a singleton (one per application lifetime)
        builder.Services.AddSingleton(dateFolderSettings);

        // Retrieve gated content settings
        GatedContentSettings gatedContentSettings = builder.Config.GetSection(nameof(GatedContentSettings)).Get<GatedContentSettings>() ?? throw new ApplicationConfigurationException(nameof(GatedContentSettings));

        // Bind gated content settings as a singleton (one per application lifetime)
        builder.Services.AddSingleton(gatedContentSettings);

        // Retrieve external API settings
        WraExternalApiSettings externalApiSettings = builder.Config.GetSection(nameof(WraExternalApiSettings)).Get<WraExternalApiSettings>() ?? throw new ApplicationConfigurationException(nameof(WraExternalApiSettings));

        // Bind external API settings as a singleton (one per application lifetime)
        builder.Services.AddSingleton(externalApiSettings);

        // SiteContentSettings  siteContentSettings = builder.Config.GetSection(nameof(SiteContentSettings)).Get<SiteContentSettings>() ?? throw new ApplicationConfigurationException(nameof(SiteContentSettings));

        // builder.Services.AddSingleton(siteContentSettings);

    }
}
