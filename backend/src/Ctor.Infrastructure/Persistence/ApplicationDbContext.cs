using System.Reflection;
using Ctor.Application.Common.Interfaces;
using Ctor.Domain.Entities;
using Ctor.Domain.Repositories;
using Microsoft.EntityFrameworkCore;

namespace Ctor.Infrastructure.Persistence;

public class ApplicationDbContext : DbContext, IApplicationDbContext
{
    private readonly Lazy<IUserRepository> _userRepositoryLazy;
    private readonly Lazy<ICompanyRepository> _companyRepositoryLazy;
    private readonly Lazy<IBuildingRepository> _buildingRepositoryLazy;
    private readonly Lazy<IProjectRepository> _projectRepositoryLazy;
    private readonly Lazy<IPhaseRepository> _phaseRepositoryLazy;
    private readonly Lazy<IRoleRepository> _roleRepositoryLazy;

    public IUserRepository Users => _userRepositoryLazy.Value;
    public IRoleRepository Roles => _roleRepositoryLazy.Value;
    public ICompanyRepository Companies => _companyRepositoryLazy.Value;
    public IBuildingRepository Buildings => _buildingRepositoryLazy.Value;
    public IProjectRepository Projects => _projectRepositoryLazy.Value;
    public IPhaseRepository Phases=> _phaseRepositoryLazy.Value;

    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options, IRepositoryFactory repositoryFactory)
        : base(options)
    {
        _userRepositoryLazy = repositoryFactory.GetInstanse<Lazy<IUserRepository>>();
        _roleRepositoryLazy = repositoryFactory.GetInstanse<Lazy<IRoleRepository>>();
        _companyRepositoryLazy = repositoryFactory.GetInstanse<Lazy<ICompanyRepository>>();
        _buildingRepositoryLazy = repositoryFactory.GetInstanse<Lazy<IBuildingRepository>>();
        _projectRepositoryLazy = repositoryFactory.GetInstanse<Lazy<IProjectRepository>>();
        _phaseRepositoryLazy = repositoryFactory.GetInstanse<Lazy<IPhaseRepository>>();
    }

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
