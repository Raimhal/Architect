import {
  createAction,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import * as fromProject from './project.reducer';
import { ProjectStatus } from "../resources/models/status";

export const selectProjectState = createFeatureSelector<fromProject.State>(
  fromProject.projectFeatureKey
);

export const selectProjectPhotos = createSelector(
  selectProjectState,
  (state) => state.currentlyOpenProjectPhotos
);

export const selectProjects = createSelector(
  selectProjectState,
  (state) => state.projects
);

export const selectParams = createSelector(
  selectProjectState,
  (state) => state.params
);

export const selectCurrentProject = createSelector(
  selectProjectState,
  (state) => state.currentProject
);

export const selectCurrentProjectId = createSelector(
  selectCurrentProject,
  (state): number | null => state?.id ?? null
);

export const selectCurrentProjectStatus = createSelector(
  selectCurrentProject,
  (state): ProjectStatus | null => state?.status ?? null
);
