using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Umbraco.Commerce.Core.Models;

[Serializable]
public class TaxJarAdjustment : PriceAdjustment<TaxJarAdjustment>
{
    public string TaxJarAdjustmentRef { get; set; }

    // A parameterless constructor is required for cloning
    public TaxJarAdjustment()
        : base()
    { }

    // Additional helper constructors
    public TaxJarAdjustment(string name, string reference, Price adjustment)
        : base(name, adjustment)
    {
        TaxJarAdjustmentRef = reference;
    }
}
