namespace WRA.Umbraco.Configuration.Settings;

public partial class ApiSettings : IConfigurationSettings
{
    public Uri? BaseAddress { get; init; }

    public string? ApiKeyHeaderName { get; init; }

    public string? ApiKey { get; init; }

    public Dictionary<string, string> DefaultRequestHeaders { get; init; } = [];
}