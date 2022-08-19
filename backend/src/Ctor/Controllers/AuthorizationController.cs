using Ctor.Application.Authorization.DTOs;
using Ctor.Application.Authorization.Queries;
using Ctor.Application.MyEntity.Queries;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Ctor.Controllers;
[Route("api/auth")]
[ApiController]
public class AuthorizationController : ApiControllerBase
{
    [HttpPost("forgotPassword")]
    public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordDTO passwordDTO)
    {
        return Ok(await Mediator.Send(new ForgotPasswordQuery(passwordDTO)));

        return BadRequest();
    }
}
