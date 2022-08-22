using System.Security.Claims;
using Ctor.Application.Common.Interfaces;

namespace Ctor.Services;

public class CurrentUserService : ICurrentUserService
{
    private readonly IHttpContextAccessor _httpContextAccessor;

    public CurrentUserService(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
    }

    public long? Id
    {
        get
        {
            var claim = _httpContextAccessor.HttpContext?.User?.FindFirstValue("id");

            if (long.TryParse(claim, out long id))
            {
                return id;
            }

            return null;
        }
    }
}