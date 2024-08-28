using System.Text.RegularExpressions;

namespace WRA.Umbraco.Configuration.Settings;
public class WraExternalApiSettings : IConfigurationSettings
{
    public string BaseUrl { get; set; } = string.Empty;

    // Used by the NSwag Generated Bridge clients HttpClient.
    // goto:UmbracoBridgeServiceClient.cs
    // goto:CustomServiceComposer.cs
    public string SwaggerBaseUrl => string.IsNullOrEmpty(BaseUrl) ? string.Empty : Regex.Replace(BaseUrl, "api$", string.Empty, RegexOptions.IgnoreCase);

    public string VersionedBaseUrl => string.IsNullOrEmpty(BaseUrl) ? string.Empty : $"{BaseUrl}/v{ApiVersion}";

    public string ApiKey { get; set; } = string.Empty;

    public int ApiVersion { get; set; } = 1;

    public string ApiKeyHeader { get; set; } = string.Empty;
}
