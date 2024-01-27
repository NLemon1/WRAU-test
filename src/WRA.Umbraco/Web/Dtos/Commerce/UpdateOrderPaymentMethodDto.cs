using System;

namespace WRA.Umbraco.Dtos;
public class UpdateOrderPaymentMethodDto
{
    public Guid PaymentMethod { get; set; }

    public Guid? NextStep { get; set; }
}