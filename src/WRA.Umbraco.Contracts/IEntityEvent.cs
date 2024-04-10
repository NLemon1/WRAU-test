namespace WRA.Umbraco.Contracts;

public interface IEntityEvent<out T>
{
    public DefaultIdType EventId { get; set; }

    EntityEventSource Source { get; }

    EntityEventAction Action { get; }

    T Entity { get; }
}