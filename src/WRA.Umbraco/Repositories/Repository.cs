using Microsoft.Extensions.Logging;
using NPoco.Linq;
using Umbraco.Cms.Core.Events;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Infrastructure.Scoping;
using WRA.Umbraco.CustomTables;

namespace WRA.Umbraco.Repositories;

public class Repository<TEntity>(
    IScopeProvider scopeProvider,
    ILogger<Repository<TEntity>> logger)
    : IRepository<TEntity>
    where TEntity : IEntity
{
    public OperationResult Create(TEntity entity)
    {
        using var scope = scopeProvider.CreateScope();
        object createResult = scope.Database.Insert<TEntity>(entity);
        scope.Complete();
        return GetResult(createResult);
    }

    public OperationResult Update(TEntity entity)
    {
        using var scope = scopeProvider.CreateScope();
        int updateResult = scope.Database.Update(entity);
        scope.Complete();
        return GetResult(updateResult);
    }

    public OperationResult Delete(TEntity entity)
    {
        using var scope = scopeProvider.CreateScope();
        int deleteResult = scope.Database.Delete(entity);

        scope.Complete();
        logger.LogInformation("Deleted entity: {Entity}", entity.Id);
        return GetResult(deleteResult);
    }

    public IQueryProviderWithIncludes<TEntity> GetQueryable()
    {
        using var scope = scopeProvider.CreateScope();
        var result = scope.Database.Query<TEntity>();
        return result;
    }

    public TEntity Get(int id)
    {
        using var scope = scopeProvider.CreateScope();
        var result = scope.Database.SingleById<TEntity>(id);
        scope.Complete();
        return result;
    }

    public IEnumerable<TEntity> GetAll()
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

    private OperationResult GetResult(int executionResult)
    {
        var eventMessage = new EventMessages();
        var operationStatus = executionResult == 1 ? OperationResultType.Success : OperationResultType.Failed;
        return new OperationResult(operationStatus, eventMessage);
    }

    private OperationResult GetResult(object? executionResult)
    {
        var eventMessage = new EventMessages();
        var operationStatus = executionResult != null ? OperationResultType.Success : OperationResultType.Failed;
        return new OperationResult(operationStatus, eventMessage);
    }
}