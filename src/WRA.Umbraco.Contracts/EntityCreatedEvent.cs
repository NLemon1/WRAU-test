using MassTransit;

namespace WRA.Umbraco.Contracts;

public static class EntityCreatedEvent
{
    public static EntityCreatedEvent<TEntity> WithEntity<TEntity>(TEntity entity, DefaultIdType? eventId)
        where TEntity : IEntity
        => new(entity, eventId);
}

public class EntityCreatedEvent<TEntity> : DomainEvent, IConvertsToEntityEvent<TEntity>
    where TEntity : IEntity
{
    internal EntityCreatedEvent(TEntity entity, DefaultIdType? eventId, DefaultIdType? correlationId = null, EntityEventSource? originEventSource = null)
    {
        EventId = eventId ?? NewId.NextSequentialGuid();
        Entity = entity;
        OriginEventSource = originEventSource ?? EntityEventSource.UmbracoIntegration;
        CorrelationId = correlationId ?? NewId.NextSequentialGuid();
    }

    public DefaultIdType? CorrelationId { get; }

    public EntityEventSource OriginEventSource { get; }

    public TEntity Entity { get; }

    public DefaultIdType EventId { get; }

    public EntityEvent<TEntity> ToEntityEvent(EntityEventSource eventSource) => new(OriginEventSource, eventSource, EntityEventAction.Created, Entity, EventId, CorrelationId);

    public override string ToString() => $"Entity {Entity.GetType().Name} created";
}
