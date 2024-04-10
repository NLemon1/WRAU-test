using System.Globalization;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace WRA.Umbraco.Infrastructure.Messaging;

public partial class MessagingSettings
{
    public bool Enabled { get; set; }

    public string BusConnectionString { get; set; }

    public string ApplicationSubscriptionAlias { get; set; } = "API";

    public string ApplicationSubscriptionPrefix { get; set; } = string.Empty;

    public string ApplicationSubscriptionSuffix { get; set; } = "Subscription";

    public Uri BaseUrl { get; set; }

    public string SchedulerQueueName { get; set; }

    public List<int> SchedulerRetryDelaySeconds { get; set; }

    public int GlobalRetryCount { get; set; }

    public int GlobalRetryDelaySeconds { get; set; }

    public List<EndpointSettings> EndpointSettings { get; set; }

    public Uri GetSchedulerSendEndpointUri()
    {
        return new Uri($"queue:{SchedulerQueueName.ToLower()}");
    }

    public TimeSpan[] GetSchedulerRetryIntervals()
    {
        return SchedulerRetryDelaySeconds.Select(z => TimeSpan.FromSeconds(z)).ToArray();
    }

    public string GetBusConnectionStringWithAccessKey(string accessKey)
    {
        return BusConnectionString.Replace("{accessKey}", accessKey);
    }

    public EndpointSettings? GetEndPointSettings<T>()
    where T : class
    {
        return EndpointSettings.First(z => z.EntityName.Equals(typeof(T).Name, StringComparison.InvariantCultureIgnoreCase));
    }
}

public partial class EndpointSettings
{
    public bool Enabled { get; set; }

    public BusEndpointType? EndpointType { get; set; }

    public string EndpointName { get; set; }

    public string EntityName { get; set; }

    public string ReceiveEndpoint { get; set; }

    public string SendEndpoint { get; set; }

    public Uri GetSendEndpointUri()
    {
        return new Uri($"{EndpointType.ToString().ToLower()}:{EndpointName.ToLower()}");
    }
}

public enum BusEndpointType
{
    Queue,
    Topic
}

public partial class MessagingSettings
{
    public static MessagingSettings? FromJson(string json) => JsonConvert.DeserializeObject<MessagingSettings>(json, Converter.Settings);
}

public static class Serialize
{
    public static string ToJson(this MessagingSettings self) => JsonConvert.SerializeObject(self, WRA.Umbraco.Infrastructure.Messaging.Converter.Settings);
}

internal static class Converter
{
    public static readonly JsonSerializerSettings Settings = new()
    {
        MetadataPropertyHandling = MetadataPropertyHandling.Ignore,
        DateParseHandling = DateParseHandling.None,
        Converters =
            {
                new IsoDateTimeConverter { DateTimeStyles = DateTimeStyles.AssumeUniversal }
            },
    };
}