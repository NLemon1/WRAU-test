using MassTransit;

namespace WRA.Umbraco.Contracts;

public record EntityEvent<T> : IEntityEvent<T>
{
    public EntityEvent()
    {
        // Empty constructor for Dapper.
    }

    public EntityEvent(EntityEventSource originEventSource, EntityEventSource eventSource, EntityEventAction eventAction, T entity, DefaultIdType? eventId, DefaultIdType? correlationId)
    {
        OriginEventSource = originEventSource;
        Source = eventSource;
        Action = eventAction;
        Entity = entity;
        EventId = eventId ?? NewId.NextSequentialGuid();
        CorrelationId = correlationId ?? NewId.NextSequentialGuid();
    }

    public DefaultIdType CorrelationId { get; set; }

    public EntityEventSource OriginEventSource { get; set; }

    public EntityEventSource Source { get; init; }

    public EntityEventAction Action { get; init; }

    public T Entity { get; init; }

    public DefaultIdType EventId { get; set; } = NewId.NextSequentialGuid();
}
