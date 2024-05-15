namespace WRA.Umbraco.Web.Dtos.External;

public class ExternalOrderLine
{
    public string Sku { get; set; }
    public string Quantity { get; set; }
    public decimal Price { get; set; }
    public decimal Discount { get; set; }
    public decimal Tax { get; set; }
    public decimal Total { get; set; }
}