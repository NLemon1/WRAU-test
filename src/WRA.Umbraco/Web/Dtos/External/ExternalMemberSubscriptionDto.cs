namespace WRA.Umbraco.Web.Dtos.External
{
    [Serializable]
    public class ExternalMemberSubscriptionDto
    {
        public string Id { get; set; }
        public Guid MemberId { get; set; }
        public string? MemberEmail { get; set; }
        public Guid ProductId { get; set; }
        public string ProductSku { get; set; }
        public string? ProductName { get; set; }
        public string? ProductDescription { get; set; }
        public string ProductCategoryId { get; set; }
        public string ProductSubcategoryId { get; set; }
        public string? ProductTaxonomyId { get; set; }
        public string Status { get; set; }
        public DateTime BeginDate { get; set; }
        public DateTime PaidThru { get; set; }
        public DateTime? ContinuousSince { get; set; }
    }
}