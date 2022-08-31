using Ctor.Application.Common.Interfaces;
using Ctor.Application.DTOs;
using Ctor.Application.Notification.Interfaces;
using Ctor.Hubs;
using Microsoft.AspNetCore.SignalR;

namespace Ctor.Services;

/*
 *  Use this service for sending notification.
 *  Inside request handler, using di, add INotificationService,
 *  and send notifications to user or group.
 *  ass parameter in function put NotificationDTO.
 */

public class NotificationService : INotificationService
{
    readonly IHubContext<NotificationsHub, IHubNotification> _notifHub;
    private readonly IHttpContextAccessor _httpContextAccessor;
    public NotificationService(IHubContext<NotificationsHub, IHubNotification> notifHub, IHttpContextAccessor httpContextAccessor)
    {
        this._notifHub = notifHub;
        this._httpContextAccessor = httpContextAccessor;
    }
    public async Task SendNotificationToUser(NotificationDTO notification, long? id)
    {
        if (id.HasValue)
        {
            await _notifHub.Clients.Group(id.Value.ToString()).SendNotif(notification);
        }
    }

    public async Task SendNotificationToGroup(NotificationDTO notification, string groupName)
    {
        await this._notifHub.Clients.Group(groupName).SendNotif(notification);
    }
}
