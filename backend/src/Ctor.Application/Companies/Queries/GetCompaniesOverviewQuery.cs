using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Ctor.Application.Common.Interfaces;
using Ctor.Domain.Entities;
using MediatR;

namespace Ctor.Application.Companies.Queries;

public record GetCompaniesOverviewQuery(string Filter, string Sort) : IRequest<List<CompanyOverviewDto>>;

public class GetCompaniesOverviewQueryHandler : IRequestHandler<GetCompaniesOverviewQuery, List<CompanyOverviewDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetCompaniesOverviewQueryHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<List<CompanyOverviewDto>> Handle(GetCompaniesOverviewQuery request, CancellationToken cancellationToken)
    {
        Expression<Func<Company, bool>> filterPredicate = null;
        if (!string.IsNullOrEmpty(request.Filter))
        {
            filterPredicate = company => company.CompanyName.StartsWith(request.Filter);
        }

        Func<IQueryable<Company>, IOrderedQueryable<Company>> orderBy = null;
        if (request.Sort == "name")
        {
            orderBy = companies => companies.OrderBy(c => c.CompanyName);
        }
        if (request.Sort == "joinDate")
        {
            orderBy = companies => companies.OrderByDescending(c => c.JoinDate);
        }

        var companies = await _context.Companies.GetOrdered(orderBy, filterPredicate);

        return _mapper.Map<List<CompanyOverviewDto>>(companies);
    }
}
