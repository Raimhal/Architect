using Ctor.Domain.Common;

namespace Ctor.Domain.Entities;
public class Role: BaseEntity
{
    public string RoleName { get; set; }
    public List<User> Users { get; set; }
}
