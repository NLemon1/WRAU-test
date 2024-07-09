using WRA.Umbraco.Contracts;
using WRA.Umbraco.Dtos;

namespace WRA.Umbraco.Web.Dtos.External
{
    public class OrderEvent : IEvent<Guid>
    {
        public Guid Id { get; set; }
        public string OrderNumber { get; set; } = string.Empty;
        public DateTime OrderDate { get; set; }
        public OrderAddressDto ShippingAddress { get; set; } = new OrderAddressDto();
        public OrderAddressDto BillingAddress { get; set; } = new OrderAddressDto();
        public List<ExternalOrderLine> OrderLines { get; set; } = [];
        public int NumberOfLines { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string? LastName { get; set; }
        public Guid Company { get; set; }
        public string Address1 { get; set; } = string.Empty;
        public string Address2 { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public string State { get; set; } = string.Empty;
        public string Zip { get; set; } = string.Empty;
        public string WorkPhone { get; set; } = string.Empty;
        public string CellPhone { get; set; } = string.Empty;
        public string HomePhone { get; set; } = string.Empty;
        public decimal SubTotalAmount { get; set; }
        public decimal TaxAmount { get; set; }
        public decimal DiscountAmount { get; set; }
        public decimal NetTotalAmount { get; set; }
    }
}