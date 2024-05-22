using NPoco.Linq;
using Umbraco.Cms.Core.Services;

namespace WRA.Umbraco.Repositories;

public interface IRepository<T>
{
    OperationResult Create(T entity);
    OperationResult Update(T entity);
    OperationResult Delete(T entity);
    T Get<T>(int id);
    IEnumerable<T> GetAll<T>();
    IQueryProviderWithIncludes<T> GetQueryable();

    void SaveChanges(T entity);
}