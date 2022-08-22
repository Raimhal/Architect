using Ctor.Domain.Repositories;

namespace Ctor.Application.Common.Interfaces;

public interface IApplicationDbContext
{
    IUserRepository Users { get; }
    IRoleRepository Roles { get; }
    ICompanyRepository Companies { get; }
    IBuildingRepository Buildings { get; }
    IProjectRepository Projects { get; }
    IPhaseRepository Phases { get; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}
