namespace WRA.Umbraco.Contracts.Product;

public class ProductCategoryEvent : IEvent<DefaultIdType>
{
    public DefaultIdType Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
}