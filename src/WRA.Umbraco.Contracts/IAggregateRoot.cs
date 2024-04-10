namespace WRA.Umbraco.Contracts;

// Apply this marker interface only to aggregate root entities
// Repositories will only work with aggregate roots, not their children

// Consider an e-commerce domain with Order and OrderItem entities.
// The Order entity would be the aggregate root because it has a global identity (e.g., order ID),
// serves as the entry point to work with order items, and is responsible for enforcing
// invariants related to orders (e.g., total cost calculations, minimum order value).
// Thus, Order would implement IAggregateRoot, while OrderItem would not.
public interface IAggregateRoot : IEntity;