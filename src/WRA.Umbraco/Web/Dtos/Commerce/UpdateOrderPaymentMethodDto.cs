using System;

namespace WRA.Umbraco.Dtos;
public class UpdateOrderPaymentMethodDto
{
    public Guid PaymentMethod { get; set; }
    public string PaymentReference { get; set; } = string.Empty;
    public OrderAddressDto BillingAddress { get; set; }
    public bool ShippingSameAsBilling { get; set; }
    public Guid? NextStep { get; set; }
}