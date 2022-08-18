using Ctor.Domain.Entities;
using Ctor.Domain.Repositories;

namespace Ctor.Infrastructure.Persistence.Repositories;
public class EntityRepository : GenericRepository<MyEntity>, IEntityRepository
{
    public EntityRepository(ApplicationDbContext context) : base(context)
    {

    }
}
