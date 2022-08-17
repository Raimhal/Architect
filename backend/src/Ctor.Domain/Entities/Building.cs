using Ctor.Domain.Common;
using Ctor.Domain.Entities.Enums;

namespace Ctor.Domain.Entities;
public class Building : BaseEntity
{
    public BuildingType BuildingType { get; set; }
    public BuildingBlockType BlockType { get; set; }
    public virtual ICollection<BuildingBlock> BuildingBlock { get; set; }

    public long? ProjectId { get; set; }
    public Project Project { get; set; }
}
