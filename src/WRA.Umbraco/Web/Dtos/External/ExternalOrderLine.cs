namespace WRA.Umbraco.Web.Dtos.External;

public class ExternalOrderLine
{
    public string Sku { get; set; } = string.Empty;
    public decimal Quantity { get; set; }
    public decimal Price { get; set; }
    public decimal BasePrice { get; set; }
    public decimal UnitPrice { get; set; }
    public decimal Discount { get; set; }
    public decimal Tax { get; set; }
    public decimal Total { get; set; }
}