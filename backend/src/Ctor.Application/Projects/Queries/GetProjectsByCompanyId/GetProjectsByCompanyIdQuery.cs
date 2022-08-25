using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Ctor.Application.Common.Interfaces;
using MediatR;

namespace Ctor.Application.Projects.Queries.GetProjectsByCompanyId;
public record GetProjectsByCompanyIdQuery(long Id) : IRequest<List<ProjectBriefDto>>;


public class GetProjectsByCompanyIdQueryHandler : IRequestHandler<GetProjectsByCompanyIdQuery, List<ProjectBriefDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetProjectsByCompanyIdQueryHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<List<ProjectBriefDto>> Handle(GetProjectsByCompanyIdQuery request, CancellationToken cancellationToken)
    {
        var projects = await _context.Projects.Get(p => p.CompanyId == request.Id);
        return _mapper.Map<List<ProjectBriefDto>>(projects);
    }
}