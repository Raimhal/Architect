using Ctor.Domain.Common;

namespace Ctor.Domain.Entities;
public class Role: BaseEntity
{
    public string RoleName { get; set; }

    public long? UserId { get; set; }
    public User Users { get; set; }
}
