using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ctor.Application.Common.Exceptions;
using Ctor.Application.Common.Interfaces;
using Ctor.Domain.Entities;
using Ctor.Domain.Repositories;
using MediatR;

namespace Ctor.Application.Companies.Commands;
public record CreateCompanyCommand : IRequest
{
    public CreateCompanyCommand(NewCompanyDto model)
    {
        this.Model = model;
    }
    public NewCompanyDto Model { get; }
}

public class CreateCompanyCommandHandler : IRequestHandler<CreateCompanyCommand>
{
    private readonly IApplicationDbContext _context;

    public CreateCompanyCommandHandler(IApplicationDbContext context)
    {
        this._context = context;
    }

    public async Task<Unit> Handle(CreateCompanyCommand request, CancellationToken cancellationToken)
    {
        List<Company> companies = await _context.Companies.GetAll();
        Company newCompany = new Company()
        {
            CompanyId = request.Model.CompanyId,
            Email = request.Model.Email,
            Address = request.Model.Address,
            City = request.Model.City,
            CompanyName = request.Model.CompanyName,
            Country = request.Model.Country,
            JoinDate = DateTime.UtcNow
        };
        if (companies.Any(el => el.CompanyId == newCompany.CompanyId)) throw new AlreadyExistsException("Company with this CompanyId already exist.");
        await this._context.Companies.Insert(newCompany);
        await this._context.SaveChangesAsync();
        return Unit.Value;
    }
}


