using FluentValidation;

namespace Ctor.Application.ProjectDocuments.Commands.PostProjectDocument;

public class PostProjectDocumentCommandValidator : AbstractValidator<PostProjectDocumentCommand>
{
    public PostProjectDocumentCommandValidator()
    {
        RuleFor(x => x.BuildingId).GreaterThan(0);
        RuleFor(x => x.Data).NotEmpty().WithMessage("Files must not be empty");
    }
}