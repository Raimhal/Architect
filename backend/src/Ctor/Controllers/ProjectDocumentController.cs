using Ctor.Application.DTOs;
using Ctor.Application.ProjectDocuments.Commands.DeleteProjectDocument;
using Ctor.Application.ProjectDocuments.Commands.PostProjectDocument;
using Ctor.Application.ProjectDocuments.Commands.PutProjectDocument;
using Ctor.Application.ProjectDocuments.Queries.GetProjectDocumentByProjectId;
using Ctor.Infrastructure.Extensions;
using Microsoft.AspNetCore.Mvc;

namespace Ctor.Controllers;

[Route("api/projectDocuments")]
[ApiExceptionFilter]
public class ProjectDocumentController : ApiControllerBase
{
    [HttpGet("project/{id:long}")]
    public async Task<ActionResult<List<GetProjectDocumentByProjectIdResponseDto>>> GetProjectDocumentsByProjectId(long id, [FromQuery] QueryModelDTO queryModel)
    {
        return await Mediator.Send(new GetProjectDocumentsByProjectIdQuery(id, queryModel));
    }

    [HttpPost("building/{id:long}")]
    public async Task<ActionResult<List<PostProjectDocumentResponseDto>>> PostProjectDocument([FromForm] IFormCollection data, long id)
    {
        return await Mediator.Send(new PostProjectDocumentCommand(
            await Task.WhenAll(data.Files.Select(file => file.GetBytes())), id,
            data.Files.Select(x => x.FileName).ToArray()));
    }

    [HttpPut]
    public async Task<ActionResult<PutProjectDocumentResponseDto>> PutProjectDocument([FromBody] PutProjectDocumentRequestDto data)
    {
        return await Mediator.Send(new PutProjectDocumentCommand(data));
    }

    [HttpDelete("{id:long}")]
    public async Task<ActionResult<DeleteProjectDocumentResponseDto>> DeleteProjectDocument(long id)
    {
        return await Mediator.Send(new DeleteProjectDocumentCommand(id));
    }

}