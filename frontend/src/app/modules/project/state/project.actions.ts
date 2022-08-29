import { Params } from '@angular/router';
import { createAction, props } from '@ngrx/store';
import { PaginationModel } from "src/app/shared/models/pagination-model";
import { HttError } from '../../error/resources/models/httpError';
import { CreateProjectDTO } from '../resources/models/createProjectDTO';
import { IProjectDetailed } from '../resources/models/project-details';
import { IProjectOverview } from '../resources/models/project-overview';
import { IProjectPhoto } from '../resources/models/project-photo.model';
import { IProjectUpdate } from '../resources/models/project-update';
import { ProjectStatus } from '../resources/models/status';


export const getDetailedProject = createAction(
  '[Project Information Component] Load Detailed Project',
  props<{ id: number }>()
);

export const getDetailedProjectSuccess = createAction(
  '[Project Information Component] Load Detailed Project Success',
  props<{ data: IProjectDetailed }>()
);

export const getDetailedProjectFailure = createAction(
  '[Project Information Component] Load Detailed Project Failure',
  props<{ error: any }>()
);

export const loadDisabledProjectInformationForm = createAction(
  '[Project Information Component] Load Project Information Form'
);

export const editProjectInformationForm = createAction(
  '[Project Information Component] Edit Project Information Form'
);

export const submitProjectInformationForm = createAction(
  '[Project Information Component] Submit Project Information Form',
  props<IProjectUpdate>()
);
export const submitProjectInformationFormSuccess = createAction(
  '[Project Information Component] Submit Project Information Form Success',
  props<{ data: IProjectDetailed }>()
);
export const submitProjectInformationFormFailure = createAction(
  '[Project Information Component] Submit Project Information Form Failure',
  props<{ error: any }>()
);
export const cancelEditProjectInformationForm = createAction(
  '[Project Information Component] Cancel Project Information Form'
);
export const crateProject = createAction(
  '[Project] Create Project',
  props<{ project: CreateProjectDTO }>()
);
export const crateProjectSuccess = createAction(
  '[Project] Create Project Success'
);
export const crateProjectFailure = createAction(
  '[Project] Create Project Failure',
  props<{ error: HttError }>()
);


export const getProjectsWithParams = createAction(
  '[Project List Component] Get Projects With Parameters',
);

export const getProjectssWithParamsSuccess = createAction(
  '[Project List Component] Get Projects With Parameters Success',
  props<{ data: PaginationModel<IProjectOverview> }>()
);

export const getProjectsWithParamsFailure = createAction(
  '[Project List Component] Get Projects With Parameters Failure',
  props<{ error: any }>()
);

export const changeParams = createAction(
  '[Project List Component] Change Projects\' Params',
  props<{ params: Partial<Params> }>()
)

export const loadProjectPhotos = createAction(
  '[Project Photos Component] Load Project Photos',
  props<{projectId: number}>()
);

export const loadProjectPhotosSuccess = createAction(
  '[Project Photos Component] Load Project Photos Success',
  props<{ data: IProjectPhoto[] }>()
);

export const loadProjectPhotoFailure = createAction(
  '[Project Photos Component] Load Projects Photos Failure',
  props<{ error: any }>()
);

export const deleteProjectPhoto = createAction(
  '[Project Photos Component] Delete Project Photo',
  props<{projectId: number, photoId: number}>()
);

export const deleteProjectPhotoSuccess = createAction(
  '[Project Photos Component] Delete Project Photos Success',
  props<{ projectId: number, id: number }>()
);

export const deleteProjectPhotoFailure = createAction(
  '[Project Photos Component] Delete Projects Photos Failure',
  props<{ error: any }>()
);

export const uploadProjecPhotoSuccess = createAction(
  '[Add Project Photos Component] Upload Projects Photos Success',
  props<{id: number}>()
);

export const uploadProjecPhotoFailure = createAction(
  '[Add Project Photos Component] Upload Projects Photos Failure'
);

export const changeProjectStatus = createAction(
  '[Project] Change Project Status',
  props<{ projectId: number, newStatus: ProjectStatus }>()
);

export const changeProjectStatusSuccess = createAction(
  '[Project] change Project Status Success',
  props<{ newStatus: ProjectStatus }>()
);

export const changeProjectStatusFailure = createAction(
  '[Project] change Project Status Failure',
  props<{ error: any }>()
);
