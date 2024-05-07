using Hangfire;

namespace WRA.Umbraco.BackgroundJobs;

public class HangFireTasks
{
    public void CleanFailedJobs()
    {
        var api = JobStorage.Current.GetMonitoringApi();
        int limit = 10000;
        var failedJobs = api.FailedJobs(0, limit /* limit */);

        while (failedJobs.Count > 0)
        {
            foreach (var job in failedJobs)
            {
                BackgroundJob.Delete(job.Key);
            }
        }
    }
}