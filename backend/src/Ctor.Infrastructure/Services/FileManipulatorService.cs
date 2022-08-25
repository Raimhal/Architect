using Ctor.Application.Common.Interfaces;
using Ctor.Application.Common.Models;
using Microsoft.Extensions.Options;

namespace Ctor.Infrastructure.Services;

public class FileManipulatorService : IFileManipulatorService
{
    private readonly string _folderPath;

    public FileManipulatorService(IOptions<FileManipulatorSettings> fileSettings)
    {
        _folderPath = fileSettings.Value.FolderPath;
    }
    public async Task<FileInfo> Save(byte[] fileData, string fileName)
    {
        var filePath = Path.Combine(_folderPath, $"{fileName}");
        var directory = Path.GetDirectoryName(filePath);
        if (!Directory.Exists(directory)) Directory.CreateDirectory(directory);

        await using (var fileStream = new FileStream(filePath, FileMode.Create, FileAccess.Write))
        {
            await fileStream.WriteAsync(fileData, 0, fileData.Length);
        }

        var fileInfo = new FileInfo(filePath);
        return fileInfo;
    }

    public async Task<FileInfo> Delete(string fileName)
    {
        var filePath = Path.Combine(_folderPath, $"{fileName}");
        await Task.Run(() => File.Delete(filePath));
        var fileInfo = new FileInfo(filePath);
        return fileInfo;
    }
}