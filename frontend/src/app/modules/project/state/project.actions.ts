import { createAction, props } from '@ngrx/store';
import { HttError } from '../../error/resources/models/httpError';
import { CreateProjectDTO } from '../resources/models/createProjectDTO';
import { PaginationModel } from 'src/app/shared/models/pagination-model';
import { Params } from '../resources/models/params';
import { IProjectOverview } from '../resources/models/project-overview';
import { IProjectPhoto } from '../resources/models/project-photo.model';

export const loadProjects = createAction(
  '[Project] Load Projects'
);

export const loadProjectsSuccess = createAction(
  '[Project] Load Projects Success',
  props<{ data: any }>()
);

export const loadProjectsFailure = createAction(
  '[Project] Load Projects Failure',
  props<{ error: any }>()
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