import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as ProjectReducer from './project.reducers';

export const selectProjectState = createFeatureSelector<ProjectReducer.State>(
  ProjectReducer.projectFeatureKey    
);


export const selectProjects = createSelector(
  selectProjectState,
  (state) => state.projects
);

export const selectParams = createSelector(
  selectProjectState,
  (state) => state.params
);
 
 
