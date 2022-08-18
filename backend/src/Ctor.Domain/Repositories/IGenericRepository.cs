using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using Ctor.Domain.Common;

namespace Ctor.Domain.Repositories;
public interface IGenericRepository<T> where T : BaseEntity
{
    Task<List<T>> Get(Expression<Func<T, bool>> filter);
    Task<List<T>> GetOrdered(Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null,
        Expression<Func<T, bool>> filter = null);
    Task<(List<T> entities, int total)> GetFilteredWithTotalSum(int page = 0, int count = 0, 
        Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null,
        Expression<Func<T, bool>> filter = null);
    Task<(List<T> entities, int total)> GetFilteredWithTotalSumWithQuery(IQueryable<T> query,
        int page = 0, int count = 0,
         Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null,
         Expression<Func<T, bool>> filter = null);

    Task<List<T>> GetAll();
    Task<T> GetById(long id);   
    Task Insert(T obj);
    void Update(T obj);
    void Delete(T obj);
    Task<bool> DeleteById(long id);
    bool Any();
    Task AddRangeAsync(IEnumerable<T> values);
    Task AddRangeAsync(params T[]value);

}
