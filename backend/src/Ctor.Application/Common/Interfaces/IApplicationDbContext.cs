using Ctor.Domain.Repositories;

namespace Ctor.Application.Common.Interfaces;

public interface IApplicationDbContext
{
    IUserRepository Users { get; }
    IRoleRepository Roles { get; }
    ICompanyRepository Companies { get; }
    IBuildingRepository Buildings { get; }
    IProjectRepository Projects { get; }
    IPhaseRepository Phases { get; }
    IProjectPhotoRepository ProjectsPhotos { get; }
    ICompanyLogoRepository CompanyLogos { get; }
    IBuildingBlockRepository BuildingBlocks { get; }
    INotificationRepository Notifications { get; }
    IAssigneeRepository Assignees { get; }
    IProjectDocumentRepository ProjectDocuments { get; }
    IDocumentRepository Documents { get; }
    IMaterialRepository Materials { get; }
    IMaterialTypeRepository MaterialType { get; }
    IMeasurementRepository Measurements { get; }
    IRequiredMaterialRepository RequiredMaterials { get; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}
