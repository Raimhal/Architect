using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Ctor.Application.Common.Interfaces;
using Ctor.Domain.Entities;
using Ctor.Domain.Entities.Enums;
using MediatR;

namespace Ctor.Application.Projects.Commands.CreateProjectCommand;
public record CreateProjectCommand : IRequest
{
    public CreateProjectCommand(CreateProjectDTO project)
    {
        this.Project = project;
    }
    public CreateProjectDTO Project { get; }
}
public class CreateCompanyCommandHandler : IRequestHandler<CreateProjectCommand>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;
    private readonly INumberGenerateService _numberGenerateService;
    private readonly ICurrentUserService _currentUserService;

    public CreateCompanyCommandHandler(
        IApplicationDbContext context, 
        IMapper mapper, 
        INumberGenerateService numberGenerateService,
        ICurrentUserService currentUserService)
    {
        _context = context;
        _mapper = mapper;
        _numberGenerateService = numberGenerateService;
        _currentUserService = currentUserService;
    }

    public async Task<Unit> Handle(CreateProjectCommand request, CancellationToken cancellationToken)
    {
        if (_currentUserService.Role!= UserRoles.OperationalManager) {
            return Unit.Value;
        }
        var project = _mapper.Map<Project>(request.Project);      

        for (; await _context.Projects.AnyAsync(x => x.ProjectId == project.ProjectId);)
        {
            project.ProjectId = _numberGenerateService.GetRandomNumberForId();
        }

        await _context.Projects.Insert(project);
        await _context.SaveChangesAsync();

        return Unit.Value;
    }
}
