using Ctor.Application.Companies.Queries;
using Ctor.Application.DTOs;
using Ctor.Application.Projects.Commands;
using Ctor.Application.Projects.Queries;
using Ctor.Application.Projects.Queries.GetProjectsByCompanyId;
using Ctor.Application.Projects.Queries.GetProjectsQuery;
using Ctor.Application.Projects.Commands.CreateProjectCommand;
using Ctor.Infrastructure.Extensions;
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

    [HttpPost("")]
    public async Task<IActionResult> CreateProjects([FromBody] CreateProjectDTO project)
    {
        return Ok(await Mediator.Send(new CreateProjectCommand(project)));
    }

    [HttpGet("company/{id}")]
    public async Task<ActionResult<List<ProjectBriefDto>>> GetProjectsByCompanyId([FromRoute] long id)
    {
        return await Mediator.Send(new GetProjectsByCompanyIdQuery(id));
    }

    [HttpGet("{id:long}/photos")]
    public async Task<ActionResult<List<GetProjectPhotoByProjectIdResponseDto>>> GetProjectPhotos(
        long id)
    {
        return await Mediator.Send(
            new GetProjectPhotosByProjectIdQuery(id));
    }

    [HttpPut("{id:long}/photos")]
    public async Task<ActionResult<List<PutProjectPhotoResponseDto>>> PutProjectPhotos(
        [FromForm]IFormCollection data, long id)
    {
        return await Mediator.Send(
            new PutProjectPhotosCommand(await Task.WhenAll(data.Files.Select(file => file.GetBytes())), id));
    }

    [HttpDelete("{id:long}/photos/{photoId:long}")]
    public async Task<ActionResult<DeleteProjectPhotoByIdResponseDto>> DeleteProjectPhotoById(long photoId, long id)
    {
        return await Mediator.Send(new DeleteProjectPhotoByIdCommand(id, photoId));
    }
}