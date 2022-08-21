using Ctor.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Ctor.Infrastructure.Persistence.Configurations;
public class MaterialConfiguration : IEntityTypeConfiguration<Material>
{
    public void Configure(EntityTypeBuilder<Material> builder)
    {
        builder.Property(x => x.Id)
            .UseIdentityByDefaultColumn()
            .HasIdentityOptions(startValue: 100);

        builder.ToTable("Material").HasKey(x => x.Id);
        builder.HasIndex(x => x.Id).IsUnique();
        builder.Property(x => x.RecourceName).IsRequired();
        builder.Property(x => x.RecourceType).IsRequired();
        builder.Property(x => x.Price).IsRequired();
        builder.Property(x => x.Amount).IsRequired();
    }
}
