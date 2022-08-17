using Ctor.Domain.Common;

namespace Ctor.Domain.Entities;
public class Project : BaseEntity
{
    public string ProjectName { get; set; }
    public string ProjectType { get; set; }
    public string Country { get; set; }
    public string Address { get; set; }
    public string City { get; set; }
    public decimal Budget { get; set; }
    public int Status { get; set; }
    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }

    public virtual ICollection<Building> Building { get; set; }
    public virtual ICollection<Phase> Phases { get; set; }
    public virtual ICollection<ProjectDocument> ProjectDocument { get; set; }
    public virtual ICollection<ProjectNote> ProjectNote { get; set; }



    public long? CompanyId { get; set; }
    public Company Company { get; set; }

    public long? UserId { get; set; }
    public User User { get; set; }

}
