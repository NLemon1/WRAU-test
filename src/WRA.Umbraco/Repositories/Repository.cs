using Microsoft.Extensions.Logging;
using NPoco.Linq;
using Umbraco.Cms.Infrastructure.Scoping;
using WRA.Umbraco.CustomTables;

namespace WRA.Umbraco.Repositories;

public class Repository<TEntity>(
    IScopeProvider scopeProvider,
    ILogger<Repository<TEntity>> logger)
    : IRepository<TEntity>
    where TEntity : IEntity

{
    public void Create(TEntity entity)
    {
        using var scope = scopeProvider.CreateScope();
        scope.Database.Insert<TEntity>(entity);
        scope.Complete();
        logger.LogInformation("Created entity: {Entity}", entity.Id);
    }

    public void Update(TEntity entity)
    {
        using var scope = scopeProvider.CreateScope();
        scope.Database.Update(entity);
        scope.Complete();
        logger.LogInformation("Updated entity: {Entity}", entity.Id);
    }

    public void Delete(TEntity entity)
    {
        using var scope = scopeProvider.CreateScope();
        scope.Database.Delete(entity);
        scope.Complete();
        logger.LogInformation("Deleted entity: {Entity}", entity.Id);
    }

    public IQueryProviderWithIncludes<TEntity> GetQueryable()
    {
        using var scope = scopeProvider.CreateScope();
        var result = scope.Database.Query<TEntity>();
        return result;
    }

    public TEntity Get<TEntity>(int id)
    {
        using var scope = scopeProvider.CreateScope();
        var result = scope.Database.SingleById<TEntity>(id);
        scope.Complete();
        return result;

    }

    public IEnumerable<TEntity> GetAll<TEntity>()
    {
        using var scope = scopeProvider.CreateScope();
        var result = scope.Database.Fetch<TEntity>();
        scope.Complete();
        return result;
    }
    public void SaveChanges(TEntity entity)
    {
        using var scope = scopeProvider.CreateScope();
        scope.Database.Save<TEntity>(entity);
        scope.Complete();
        logger.LogInformation("Saved changes to entity: {Entity}", entity.Id);
    }

}