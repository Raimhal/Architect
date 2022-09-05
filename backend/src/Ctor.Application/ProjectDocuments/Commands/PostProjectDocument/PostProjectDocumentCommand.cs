using AutoMapper;
using Ctor.Application.Common.Interfaces;
using Ctor.Domain.Entities;
using MediatR;

namespace Ctor.Application.ProjectDocuments.Commands.PostProjectDocument;

public record PostProjectDocumentCommand(byte[][] Data, long BuildingId, string[] FileNames) : IRequest<List<PostProjectDocumentResponseDto>>;

public class
    PostProjectDocumentCommandHandler : IRequestHandler<PostProjectDocumentCommand, List<PostProjectDocumentResponseDto>>
{
    private readonly IMapper _mapper;
    private readonly IApplicationDbContext _context;
    private readonly IFileManipulatorService _fileManipulatorService;
    private readonly IDateTime _dateTime;

    public PostProjectDocumentCommandHandler(IMapper mapper, IApplicationDbContext context, IFileManipulatorService fileManipulatorService, IDateTime dateTime )
    {
        _mapper = mapper;
        _context = context;
        _fileManipulatorService = fileManipulatorService;
        _dateTime = dateTime;
    }

    public async Task<List<PostProjectDocumentResponseDto>> Handle(PostProjectDocumentCommand request, CancellationToken cancellationToken)
    {
        if (request.Data.Length != request.FileNames.Length) throw new ArgumentException();

        // Check if exists
        var building = await _context.Buildings.GetById(request.BuildingId, cancellationToken);
        // for all files
        var projectDocuments =  new List<ProjectDocument>();
        for (int i = 0; i < request.FileNames.Length; i++)
        {
            var fileType = Path.GetExtension(request.FileNames[i]);
            var path = $"projectDocuments\\{Guid.NewGuid()}{fileType}";
            var link = path.Replace("\\", "/");

            var fileInfo = await _fileManipulatorService.Save(request.Data[i], path);
            if (!fileInfo.Exists) throw new IOException();
            var projectDocument = new ProjectDocument
            {
                BuildingId = request.BuildingId,
                Created = _dateTime.UtcNow,
            };
            await _context.ProjectDocuments.AddRangeAsync(projectDocument);
            await _context.SaveChangesAsync(cancellationToken);

            var document = new Document { Link = link, Path = path, Name = request.FileNames[i], ProjectDocumentId = projectDocument.Id};
            projectDocument.Document = document;
            await _context.SaveChangesAsync(cancellationToken);
            projectDocuments.Add(projectDocument);

        }
        var response = _mapper.Map<List<PostProjectDocumentResponseDto>>(projectDocuments);
        return response;
    }
}