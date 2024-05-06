using NPoco.Linq;

namespace WRA.Umbraco.Repositories;

public interface IRepository<T>
{
    void Create(T entity);
    void Update(T entity);
    void Delete(T entity);
    T Get<T>(int id);
    IEnumerable<T> GetAll<T>();
    IQueryProviderWithIncludes<T> GetQueryable();

    void SaveChanges(T entity);
}