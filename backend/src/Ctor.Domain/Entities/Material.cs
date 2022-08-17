using Ctor.Domain.Common;

namespace Ctor.Domain.Entities;
public class Material: BaseEntity
{
    public int RecourceName { get; set; }
    public int RecourceType { get; set; }
    public decimal Price { get; set; }
    public int Amount { get; set; }

    public long? CompanyId { get; set; }
    public Company Company { get; set; }

}
