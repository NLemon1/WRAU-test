using MediatR;

namespace WRA.Umbraco.Contracts;

public interface IConvertsToEntityEvent<TEntity> : INotification
where TEntity : IEntity
{
    EntityEvent<TEntity> ToEntityEvent(EntityEventSource eventSource);
}