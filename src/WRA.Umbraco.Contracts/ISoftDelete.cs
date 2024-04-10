namespace WRA.Umbraco.Contracts;

public interface ISoftDelete
{
    DateTime? DeletedOn { get; set; }
    DefaultIdType? DeletedBy { get; set; }
}