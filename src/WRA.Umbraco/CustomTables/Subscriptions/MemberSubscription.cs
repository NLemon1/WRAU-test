using NPoco;
using Umbraco.Cms.Infrastructure.Persistence.DatabaseAnnotations;

namespace WRA.Umbraco.CustomTables.Subscriptions;

[TableName("MemberSubscriptions")]
[PrimaryKey("Id", AutoIncrement = true)]
[ExplicitColumns]
public class MemberSubscription : IEntity
{
    [PrimaryKeyColumn(AutoIncrement = true, IdentitySeed = 1)]
    [Column("Id")]
    public int Id { get; set; }

    [Column("ExternalId")]
    public Guid ExternalId { get; set; }

    [Column("MemberId")]
    public int MemberId { get; set; }

    [Column("ProductId")]
    public int ProductId { get; set; }

    [Column("BeginDate")]
    public DateTime BeginDate { get; set; }

    [Column("PaidThruDate")]
    public DateTime PaidThruDate { get; set; }

    [Column("IsActive")]
    public bool IsActive { get; set; }
}