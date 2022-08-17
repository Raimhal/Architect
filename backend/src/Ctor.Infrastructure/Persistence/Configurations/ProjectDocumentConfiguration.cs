using Ctor.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Ctor.Infrastructure.Persistence.Configurations;
public class ProjectDocumentConfiguration : IEntityTypeConfiguration<ProjectDocument>
{
    public void Configure(EntityTypeBuilder<ProjectDocument> builder)
    {
        builder.ToTable("ProjectDocument").HasKey(x => x.Id);
        builder.HasIndex(x => x.Id).IsUnique();
        builder.HasOne(x => x.Project)
               .WithMany(x=>x.ProjectDocument)
            .HasForeignKey(p=>p.ProjectId);
        builder.HasOne(x => x.Document)
               .WithMany(x => x.ProjectDocument)
               .HasForeignKey(p => p.DocumentId);
    }
}
