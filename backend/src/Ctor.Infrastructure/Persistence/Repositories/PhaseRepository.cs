using Ctor.Domain.Entities;
using Ctor.Domain.Repositories;

namespace Ctor.Infrastructure.Persistence.Repositories;
public class PhaseRepository : GenericRepository<Phase>, IPhaseRepository
{
    public PhaseRepository(ApplicationDbContext _context) : base(_context)
    {
    }
}

