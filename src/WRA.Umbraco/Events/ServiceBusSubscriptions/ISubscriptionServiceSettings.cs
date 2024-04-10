public interface ISubscriptionServiceSettings
{
    string SubscriptionEndpoint { get; set; }
    string TopicName { get; set; }
    string SubscriptionName { get; set; }
    string BaseUrl { get; set; }
    bool Enabled { get; set; }

}