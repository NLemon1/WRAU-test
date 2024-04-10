using MassTransit;

namespace WRA.Umbraco.Contracts;
public static class EntityUpdatedEvent
{
    public static EntityUpdatedEvent<TEntity> WithEntity<TEntity>(TEntity entity, DefaultIdType? eventId)
        where TEntity : IEntity
        => new(entity, eventId);
}

public class EntityUpdatedEvent<TEntity> : DomainEvent, IConvertsToEntityEvent<TEntity>
    where TEntity : IEntity
{
    internal EntityUpdatedEvent(TEntity entity, DefaultIdType? eventId, DefaultIdType? correlationId = null, EntityEventSource? originEventSource = null)
    {
        EventId = eventId ?? NewId.NextSequentialGuid();
        Entity = entity;
        OriginEventSource = originEventSource ?? EntityEventSource.UmbracoIntegration;
        CorrelationId = correlationId ?? NewId.NextSequentialGuid();
    }

    public EntityEventSource OriginEventSource { get; set; }

    public EntityEventSource Source { get; init; }

    public DefaultIdType? CorrelationId { get; }

    public TEntity Entity { get; }

    public DefaultIdType EventId { get; }

    public EntityEvent<TEntity> ToEntityEvent(EntityEventSource eventSource) => new(OriginEventSource, eventSource, EntityEventAction.Updated, Entity, EventId, CorrelationId);

    public override string ToString() => $"Entity {Entity.GetType().Name} updated";
}