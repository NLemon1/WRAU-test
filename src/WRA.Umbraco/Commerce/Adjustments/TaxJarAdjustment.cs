using Umbraco.Commerce.Core.Models;

namespace WRA.Umbraco.Commerce.Adjustments;

[Serializable]
public class TaxJarAdjustment : PriceAdjustment<TaxJarAdjustment>
{
    public string? TaxJarAdjustmentRef { get; set; }

    // A parameterless constructor is required for cloning
    public TaxJarAdjustment()
        : base()
    {
    }

    // Additional helper constructors
    public TaxJarAdjustment(string name, string reference, Price adjustment)
        : base(name, adjustment)
    {
        TaxJarAdjustmentRef = reference;
    }
}