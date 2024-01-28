namespace WRA.Umbraco.Dtos;

public class AddToCartDto
{
    public string ProductReference { get; set; } = string.Empty;
    public string ProductVariantReference { get; set; } = string.Empty;
    public string ProductName { get; set; } = string.Empty;
}

