﻿using Ctor.Domain.Common;

namespace Ctor.Domain.Entities;
public class Company : BaseEntity
{
    public string CompanyName { get; set; }
    public string County { get; set; }
    public string City { get; set; }
    public string Address { get; set; }
    public string Email { get; set; }
    public DateTime JoinDate { get; set; }
    public virtual ICollection<Material> Materials { get; set; }
    public virtual ICollection<User> Users { get; set; }
    public virtual ICollection<Vendor> Vendors { get; set; }
    public virtual ICollection<Project> Projects { get; set; }
}
