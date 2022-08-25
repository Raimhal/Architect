namespace Ctor.Application.Common.Interfaces;

public interface IFileManipulatorService
{
    public Task<FileInfo> Save(byte[] fileData, string fileName);
    public Task<FileInfo> Delete(string fileName);
}