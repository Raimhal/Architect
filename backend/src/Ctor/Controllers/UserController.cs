using Ctor.Application.Roles.Queries;
using Ctor.Application.Users.Commands;
using Ctor.Application.Users.Queries;
using Microsoft.AspNetCore.Mvc;



namespace Ctor.Controllers;
[Route("api/users")]
public class UserController : ApiControllerBase
{
    [HttpPost]
    public async Task<ActionResult<bool>> Add([FromBody] AddUserCommand command)
    {
        return await Mediator.Send(command);

    }
    [HttpGet]
    [Route("roles")]
    public async Task<List<RoleDto>> GetAllRoles()
    {
        return await Mediator.Send(new GetRolesQuery());
    }

    [HttpGet("byCompanyId/{id:long}")]
    public async Task<ActionResult<List<UserByCompanyIdResponseDto>>> GetUsersByCompanyId(long id)
    {
        return await Mediator.Send(new GetUsersByCompanyIdQuery(id));
    }
}
