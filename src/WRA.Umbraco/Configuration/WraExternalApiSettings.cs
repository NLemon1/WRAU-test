namespace WRA.Umbraco.Configuration;
public class WraExternalApiSettings
{
    public string BaseUrl { get; set; } = string.Empty;

    public string VersionedBaseUrl => string.IsNullOrEmpty(BaseUrl) ? string.Empty : $"{BaseUrl}/v{ApiVersion}";

    public string ApiKey { get; set; } = string.Empty;

    public int ApiVersion { get; set; } = 1;

    public string ApiKeyHeader { get; set; } = string.Empty;
}
