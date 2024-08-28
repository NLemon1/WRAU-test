using Microsoft.Extensions.Configuration;
using WRA.Umbraco.Exceptions;

namespace WRA.Umbraco.Extensions;

public static class ConfigurationExtensions
{
    /// <summary>
    /// Gets a required section from the application configuration or throws an exception.
    /// </summary>
    /// <typeparam name="T">The settings model type to bind to.</typeparam>
    /// <param name="configuration">Application IConfiguration object.</param>
    /// <param name="sectionName">Only need if the name of the section does not match the nameof for the Settings model.</param>
    /// <returns>A strongly typed model containing the configuration that was bound.</returns>
    /// <exception cref="ApplicationConfigurationException">Failed to load required configuration section.</exception>
    public static T GetRequiredSection<T>(this IConfiguration configuration, string? sectionName = null)
         where T : class
    {
        try
        {
            sectionName ??= typeof(T).Name;
            return configuration.GetSection(sectionName).Get<T>() ?? throw new ApplicationConfigurationException($"Failed to load {sectionName} settings from application configuration.");
        }
        catch (ApplicationConfigurationException)
        {
            throw;
        }
        catch (Exception ex)
        {
            throw new ApplicationConfigurationException($"Failed to load {sectionName} settings from application configuration.", ex);
        }
    }

    /// <summary>
    /// Gets a required configuration section for use with the options pattern or throws an exception.
    /// </summary>
    /// <typeparam name="T">The settings model type associated with the section.</typeparam>
    /// <param name="configuration">Application IConfiguration object.</param>
    /// <param name="sectionName">Only needed if the name of the section does not match the name of the settings model.</param>
    /// <returns>An IConfigurationSection that can be used with the options pattern.</returns>
    /// <exception cref="ApplicationConfigurationException">Failed to load required configuration section.</exception>
    public static IConfigurationSection GetRequiredConfigurationSection<T>(this IConfiguration configuration, string? sectionName = null)
        where T : class
    {
        try
        {
            sectionName ??= typeof(T).Name;
            var section = configuration.GetSection(sectionName);

            if (section.Exists())
            {
                return section;
            }
            else
            {
                throw new ApplicationConfigurationException($"Failed to load {sectionName} section from application configuration.");
            }
        }
        catch (ApplicationConfigurationException)
        {
            throw;
        }
        catch (Exception ex)
        {
            throw new ApplicationConfigurationException($"Failed to load {sectionName} section from application configuration.", ex);
        }
    }
}
