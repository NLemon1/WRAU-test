public record ProductDto
{
    public required string Id { get; init; }
    public required string Sku { get; init; }
    public required string Type { get; init; }
    public required string Category { get; init; }
    public required string Subcategory { get; init; }
    public required string Price { get; init; }
    public required string MemberPrice { get; init; }
    public required string Name { get; init; }

}