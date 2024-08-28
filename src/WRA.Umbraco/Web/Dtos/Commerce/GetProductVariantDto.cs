using System.Runtime.Serialization;

namespace WRA.Umbraco.Dtos;

[DataContract(Name = "getProductVariant", Namespace = "")]
public record GetProductVariantDto
{
    [DataMember(Name = "productNodeId")]
    required public int ProductNodeId { get; set; }

    [DataMember(Name = "attributes")]
    public IDictionary<string, string> Attributes { get; set; } = new Dictionary<string, string>();
}
