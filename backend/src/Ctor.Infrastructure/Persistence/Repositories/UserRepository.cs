using Ctor.Domain.Entities;
using Ctor.Domain.Repositories;

namespace Ctor.Infrastructure.Persistence.Repositories;
public class UserRepository : GenericRepository<User>, IUserRepository
{
    public UserRepository(ApplicationDbContext _context) : base(_context)
    {

    }

}
