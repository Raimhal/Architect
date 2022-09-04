using Ctor.Application.Notifications.Queries.GetNotifListByUserId;
using Microsoft.AspNetCore.Mvc;
using MediatR;
using Ctor.Application.Projects.Queries.GetProjectsQuery;
using Ctor.Application.Notifications.Commands;

namespace Ctor.Controllers;

[ApiController]
[Route("api/notifi")]
public class NotificationsController : ApiControllerBase
{
    [HttpGet]
    [Route("{userId}")]
    public async Task<IActionResult> GetAllNotificationsForUser(long userId)
    {
        return Ok(await Mediator.Send(new GetNotifListByUserIdQuery(userId)));
    }

    [HttpDelete("delete/{id:long}")]
    public async Task<IActionResult> DeleteNotificationById(long id)
    {
        await Mediator.Send(new DeleteNotificationByIdCommand(id));
        return NoContent();
    }

    [HttpDelete("deleteall/{id:long}")]
    public async Task<IActionResult> DeleteAllNotificationForUser(long id)
    {
        await Mediator.Send(new DeleteAllNotificationByUserIdCommand(id));
        return NoContent();
    }
}
