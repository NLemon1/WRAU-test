namespace WRA.Umbraco.Web.Dtos.External
{
    [Serializable]
    public class ExternalMemberSubscriptionDto
    {
        public string Id { get; set; } = string.Empty;
        public Guid MemberId { get; set; }
        public string? MemberEmail { get; set; }
        public Guid ProductId { get; set; }
        public string ProductSku { get; set; } = string.Empty;
        public string? ProductName { get; set; }
        public string? ProductDescription { get; set; }
        public string ProductCategoryId { get; set; } = string.Empty;
        public string ProductSubcategoryId { get; set; } = string.Empty;
        public string? ProductTaxonomyId { get; set; }
        public string Status { get; set; } = string.Empty;
        public DateTime BeginDate { get; set; }
        public DateTime PaidThru { get; set; }
        public DateTime? ContinuousSince { get; set; }
    }
}