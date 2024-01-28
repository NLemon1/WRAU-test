
namespace WRA.Umbraco.Dtos;

public record UpdateCartDto(
    ORderLineQuantityDto[] OrderLines
);


public record ORderLineQuantityDto()
{
    public Guid Id;
    public decimal Quantity;
}