using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ctor.Application.Authorization.Queries;
using FluentValidation;

namespace Ctor.Application.Authorization.Validation;
public class ForgotPasswordDTOValidation :AbstractValidator<ForgotPasswordQuery>
{
    public ForgotPasswordDTOValidation()
    {
        RuleFor(v => v.Email).EmailAddress();           
    }
}
