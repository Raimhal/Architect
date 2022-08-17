﻿using Ctor.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Ctor.Infrastructure.Persistence.Configurations;
public class CompanyConfiguration : IEntityTypeConfiguration<Company>
{
    public void Configure(EntityTypeBuilder<Company> builder)
    {
        builder.ToTable("Company").HasKey(x => x.Id);
        builder.HasIndex(x => x.Id).IsUnique();
        builder.Property(x => x.CompanyName).IsRequired();
        builder.Property(x => x.County).IsRequired();
        builder.Property(x => x.City).IsRequired();
        builder.Property(x => x.Address).IsRequired();
        builder.Property(x => x.Email).IsRequired();
        builder.HasMany(x => x.Materials)
            .WithOne(x => x.Company)
            .OnDelete(DeleteBehavior.Cascade);
        builder.HasMany(x => x.Users)
            .WithOne(x => x.Company)
            .OnDelete(DeleteBehavior.Cascade);
        builder.HasMany(x => x.Vendors)
            .WithOne(x => x.Company)
            .OnDelete(DeleteBehavior.Cascade);
        builder.HasMany(x => x.Projects)
            .WithOne(x => x.Company)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
