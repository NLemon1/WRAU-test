namespace WRA.Umbraco.Dtos;

public class AddBundleToCartDto
{
    required public string BundleReference { get; set; }
    public string[] BundledProducts { get; set; } = [];
}