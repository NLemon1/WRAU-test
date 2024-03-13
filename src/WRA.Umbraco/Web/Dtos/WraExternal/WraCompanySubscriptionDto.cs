using System;
using System.Text.Json.Serialization;

namespace WRA.Umbraco.Dtos;

public class WraCompanySubscriptionDto
{
    public string Id { get; set; }
    public string CompanyId { get; set; }
    public string ProductId { get; set; }
    public string ProductSku { get; set; }
    public string ProductName { get; set; }
    public string ProductDescription { get; set; }
    public string ProductCategoryId { get; set; }
    public string ProductSubcategoryId { get; set; }
    public string ProductTaxonomyId { get; set; }
    public string Status { get; set; }
    public DateTime BeginDate { get; set; }
    public DateTime PaidThru { get; set; }
    public DateTime ContinuousSince { get; set; }
}