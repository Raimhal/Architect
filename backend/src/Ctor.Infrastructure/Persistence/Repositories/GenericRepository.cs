using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Ctor.Application.Common.Enums;
using Ctor.Application.Common.Exceptions;
using Ctor.Application.Common.Extensions;
using Ctor.Domain.Common;
using Ctor.Domain.Repositories;
using Microsoft.EntityFrameworkCore;

namespace Ctor.Infrastructure.Persistence.Repositories;

public class GenericRepository<T> : IGenericRepository<T> where T : BaseEntity
{
    protected ApplicationDbContext _context;
    protected DbSet<T> table;
    private Lazy<IMapper> _mapper;

    public GenericRepository(ApplicationDbContext context, Lazy<IMapper> mapper)
    {
        this._context = context;
        table = _context.Set<T>();
        _mapper = mapper;
    }

    public Task<List<T>> Get(Expression<Func<T, bool>> filter)
    {
        IQueryable<T> query = table;

        query = query.Where(filter);
        return query.ToListAsync();
    }

    public Task<List<T>> GetAll()
    {
        return table.ToListAsync();
    }

    public async Task<T> GetById(long id, CancellationToken ct)
    {
        var entity = await FindById(id, ct);

        if (entity == null)
            throw new NotFoundException(typeof(T).Name, id);

        return entity;
    }

    public Task<T?> FindById(long id, CancellationToken ct)
    {
        return table.FirstOrDefaultAsync(e => e.Id == id, ct);
    }

    public Task Insert(T obj)
    {
        return table.AddAsync(obj).AsTask();
    }

    public void Update(T obj)
    {
        table.Attach(obj);
        _context.Entry(obj).State = EntityState.Modified;
    }

    public void Delete(T obj)
    {
        table.Remove(obj);
    }

    public bool Any()
    {
        return table.Any();
    }
    public Task<bool> AnyAsync(Expression<Func<T,bool>> filter)
    {
        return Table.AnyAsync(filter);
    }

    public Task AddRangeAsync(IEnumerable<T> values)
    {
        return table.AddRangeAsync(values);
    }

    public Task AddRangeAsync(params T[] value)
    {
        return table.AddRangeAsync(value);
    }

    public async Task<bool> DeleteById(long id)
    {
        var obj = await table.FindAsync(id);

        if (obj == null)
            return false;

        table.Remove(obj);
        return true;
    }


    public Task<List<T>> GetOrdered(string orderBy, Order order = Order.ASC,
        Expression<Func<T, bool>> filter = null)
    {
        var query = GetOrderedInternal(orderBy, order, filter);

        return query.ToListAsync();
    }

    public Task<List<TResult>> GetOrdered<TResult>(string orderBy, Order order = Order.ASC,
    Expression<Func<T, bool>> filter = null)
    {
        var query = GetOrderedInternal(orderBy, order, filter);

        return query.ProjectTo<TResult>(_mapper.Value.ConfigurationProvider).ToListAsync();
    }

    public async Task<(List<T> entities, int total)> GetFilteredWithTotalSum(Expression<Func<T, bool>> filter,
        int page = 0, int count = 0, string orderBy = null, Order order = Order.ASC)
    {
        (var query, var total) = await GetFilteredWithTotalSumInternal(filter, page, count, orderBy, order);

        return (await query.ToListAsync(), total);
    }

    public async Task<(List<TResult> entities, int total)> GetFilteredWithTotalSum<TResult>(Expression<Func<T, bool>> filter,
    int page = 0, int count = 0, string orderBy = null, Order order = Order.ASC)
    {
        (var query, var total) = await GetFilteredWithTotalSumInternal(filter, page, count, orderBy, order);

        return (await query.ProjectTo<TResult>(_mapper.Value.ConfigurationProvider).ToListAsync(), total);
    }

    public async Task<(List<T> entities, int total)> GetFilteredWithTotalSumWithQuery(IQueryable<T> query,
        Expression<Func<T, bool>> filter, int page = 0, int count = 0, string orderBy = null, Order order = Order.ASC)
    {

        (query, var total) = await GetFilteredWithTotalSumWithQueryInternal(query, filter, page, count, orderBy, order);

        return (await query.ToListAsync(), total);
    }

    public async Task<(List<TResult> entities, int total)> GetFilteredWithTotalSumWithQuery<TResult>(IQueryable<T> query,
    Expression<Func<T, bool>> filter, int page = 0, int count = 0, string orderBy = null, Order order = Order.ASC)
    {

        (query, var total) = await GetFilteredWithTotalSumWithQueryInternal(query, filter, page, count, orderBy, order);

        return (await query.ProjectTo<TResult>(_mapper.Value.ConfigurationProvider).ToListAsync(), total);
    }

    private IQueryable<T> GetOrderedInternal(string orderBy, Order order = Order.ASC, Expression<Func<T, bool>> filter = null)
    {
        IQueryable<T> query = table;

        if (filter != null)
            query = query.Where(filter);

        return query.DynamicOrderBy(orderBy, order);
    }

    private async Task<(IQueryable<T> query, int total)> GetFilteredWithTotalSumWithQueryInternal(IQueryable<T> query,
    Expression<Func<T, bool>> filter, int page = 0, int count = 0, string orderBy = null, Order order = Order.ASC)
    {
        if (filter != null)
            query = query.Where(filter);

        if (orderBy != null)
            query = query.DynamicOrderBy(orderBy, order);

        var total = await query.CountAsync();

        if (count != 0)
            query = query.Skip((page - 1) * count).Take(count);

        return (query, total);
    }

    private async Task<(IQueryable<T> query, int total)> GetFilteredWithTotalSumInternal(Expression<Func<T, bool>> filter,
    int page = 0, int count = 0, string orderBy = null, Order order = Order.ASC)
    {
        IQueryable<T> query = table;

        return await GetFilteredWithTotalSumWithQueryInternal(query, filter, page, count, orderBy, order);
    }

    public Task<T?> SingleOrDefault(Expression<Func<T, bool>> filter)
    {
        IQueryable<T> query = table;

        query = query.Where(filter);
        return query.SingleOrDefaultAsync();
    }
}