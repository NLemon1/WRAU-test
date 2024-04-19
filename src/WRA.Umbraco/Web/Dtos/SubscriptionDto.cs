namespace WRA.Umbraco.Web.Dtos
{
    [Serializable]
    public class SubscriptionDto
    {
        public string ProductId { get; set; }
        public string Status { get; set; }
        public DateTime BeginDate { get; set; }
        public DateTime PaidThru { get; set; }
        public DateTime ContinuousSince { get; set; }
    }
}