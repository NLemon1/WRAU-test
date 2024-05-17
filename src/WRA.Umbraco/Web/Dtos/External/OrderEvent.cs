using WRA.Umbraco.Contracts;
using WRA.Umbraco.Dtos;

namespace WRA.Umbraco.Web.Dtos.External
{
    public class OrderEvent : IEvent<Guid>
    {
        public Guid Id { get; set; }
        public string OrderNumber { get; set; }
        public DateTime OrderDate { get; set; }
        public OrderAddressDto ShippingAddress { get; set; }
        public OrderAddressDto BillingAddress { get; set; }
        public List<ExternalOrderLine> OrderLines { get; set; } = [];
        public int NumberOfLines { get; set; }
        public string FirstName { get; set; }
        public string? LastName { get; set; }
        public Guid Company { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Zip { get; set; }
        public string WorkPhone { get; set; }
        public string CellPhone { get; set; }
        public string HomePhone { get; set; }
        public decimal SubTotalAmount { get; set; }
        public decimal TaxAmount { get; set; }
        public decimal DiscountAmount { get; set; }
        public decimal NetTotalAmount { get; set; }
    }
}