using Ctor.Domain.Entities;
using Ctor.Domain.Repositories;

namespace Ctor.Infrastructure.Persistence.Repositories;
public class BuildingRepository : GenericRepository<Building>, IBuildingRepository
{
    public BuildingRepository(ApplicationDbContext _context) : base(_context)
    {
    }
}
