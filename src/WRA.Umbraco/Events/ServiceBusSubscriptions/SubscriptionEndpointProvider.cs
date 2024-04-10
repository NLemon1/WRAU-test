using WRA.Umbraco.Extensions.ServiceBus;
using WRA.Umbraco.Infrastructure.Messaging;

namespace WRA.Umbraco.Events.ServiceBusSubscriptions;

public interface IBusEndpointProvider
{
    public string GetSubscriptionEndpoint<T>();
    public Task<string> GetSubscriptionEndpointAsync<T>();
}

public class SubscriptionEndpointProvider(MessagingSettings settings) : IBusEndpointProvider
{

    private readonly MessagingSettings _settings = settings ?? throw new ArgumentNullException(nameof(settings));

    /// <summary>
    /// Generates a subscription name for a given type, adhering to specified naming conventions.
    /// Incorporates settings for prefix, alias, and suffix, ensuring a consistent format.
    /// </summary>
    /// <typeparam name="T">The type for which to generate the subscription name.</typeparam>
    /// <returns>A string representing the formatted subscription name.</returns>
    public string GetSubscriptionEndpoint<T>()
    {
        var parts = new List<string>
        {
            _settings.ApplicationSubscriptionPrefix.TrimEnd('_'),
            typeof(T).GetSanitizedGenericTypeName(),
            _settings.ApplicationSubscriptionAlias.Trim('_'),
            _settings.ApplicationSubscriptionSuffix.TrimStart('_')
        };

        // Ensuring the final name is cleanly formatted, joining parts with underscores.
        return string.Join("_", parts.Where(part => !string.IsNullOrEmpty(part)));
    }

    public async Task<string> GetSubscriptionEndpointAsync<T>()
    {
        return await Task.FromResult(GetSubscriptionEndpoint<T>());
    }
}