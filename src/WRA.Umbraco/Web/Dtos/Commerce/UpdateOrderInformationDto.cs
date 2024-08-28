namespace WRA.Umbraco.Dtos;
public class UpdateOrderInformationDto
{
    public string Email { get; set; } = string.Empty;

    public bool? MarketingOptIn { get; set; }

    public OrderAddressDto? BillingAddress { get; set; }

    public OrderAddressDto? ShippingAddress { get; set; }

    public bool? ShippingSameAsBilling { get; set; }

    public string Comments { get; set; } = string.Empty;

    public Guid? NextStep { get; set; }
}