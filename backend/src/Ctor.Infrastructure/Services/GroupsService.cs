using Ctor.Application.Common.Interfaces;
using Ctor.Domain.Entities;
using Ctor.Domain.Entities.Enums;

namespace Ctor.Infrastructure.Services;

public class GroupsService : IGroupsService
{
    private readonly IApplicationDbContext _context;

    public GroupsService(IApplicationDbContext context)
    {
        this._context = context;
    }
    public async Task<List<string>> GetGroupsOfUserAsync(long? id)
    {
        List<string> roles = new List<string>();
        if (!id.HasValue) return roles;
        User? user = await _context.Users.FindById(id.Value);
        if(user == null) return roles;

        if (user.RoleId == 1) roles.Add("admin");
        if(user.RoleId == 3) {
            roles.Add(user.CompanyId + "_PM");
        }
        if(user.RoleId == 2)
        {
            roles.Add(user.CompanyId + "_OM");
        }
        return roles;
    }
}
