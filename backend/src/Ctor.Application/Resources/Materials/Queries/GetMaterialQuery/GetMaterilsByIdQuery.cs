using System.Linq.Expressions;
using AutoMapper;
using Ctor.Application.Common.Exceptions;
using Ctor.Application.Common.Interfaces;
using Ctor.Application.Common.Models;
using Ctor.Domain.Entities;
using MediatR;

namespace Ctor.Application.Resources.Queries.GetMaterialQuery;
public record GetMaterialsQuery(MaterialPaginationQueryDto QueryModel) : IRequest<PaginationModel<GetMaterialsQueryDto>>;
public class GetMaterialsQueryHandler : IRequestHandler<GetMaterialsQuery, PaginationModel<GetMaterialsQueryDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUserService _currentUserService;

    public GetMaterialsQueryHandler(IApplicationDbContext context, ICurrentUserService currentUserService)
    {
        _context = context;
        _currentUserService = currentUserService;
    }

    public async Task<PaginationModel<GetMaterialsQueryDto>> Handle(GetMaterialsQuery request, CancellationToken cancellationToken)
    {
        var query = request.QueryModel.Query;

        Expression<Func<Material, bool>> filterPrecicate = material
            => (string.IsNullOrEmpty(query) || material.CompanyName.ToLower().Contains(query.ToLower()))
            && material.CompanyId == _currentUserService.CompanyId;

        var sort = request.QueryModel.Sort;
        var order = request.QueryModel.Order;
        var page = request.QueryModel.Page;
        var count = request.QueryModel.Count;

        (var material, var total) = await _context.Materials.GetFilteredWithTotalSum<GetMaterialsQueryDto>(filterPrecicate, page, count, sort, order);

        //var material = list.Where(x => x.CompanyId == request.companyId).ToList();
        //if (material == null)
        //    throw new NotFoundException("Such materials exist");

        //total = material.Count();

        return new() { List = material, Total = total };
    }
}