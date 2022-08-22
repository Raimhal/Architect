using Ctor.Domain.Common;

namespace Ctor.Domain.Entities;

public class Role : BaseEntity
{
    public string RoleName { get; set; } = null!;

    public ICollection<User> Users { get; set; } = null!;
}