using System.Security.Claims;
using Ctor.Application.Auth.Models;
using Ctor.Domain.Entities;

namespace Ctor.Application.Auth.Interfaces;

public interface ITokenProvider
{
    Token GenerateAccessToken(long userId, Role role);

    Token GenerateRefreshToken(long userId);

    ClaimsPrincipal? GetPrincipalFromExpiredAccessToken(string? accessToken);
}