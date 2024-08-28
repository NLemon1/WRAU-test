using WRA.Umbraco.Configuration.Settings;

namespace WRA.Umbraco.Filters;

public class ApiKeyValidator(ApiSettings apiSettings) : IApiKeyValidator
{
    public bool IsValid(string apiKey)
    {
        return apiKey == apiSettings.ApiKey;
    }
}

public interface IApiKeyValidator
{
    bool IsValid(string apiKey);
}