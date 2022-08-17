using System.Reflection;
using Ctor.Application.Common.Interfaces;
using Ctor.Domain.Entities;
using Ctor.Domain.Repositories;
using Microsoft.EntityFrameworkCore;

namespace Ctor.Infrastructure.Persistence;

public class ApplicationDbContext : DbContext, IApplicationDbContext
{
    private readonly Lazy<IEntityRepository> _entityRepositoryLazy;
    public IEntityRepository EntityRepository
    {
        get
        {
            return _entityRepositoryLazy.Value;
        }
    }

    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options, IRepositoryFactory repositoryFactory)
        : base(options)
    {
        _entityRepositoryLazy = repositoryFactory.GetInstanse<Lazy<IEntityRepository>>();       
    }

    public DbSet<MyEntity> TodoLists => Set<MyEntity>();

    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

        base.OnModelCreating(builder);
    }

    public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        return base.SaveChangesAsync(cancellationToken);
    }
}
