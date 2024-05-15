namespace WRA.Umbraco.Web.Dtos.External;

public class ExternalAddress
{
    string AddressLine1 { get;  set; }

    public string AddressLine2 { get;  set; }

    public string City { get;  set; }

    public string Region { get;  set; }

    public string CountryIsoCode { get;  set; }

    public string ZipCode { get;  set; }
}