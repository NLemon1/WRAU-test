using System.Text.Json.Serialization;

namespace WRA.Umbraco.Web.Dtos.External;
public class OrderHistoryDto
{
    [JsonPropertyName("memberID")]
    public int MemberID { get; set; }
}

public class OrderHistoryOrder
{
    [JsonPropertyName("orderID")]
    public int OrderID { get; set; }

    // Only if different than order ID
    [JsonPropertyName("orderNumber")]
    public string OrderNumber { get; set; }

    [JsonPropertyName("orderDate")]
    public DateTime OrderDate { get; set; }

    [JsonPropertyName("orderTotal")]
    public decimal OrderTotal { get; set; }

    [JsonPropertyName("orderStatus")]
    public string OrderStatus { get; set; }

    //If order contains subscription
    [JsonPropertyName("expirationDate")]
    public DateTime? ExpirationDate { get; set; }
}
