namespace WRA.Umbraco.Web.Dtos.External;

public class ExternalSalesTaxCategory
{
    public Guid Id { get; set; } = Guid.Empty;
    public int Code { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
}