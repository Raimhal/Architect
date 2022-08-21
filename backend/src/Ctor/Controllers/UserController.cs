using Ctor.Application.Roles.Queries;
using Ctor.Application.Users.Commands;
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
}
