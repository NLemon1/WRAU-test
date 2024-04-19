namespace WRA.Umbraco.Dtos;

public class WraCompanySubscriptionDto
{
    public string Id { get; set; }
    public Guid? CompanyId { get; set; }
    public string ProductId { get; set; }
    public string ProductName { get; set; }
    public string Status { get; set; }
    public DateTime BeginDate { get; set; }
    public DateTime PaidThru { get; set; }
}