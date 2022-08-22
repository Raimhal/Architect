using System.Linq.Expressions;
using Ctor.Application.Common.Exceptions;
using Ctor.Domain.Common;
using Ctor.Domain.Repositories;
using Microsoft.EntityFrameworkCore;

namespace Ctor.Infrastructure.Persistence.Repositories;

public class GenericRepository<T> : IGenericRepository<T> where T : BaseEntity
{
    protected ApplicationDbContext Context { get; }

    protected DbSet<T> Table { get; }

    public GenericRepository(ApplicationDbContext context)
    {
        Context = context;
        Table = context.Set<T>();
    }

    public Task<List<T>> Get(Expression<Func<T, bool>> filter)
    {
        IQueryable<T> query = Table;

        query = query.Where(filter);
        return query.ToListAsync();
    }

    public Task<List<T>> GetAll()
    {
        return Table.ToListAsync();
    }

    public async Task<T> GetById(long id, CancellationToken ct)
    {
        var entity = await FindById(id, ct);

        if (entity == null)
        {
            throw new NotFoundException(typeof(T).Name, id);
        }

        return entity;
    }

    public Task<T?> FindById(long id, CancellationToken ct)
    {
        return Table.FirstOrDefaultAsync(e => e.Id == id, ct);
    }

    public Task Insert(T obj)
    {
        return Table.AddAsync(obj).AsTask();
    }

    public void Update(T obj)
    {
        Table.Attach(obj);
        Context.Entry(obj).State = EntityState.Modified;
    }

    public void Delete(T obj)
    {
        Table.Remove(obj);
    }

    public bool Any()
    {
        return Table.Any();
    }

    public Task AddRangeAsync(IEnumerable<T> values)
    {
        return Table.AddRangeAsync(values);
    }

    public Task AddRangeAsync(params T[] value)
    {
        return Table.AddRangeAsync(value);
    }

    public async Task<bool> DeleteById(long id)
    {
        var obj = await Table.FindAsync(id);
        if (obj == null)
        {
            return false;
        }

        Table.Remove(obj);
        return true;
    }

    public Task<List<T>> GetOrdered(Func<IQueryable<T>, IOrderedQueryable<T>>? orderBy = null,
        Expression<Func<T, bool>>? filter = null)
    {
        IQueryable<T> query = Context.Set<T>();

        if (filter != null)
        {
            query = query.Where(filter);
        }

        if (orderBy != null)
        {
            query = orderBy(query);
        }

        return query.ToListAsync();
    }

    public async Task<(List<T> entities, int total)> GetFilteredWithTotalSum(int page = 0, int count = 0,
        Func<IQueryable<T>, IOrderedQueryable<T>>? orderBy = null,
        Expression<Func<T, bool>>? filter = null)
    {
        IQueryable<T> query = Context.Set<T>();

        if (filter != null)
        {
            query = query.Where(filter);
        }

        if (orderBy != null)
        {
            query = orderBy(query);
        }

        var countEntities = await query.CountAsync();

        if (count != 0)
        {
            query = query.Skip(page * count).Take(count);
        }

        return (await query.ToListAsync(), countEntities);
    }

    public async Task<(List<T> entities, int total)> GetFilteredWithTotalSumWithQuery(IQueryable<T> query,
        int page = 0, int count = 0,
        Func<IQueryable<T>, IOrderedQueryable<T>>? orderBy = null,
        Expression<Func<T, bool>>? filter = null)
    {
        if (filter != null)
        {
            query = query.Where(filter);
        }

        if (orderBy != null)
        {
            query = orderBy(query);
        }

        var countEntities = await query.CountAsync();

        if (count != 0)
        {
            query = query.Skip(page * count).Take(count);
        }

        return (await query.ToListAsync(), countEntities);
    }

    public Task<T?> SingleOrDefault(Expression<Func<T, bool>> filter)
    {
        IQueryable<T> query = Table;

        query = query.Where(filter);
        return query.SingleOrDefaultAsync();
    }
}
