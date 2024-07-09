using Umbraco.Commerce.Cms.Web.Api.Storefront.Models;
using Umbraco.Commerce.Core.Models;

namespace WRA.Umbraco.Web.Dtos.External;
public class OrderHistoryDto
{
    public decimal OrderId { get; set; }
    public DateTime OrderDate { get; set; }
    public decimal OrderTotal { get; set; }
    public string? OrderStatus { get; set; }
    public List<OrderHistoryLineItem>? OrderLineItems { get; set; }

    public OrderHistoryDto()
    {
    }

    public OrderHistoryDto(decimal orderID, DateTime orderDate, decimal orderTotal, string orderStatus, List<OrderLineReadOnly> items)
    {
        this.OrderId = orderID;
        this.OrderDate = orderDate;
        this.OrderTotal = orderTotal;
        this.OrderStatus = orderStatus;
        this.OrderLineItems = items.Select(i => new OrderHistoryLineItem(orderID, 0, i.Sku, i.Name, string.Empty, i.Quantity, i.UnitPrice)).ToList();
    }
}

public class OrderHistoryLineItem
{
    public decimal OrderId { get; set; }
    public int LineId { get; set; }
    public string? SKU { get; set; }
    public string? Title { get; set; }
    public string? Description { get; set; }
    public decimal Quantity { get; set; }
    public decimal Price { get; set; }
    public OrderHistoryLineItem()
    {
    }

    public OrderHistoryLineItem(decimal orderID, int lineID, string? sKU, string? title, string? description, decimal quantity, decimal price)
    {
        OrderId = orderID;
        LineId = lineID;
        SKU = sKU;
        Title = title;
        Description = description;
        Quantity = quantity;
        Price = price;
    }
}
