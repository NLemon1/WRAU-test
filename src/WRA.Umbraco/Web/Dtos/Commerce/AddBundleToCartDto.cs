using OfficeOpenXml.FormulaParsing.Excel.Functions.Math;

namespace WRA.Umbraco.Dtos;

public class AddBundleToCartDto
{
    public required string BundleReference { get; set; }
    public AddToCartDto[] BundledProducts { get; set; }
}