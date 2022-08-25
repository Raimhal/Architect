import { createAction, props } from '@ngrx/store';
import {ICompanyProfile} from "../recources/models/company-profile";
import {IProjectOverview} from "../recources/models/project-overview";

export const loadCompany = createAction(
  '[Company Component] Load Company',
);

export const loadCompanySuccess = createAction(
  '[Company Api Service] Load Company Success',
  props<{company : ICompanyProfile}>()
);

export const loadCompanyFailure = createAction(
  '[Company Api Service] Load Company Failure',
  props<{error : any}>()
);

export const loadProjects = createAction(
  '[Company Component] Load projects',
);

export const loadProjectsSuccess = createAction(
  '[Company Api Service] Load Projects Success',
  props<{projects : IProjectOverview[]}>()
);

export const loadProjectsFailure = createAction(
  '[Company Api Service] Load Projects Failure',
  props<{error : any}>()
);
