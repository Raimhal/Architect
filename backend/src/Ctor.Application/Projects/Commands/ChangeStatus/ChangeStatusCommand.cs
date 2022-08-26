using Ctor.Application.Common.Exceptions;
using Ctor.Application.Common.Interfaces;
using Ctor.Domain.Entities.Enums;
using MediatR;

namespace Ctor.Application.Projects.Commands.ChangeStatus;

public record ChangeStatusCommand(long ProjectId, ProjectStatus NewStatus) : IRequest;

public class ChangeStatusCommandHandler : IRequestHandler<ChangeStatusCommand>
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUserService _currentUserService;

    public ChangeStatusCommandHandler(
        IApplicationDbContext context,
        ICurrentUserService currentUserService)
    {
        _context = context;
        _currentUserService = currentUserService;
    }

    public async Task<Unit> Handle(ChangeStatusCommand request, CancellationToken cancellationToken)
    {
        var project = await _context.Projects
            .SingleOrDefault(p => p.Id == request.ProjectId && p.Company.Users
                .Any(u => u.Role.Type == UserRoles.OperationalManager || u.Role.Type == UserRoles.ProjectManager));

        if (project == null)
        {
            throw new NotFoundException();
        }

        project.Status = request.NewStatus;
        await _context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }
}