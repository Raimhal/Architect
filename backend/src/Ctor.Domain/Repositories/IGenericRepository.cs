using System.Linq.Expressions;
using Ctor.Domain.Common;

namespace Ctor.Domain.Repositories;

public interface IGenericRepository<T> where T : BaseEntity
{
    Task<T?> SingleOrDefault(Expression<Func<T, bool>> filter);
    Task<List<T>> Get(Expression<Func<T, bool>> filter);

    Task<List<T>> GetOrdered(Func<IQueryable<T>, IOrderedQueryable<T>>? orderBy = null,
        Expression<Func<T, bool>>? filter = null);

    Task<(List<T> entities, int total)> GetFilteredWithTotalSum(int page = 0, int count = 0,
        Func<IQueryable<T>, IOrderedQueryable<T>>? orderBy = null,
        Expression<Func<T, bool>>? filter = null);

    Task<(List<T> entities, int total)> GetFilteredWithTotalSumWithQuery(IQueryable<T> query,
        int page = 0, int count = 0,
        Func<IQueryable<T>, IOrderedQueryable<T>>? orderBy = null,
        Expression<Func<T, bool>>? filter = null);

    Task<List<T>> GetAll();
    Task<T> GetById(long id, CancellationToken ct = default);
    Task<T?> FindById(long id, CancellationToken ct = default);
    Task Insert(T obj);
    void Update(T obj);
    void Delete(T obj);
    Task<bool> DeleteById(long id);
    bool Any();
    Task AddRangeAsync(IEnumerable<T> values);
    Task AddRangeAsync(params T[] value);
}