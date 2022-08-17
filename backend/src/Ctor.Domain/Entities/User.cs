using Ctor.Domain.Common;

namespace Ctor.Domain.Entities;
public class User: BaseEntity
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string UserEmail { get; set; }
    public string Password { get; set; }
    
    public virtual ICollection<ProjectNote> ProjectNote { get; set; }
    public long? RoleId { get; set; }
    public Role Role { get; set; }

    public long? CompanyId { get; set; }
    public Company Company { get; set; }

    public long? ProjectId { get; set; }
    public Project Project { get; set; }
}
