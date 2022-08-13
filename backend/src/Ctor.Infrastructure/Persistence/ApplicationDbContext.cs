using System.Reflection;
using Ctor.Application.Common.Interfaces;
using Ctor.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Ctor.Infrastructure.Persistence;

public class ApplicationDbContext : DbContext, IApplicationDbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        :base(options)
    {
    }

    public DbSet<MyEntity> TodoLists => Set<MyEntity>();

    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

        base.OnModelCreating(builder);
    }

    public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        return await base.SaveChangesAsync(cancellationToken);
    }
}
