using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;

namespace WRA.Umbraco.Events.ServiceBusSubscriptions
{
    // TODO: ADD LOGGER
    public class MemberSubscriptionServiceSettings : ISubscriptionServiceSettings
    {
        public string AzureUrl { get; set; }
        public string TopicName { get; set; }
        public string SubscriptionName { get; set; }
        public string BaseUrl { get; set; }
    }
    public class ProductSubscriptionServiceSettings : ISubscriptionServiceSettings
    {
        public string AzureUrl { get; set; }
        public string TopicName { get; set; }
        public string SubscriptionName { get; set; }
        public string BaseUrl { get; set; }
    }

    public class SubscriptionServiceSettingsOptions : IConfigureOptions<ISubscriptionServiceSettings>
    {
        private readonly IConfiguration _configuration;

        public SubscriptionServiceSettingsOptions(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public void Configure(ISubscriptionServiceSettings options)
        {
            options.AzureUrl = _configuration.GetValue<string>("AzureUrl");
            options.TopicName = _configuration.GetValue<string>("TopicName");
            options.SubscriptionName = _configuration.GetValue<string>("SubscriptionName");
            options.BaseUrl = _configuration.GetValue<string>("BaseUrl");
        }
    }
}
