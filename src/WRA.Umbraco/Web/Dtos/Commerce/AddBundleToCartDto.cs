namespace WRA.Umbraco.Dtos;

public class AddBundleToCartDto
{
    public required string BundleReference { get; set; }
    public string[] BundledProducts { get; set; }
}