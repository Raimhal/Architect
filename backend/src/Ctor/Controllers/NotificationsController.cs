﻿using Ctor.Application.Notifications.Queries.GetNotifListByUserId;
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
    [Route("{userId:long}")]
    public async Task<IActionResult> GetAllNotificationsForUser(long id)
    {
        return Ok(await Mediator.Send(new GetNotifListByUserIdQuery(id)));
    }

    [HttpDelete("delete/{id:long}")]
    public async Task<IActionResult> DeleteProjectPhotoById(long id)
    {
        await Mediator.Send(new DeleteNotificationByIdCommand(id));
        return NoContent();
    }
}
