using WRA.Umbraco.Contracts;
using WRA.Umbraco.Dtos;

namespace WRA.Umbraco.Web.Dtos.External
{
    public class OrderEvent : IEvent<Guid>
    {
        public Guid Id { get; set; }
        public DateTime OrderDate { get; set; }
        public OrderAddressDto ShippingAddress { get; set; }
        public OrderAddressDto BillingAddress { get; set; }
        public int NumberOfLines { get; set; }
        public string FirstName { get; set; }
        public string? LastName { get; set; }
        public Guid Company { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Zip { get; set; }
        public string Phone { get; set; }
        public decimal SubTotalAmount { get; set; }
        public decimal TaxAmount { get; set; }
        public decimal DiscountAmount { get; set; }
        public decimal NetTotalAmount { get; set; }
    }
}