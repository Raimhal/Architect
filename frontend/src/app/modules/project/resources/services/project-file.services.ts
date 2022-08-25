import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FileService } from 'src/app/core/resources/services/file.service';
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
}
