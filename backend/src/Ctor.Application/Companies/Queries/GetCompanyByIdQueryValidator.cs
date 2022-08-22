using FluentValidation;

namespace Ctor.Application.Companies.Queries;

public class GetCompanyByIdQueryValidator : AbstractValidator<GetCompanyByIdQuery>
{
    public GetCompanyByIdQueryValidator()
    {
        RuleFor(c => c.Id).GreaterThan(0);
    }
}