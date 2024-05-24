namespace WRA.Umbraco.Web.Dtos.External
{
    public class ExternalCompanySubscriptionDto
    {
        public Guid Id { get; set; }
        public Guid CompanyId { get; set; }
        public string? CompanyEmail { get; set; }
        public Guid ProductId { get; set; }
        public string ProductSku { get; set; }
        public string? ProductName { get; set; }
        public string? ProductDescription { get; set; }
        public Guid ProductCategoryId { get; set; }
        public string? ProductSubcategoryId { get; set; }
        public string? ProductTaxonomyId { get; set; }
        public string Status { get; set; }
        public DateTime BeginDate { get; set; }
        public DateTime? PaidThru { get; set; }
        public DateTime? ContinuousSince { get; set; }
    }
}