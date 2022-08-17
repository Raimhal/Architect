using Ctor.Domain.Common;

namespace Ctor.Domain.Entities;
public class ProjectDocument : BaseEntity
{
    public long? ProjectId { get; set; }
    public Project Project { get; set; }

    public long? DocumentId { get; set; }
    public Document Document { get; set; }
}
