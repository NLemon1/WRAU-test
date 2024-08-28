namespace WRA.Umbraco.Configuration.Settings;

public class SeqSettings : IConfigurationSettings
{
    public bool Enabled { get; set; } = false;

    required public string ServerUrl { get; init; }

    required public string ApiKey { get; init; }
}

