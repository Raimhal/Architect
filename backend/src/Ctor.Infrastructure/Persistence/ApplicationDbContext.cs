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
    public DbSet<Building> Buildings => Set<Building>();
    public DbSet<BuildingBlock> BuildingBlocks => Set<BuildingBlock>();
    public DbSet<Company> Companies => Set<Company>();
    public DbSet<Document> Documents => Set<Document>();
    public DbSet<Material> Materials => Set<Material>();
    public DbSet<Phase> Phases => Set<Phase>();
    public DbSet<Project> Projects => Set<Project>();
    public DbSet<ProjectDocument> ProjectDocument => Set<ProjectDocument>();
    public DbSet<ProjectNote> ProjectNotes => Set<ProjectNote>();
    public DbSet<Role> Roles => Set<Role>();
    public DbSet<User> Users => Set<User>();
    public DbSet<Vendor> Vendors => Set<Vendor>();


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
