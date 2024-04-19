using Umbraco.Commerce.Core.Models;

namespace WRA.Umbraco.Models;

public interface IOrderReviewPage
{
    OrderReadOnly Order { get; }

    CountryReadOnly? PaymentCountry { get; }

    CountryReadOnly? ShippingCountry { get; }
}
