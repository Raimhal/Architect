using Ctor.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Ctor.Infrastructure.Persistence.Configurations;
public class UserConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder.ToTable("User").HasKey(x => x.Id);
        builder.HasIndex(x=>x.Id).IsUnique();
        builder.Property(x => x.FirstName).IsRequired();
        builder.Property(x => x.LastName).IsRequired();
        builder.Property(x=>x.UserEmail).IsRequired();
        builder.Property(x => x.Password).IsRequired();
        builder.HasOne(x => x.Role)
            .WithOne(x => x.Users)
            .HasForeignKey<Role>(x => x.UserId)
            .OnDelete(DeleteBehavior.NoAction);
        builder.HasOne(x => x.Project)
            .WithOne(x => x.User)
            .HasForeignKey<Project>(x => x.UserId)
            .OnDelete(DeleteBehavior.NoAction);

    }
}
