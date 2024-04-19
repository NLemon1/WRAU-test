namespace WRA.Umbraco.Models.Custom;

public interface IWraEntity
{
    string ExternalId { get; set; }
    string EntityName { get; set; }
}