import {
  createAction,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import * as fromProject from './project.reducer';

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
 
