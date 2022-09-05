using Ctor.Domain.Common;

namespace Ctor.Domain.Entities;
public class ProjectDocument : BaseEntity
{
    public DateTime Created { get; set; }
    public long BuildingId { get; set; }
    public Building Building { get; set; }

    public long? DocumentId { get; set; }
    public Document Document { get; set; }
}
