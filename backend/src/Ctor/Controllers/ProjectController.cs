using Ctor.Application.Companies.Queries;
using Ctor.Application.DTOs;
using Ctor.Application.Projects.Queries;
using Ctor.Application.Projects.Queries.GetProjectsQuery;
using Microsoft.AspNetCore.Mvc;

namespace Ctor.Controllers;

[Route("api/projects")]
public class ProjectController : ApiControllerBase
{
    [HttpGet]
    public async Task<ActionResult> GetProjectsWithParams([FromQuery] ProjectPaginationQueryDTO queryModel)
    {
        return Ok(await Mediator.Send(new GetProjectsOverviewQuery(queryModel)));
    }
}

