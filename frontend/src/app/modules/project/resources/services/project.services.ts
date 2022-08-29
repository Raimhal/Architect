
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from "@angular/router";
import { Observable } from "rxjs";
import { ApiService } from 'src/app/core/resources/services/api.service';
import { IProjectPhotoId } from '../models/project-photo-id-response.model';
import { IProjectPhoto } from '../models/project-photo.model';
import { IResultId } from "src/app/modules/administration/resources/models/result-id.model";
import { PaginationModel } from "src/app/shared/models/pagination-model";
import { CreateProjectDTO } from "../models/createProjectDTO";
import { Order } from "../models/order";
import { IProjectDetailed } from "../models/project-details";
import { IProjectOverview } from "../models/project-overview";
import { IProjectUpdate } from "../models/project-update";
import { ProjectStatus } from "../models/status";

@Injectable({
  providedIn: 'root',
})

export class ProjectService extends ApiService {
  apiPath: string = `/projects`;

  constructor(http: HttpClient) {
    super(http);
  }

  getProjectsWithParams(
    params: Params
  ): Observable<PaginationModel<IProjectOverview>> {
    return this.getWithOptions<PaginationModel<IProjectOverview>>(this.apiPath, {
      params: params
    });
  }

  getDetailedProject(
    id: number
  ): Observable<IProjectDetailed> {
    const path = `${this.apiPath}/${id}`
    return this.get<IProjectDetailed>(path);
  }

  putDetailedProject(
    data: IProjectUpdate
  ): Observable<IResultId> {

    const project = {
      ...data,
      startTime: new Date(data.startTime).toISOString(),
      endTime: new Date(data.endTime).toISOString()
    }

    console.log("test")
    console.log(project)
    return this.put<IResultId>(this.apiPath, project)
  }


  createProject(project: CreateProjectDTO) {
    return this.post(`${this.apiPath}`, project);
  }

  getProjectPhotos(projectId: number) {
    return this.get<IProjectPhoto[]>(`${this.apiPath}/${projectId}/photos`);
  }
  deleteProjectPhoto(projectId: number, projectPhotoId: number){
    return this.delete<IProjectPhotoId>(`${this.apiPath}/${projectId}/photos/${projectPhotoId}`)
  }

  changeStatus(projectId: number, newStatus: ProjectStatus) {
    return this.put(`${this.apiPath}/change-status`, { projectId, newStatus });
  }
}
