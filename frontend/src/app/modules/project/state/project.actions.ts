import { createAction, props } from '@ngrx/store';
import { HttError } from '../../error/resources/models/httpError';
import { CreateProjectDTO } from '../resources/models/createProjectDTO';

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

