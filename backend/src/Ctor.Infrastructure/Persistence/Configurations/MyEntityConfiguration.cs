using Ctor.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Ctor.Infrastructure.Persistence.Configurations;

public class MyEntityConfiguration : IEntityTypeConfiguration<MyEntity>
{
    public void Configure(EntityTypeBuilder<MyEntity> builder)
    {
        builder.Property(x => x.Id)
            .UseIdentityByDefaultColumn()
            .HasIdentityOptions(startValue: 100);

        builder.Property(t => t.Prop)
            .HasMaxLength(200)
            .IsRequired();
    }
}
