using Ctor.Application.Common.Exceptions;
using Ctor.Application.Common.Interfaces;
using Ctor.Domain.Entities.Enums;
using MediatR;

namespace Ctor.Application.Projects.Commands.SetProjectTeam;

public record SetProjectTeamCommand(long ProjectId, ISet<long> UserIds) : IRequest;

public class SetProjectTeamCommandHandler : IRequestHandler<SetProjectTeamCommand>
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUserService _currentUserService;

    public SetProjectTeamCommandHandler(
        IApplicationDbContext context,
        ICurrentUserService currentUserService)
    {
        _context = context;
        _currentUserService = currentUserService;
    }

    public async Task<Unit> Handle(SetProjectTeamCommand request, CancellationToken cancellationToken)
    {
        await _context.Projects.SetTeamAsync(request.ProjectId, request.UserIds, _currentUserService.Id!.Value);
        await _context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }
}