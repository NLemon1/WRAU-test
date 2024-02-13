public interface ISubscriptionServiceSettings
{
    string AzureUrl { get; set; }
    string TopicName { get; set; }
    string SubscriptionName { get; set; }
    string BaseUrl { get; set; }
}