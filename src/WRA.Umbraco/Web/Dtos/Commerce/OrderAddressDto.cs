namespace WRA.Umbraco.Dtos;

public class OrderAddressDto
{
    public string FirstName { get; set; } = string.Empty;

    public string LastName { get; set; } = string.Empty;

    public string Line1 { get; set; } = string.Empty;

    public string Line2 { get; set; } = string.Empty;

    public string ZipCode { get; set; } = string.Empty;

    public string City { get; set; } = string.Empty;
    public string State { get; set; } = string.Empty;

    public Guid Country { get; set; } = Guid.Empty;

    public string Telephone { get; set; } = string.Empty;
}
