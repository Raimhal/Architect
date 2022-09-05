import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FileService } from 'src/app/core/resources/services/file.service';
import { IProjectDocumentId } from '../models/project-documents/project-document-id.model';
import { IProjectPhotoId } from '../models/project-photo-id-response.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectFileService extends FileService {
  ApiPath: string = `/projects`;

  constructor(http: HttpClient) {
    super(http);
  }

  putPhotos(projectId: number, files: File[]) {
    let formData = new FormData();
    Array.from(files).forEach((file) => {
      formData.append('file', file, file.name);
    });
    return this.put<any>(
      `${this.ApiPath}/${projectId}/photos`,
      formData
    );
  }

  postDocuments(buildingId: number, files: File[]) {
    let formData = new FormData();
    Array.from(files).forEach((file) => {
      formData.append('file', file, file.name);
    });
    return this.post<IProjectDocumentId[]>(
      `/projectDocuments/building/${buildingId}`,
      formData
    );
  }
}
