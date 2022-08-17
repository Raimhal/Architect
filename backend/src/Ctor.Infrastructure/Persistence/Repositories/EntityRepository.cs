using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ctor.Domain.Entities;
using Ctor.Domain.Repositories;

namespace Ctor.Infrastructure.Persistence.Repositories;
public class EntityRepository : GenericRepository<MyEntity>, IEntityRepository
{
    public EntityRepository(ApplicationDbContext context) : base(context)
    {
       
    }
}
