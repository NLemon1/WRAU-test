using System;

namespace WRA.Umbraco.Dtos;
public class UpdateOrderPaymentMethodDto
{
    public Guid PaymentMethod { get; set; }
    public string PaymentReference { get; set; } = string.Empty;

    public Guid? NextStep { get; set; }
}