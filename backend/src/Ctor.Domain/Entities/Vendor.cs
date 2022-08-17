using Ctor.Domain.Common;
using Ctor.Domain.Entities.Enums;

namespace Ctor.Domain.Entities;
public class Vendor: BaseEntity
{
    public string EntityName { get; set; }
    public decimal Price { get; set; }
    public string Phone { get; set; }
    public string Email { get; set; }
    public string Website { get; set; }
    public VendorType VendorType { get; set; }

    public long? CompanyId { get; set; }
    public Company Company { get; set; }
}
