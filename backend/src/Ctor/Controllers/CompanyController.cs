using Microsoft.AspNetCore.Mvc;
using Ctor.Application.Companies.Queries;

namespace Ctor.Controllers;

[Route("api/companies")]
public class CompanyController : ApiControllerBase
{
    [HttpGet]
    public async Task<ActionResult<List<CompanyOverviewDto>>> GetCompanyWithParams([FromQuery(Name = "filter")] string? filter,
                                                                                   [FromQuery(Name = "sort")] string sort)
    {
        return await Mediator.Send(new GetCompaniesOverviewQuery(filter, sort));
    }
}
