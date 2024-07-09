namespace WRA.Umbraco.Web.Dtos.External;

public class ExternalAddress
{
    public string AddressLine1 { get; set; } = string.Empty;
    public string AddressLine2 { get; set; } = string.Empty;
    public string City { get; set; } = string.Empty;

    public string Region { get; set; } = string.Empty;
    public string CountryIsoCode { get; set; } = string.Empty;
    public string ZipCode { get; set; } = string.Empty;
}