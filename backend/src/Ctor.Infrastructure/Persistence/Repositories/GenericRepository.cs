using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using Ctor.Application.Common.Interfaces;
using Ctor.Domain.Common;
using Ctor.Domain.Entities;
using Ctor.Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;

namespace Ctor.Infrastructure.Persistence.Repositories;
public class GenericRepository<T> : IGenericRepository<T> where T : BaseEntity
{
    protected ApplicationDbContext _context { get; set; }
    private DbSet<T> table = null;
    public GenericRepository(ApplicationDbContext _context)
    {
        this._context = _context;
        table = _context.Set<T>();
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
    public Task<T> GetById(long id)
    {
        return table.FindAsync(id).AsTask();
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
    public async Task<bool> DeleteById(long id)
    {
        var obj = await table.FindAsync(id);
        if (obj == null)
        {
            return false;
        }
        table.Remove(obj);
        return true;
    }
    public Task<List<T>> GetOrdered(Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null,
        Expression<Func<T, bool>> filter = null)
    {
        IQueryable<T> query = _context.Set<T>();        

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
        Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null,
        Expression<Func<T, bool>> filter = null)
    {
        IQueryable<T> query = _context.Set<T>();      

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
         Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null,
         Expression<Func<T, bool>> filter = null)
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
}
