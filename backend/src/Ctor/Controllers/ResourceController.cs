using Ctor.Application.Common.Models;
using Ctor.Application.Resources.Materials.Commands.CreateMaterialCommand;
using Ctor.Application.Resources.Materials.Commands.CreateRequiredMaterialsForBuildingCommand;
using Ctor.Application.Resources.Materials.Queries.GetAvailableMaterialsForProjectQuery;
using Ctor.Application.Resources.Materials.Queries.GetMaterialTypeQuery;
using Ctor.Application.Resources.Materials.Queries.GetMeasurementQuery;
using Ctor.Application.Resources.Queries.GetMaterialQuery;
using Microsoft.AspNetCore.Mvc;

namespace Ctor.Controllers;

[ApiController]
[Route("api/Resource")]
public class ResourceController : ApiControllerBase
{
    [HttpGet("materials")]
    public async Task<ActionResult<PaginationModel<GetMaterialsQueryDto>>> GetListOfMaterials([FromQuery] MaterialPaginationQueryDto queryModel)
    {
        return await Mediator.Send(new GetMaterialsQuery(queryModel));
    }
    [HttpGet("get-material-type")]
    public async Task<ActionResult> GetListOfMaterialType()
    {
        return Ok(await Mediator.Send(new GetMaterialTypeQuery()));
    }
    [HttpGet("get-measurement")]
    public async Task<ActionResult> GetListOfMeasurement()
    {
        return Ok(await Mediator.Send(new GetMeasurementQuery()));
    }
    [HttpPost]
    [Route("create")]
    public async Task<IActionResult> CreateMatial(CreateMaterialCommandDto model)
    {
        if (!ModelState.IsValid) return BadRequest("Model is not valid");
        await Mediator.Send(new CreateMaterialCommand(model));
        return StatusCode(201);
    }

    [HttpGet]
    [Route("available-materials")]

    public async Task<IActionResult> GetAvailableMaterialsForProject([FromQuery] GetAvailableMaterialsForProjectQuery query)
    {
        return Ok(await Mediator.Send(query));
    }

    [HttpPost]
    [Route("save-required")]
    public async Task<IActionResult> SaveRequiredMaterials([FromBody] CreateRequiredMaterialsForBuildingDto[] materials)
    {
        await Mediator.Send(new CreateRequiredMaterialsForBuildingCommand(materials));
        return StatusCode(201);
    }
}

