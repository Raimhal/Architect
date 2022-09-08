﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ctor.Domain.Entities;

namespace Ctor.Domain.Repositories;
public interface IVendorRepository : IGenericRepository<Vendor>
{
    Task<Vendor> GetByIdWithVendorTypes(long id);
}
