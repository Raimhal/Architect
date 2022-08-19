using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ctor.Application.Authorization.DTOs;
using Ctor.Application.Common.Exceptions;
using Ctor.Application.Common.Interfaces;
using Ctor.Application.DTOs.EmailDTos;
using MediatR;
using Microsoft.Extensions.Logging;

namespace Ctor.Application.Authorization.Queries;
public class ForgotPasswordQuery : IRequest<Task>
{
    public ForgotPasswordQuery(ForgotPasswordDTO passwordDTO)
    {
        Email = passwordDTO.Email;
    }
    public string Email { get; }
}

public class ForgotPasswordQueryHandler : IRequestHandler<ForgotPasswordQuery,Task>
{
    private readonly IApplicationDbContext _context;
    private readonly IEmailService _emailService;
    private readonly IPasswordService _passwordService;
    private readonly ISecurityService _securityService;

    public ForgotPasswordQueryHandler(
        IApplicationDbContext context,
        IEmailService emailService,
        IPasswordService passwordService,
        ISecurityService securityService)
    {
        _context = context;
        _emailService = emailService;
        _passwordService = passwordService;
        _securityService = securityService;
    }

    public async Task<Task> Handle(ForgotPasswordQuery request, CancellationToken cancellationToken)
    {
        var user = await _context.Users.SingleOrDefault(x => x.UserEmail == request.Email);
        if (user==null)
        {
            throw new NotFoundException("Email not found");
        }
        var password = _passwordService.GeneratePassword();
        user.Password = _securityService.ComputeSha256Hash(password);
        _context.Users.Update(user);
        await _context.SaveChangesAsync();

        var emails = new List<EmailDTO>() {
             new EmailDTO(){
                 Email=request.Email,
                 Name=$"{user.FirstName} {user.LastName}"
             }
        };
        
        var html = $"<h2>Forgot Password</h2> <p>{password}</p>";
        return _emailService.SendAsync(emails, "Forgor Password", "Forgot Password", html);     

    }
}
