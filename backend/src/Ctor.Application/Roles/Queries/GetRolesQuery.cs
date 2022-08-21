using AutoMapper;
using Ctor.Application.Common.Interfaces;
using MediatR;
using Microsoft.Extensions.Logging;

namespace Ctor.Application.Roles.Queries;
public record GetRolesQuery : IRequest<List<RoleDto>>
{
    public GetRolesQuery() { }
}

public class GetRolesQueryHandler : IRequestHandler<GetRolesQuery, List<RoleDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;
    private readonly ILogger<GetRolesQueryHandler> _logger;

    public GetRolesQueryHandler(IApplicationDbContext context, IMapper mapper, ILogger<GetRolesQueryHandler> logger)
    {
        _context = context;
        _mapper = mapper;
        _logger = logger;
    }

    public async Task<List<RoleDto>> Handle(GetRolesQuery request, CancellationToken cancellationToken)
    {
        var filteredRoles = await _context.Roles.GetFilteredWithTotalSum(0, 0,
            r => r.OrderBy(x => x.Id),
            r => r.RoleName != "Admin");
        var smth = filteredRoles.entities;

        return _mapper.Map<List<RoleDto>>(smth);

    }
}
