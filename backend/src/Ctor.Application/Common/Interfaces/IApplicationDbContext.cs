using Ctor.Domain.Repositories;

namespace Ctor.Application.Common.Interfaces;

public interface IApplicationDbContext
{
    IEntityRepository EntityRepository { get; }
    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}
