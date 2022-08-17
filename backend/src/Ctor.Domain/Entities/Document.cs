using Ctor.Domain.Common;

namespace Ctor.Domain.Entities;
public class Document : BaseEntity
{
    public string Name { get; set; }
    public string Path { get; set; }
    public virtual ICollection<ProjectDocument> ProjectDocument { get; set; }

}
