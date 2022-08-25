﻿using Microsoft.AspNetCore.Mvc;
using Ctor.Application.Companies.Queries.GetCompaniesOverview;
using Ctor.Application.Companies.Queries.GetCompanyById;
using Ctor.Application.Companies.Commands;
using Ctor.Application.Companies.Queries.GetCompanyByUserId;

namespace Ctor.Controllers;

[Route("api/companies")]
[ApiExceptionFilter]
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
        await Mediator.Send(new CreateCompanyCommand(model));
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

    [HttpGet("get-by-user-id/{userId:long}")]
    public async Task<ActionResult<CompanyProfileDto>> GetCompanyByUserId(long userId)
    {
        return await Mediator.Send(new GetCompanyByUserIdQuery(userId));
    }
}
