using AutoMapper;
using Ctor.Domain.Entities;
using Ctor.Domain.Repositories;

namespace Ctor.Infrastructure.Persistence.Repositories;
public class ProjectRepository : GenericRepository<Project>, IProjectRepository
{
    public ProjectRepository(ApplicationDbContext _context, Lazy<IMapper> mapper) : base(_context, mapper)
    {
    }
}
