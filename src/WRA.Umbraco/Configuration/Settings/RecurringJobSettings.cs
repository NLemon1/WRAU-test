namespace WRA.Umbraco.Configuration.Settings;

public class RecurringJobSettings : IConfigurationSettings
{
    public bool AllJobsManual { get; set; }

    public bool DisableJobs { get; set; }
}