using Microsoft.AspNetCore.Mvc;
using Ctor.Application.Companies.Queries;
using Ctor.Application.Companies.Commands;

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

    [HttpPost]
    [Route("create")]
    public async Task<IActionResult> CreateCompany(NewCompanyDto model)
    {
        if (!ModelState.IsValid) return BadRequest("Model is not valid");
        var createdCompany = Mediator.Send(new CreateCompanyCommand(model));
        if (createdCompany.Result == 409) return Conflict("Already exist");
        if (createdCompany.Result == 500) return BadRequest("Error creating a new company.");
        return StatusCode(201);
    }

    [HttpPut]
    public async Task<ActionResult<CompanyIdResponseDto>> PutCompany([FromBody]CompanyDetailedRequestDto data)
    {
        return await Mediator.Send(new PutCompanyDetailedCommand(data));
    }

    [HttpGet("{id:long}")]
    public async Task<ActionResult<CompanyDetailedResponseDto>> GetCompanyById(long id)
    {
        return await Mediator.Send(new GetCompanyByIdQuery(id));
    }
}
