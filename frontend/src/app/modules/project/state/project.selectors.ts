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


export const selectProjects = createSelector(
  selectProjectState,
  (state) => state.projects
);

export const selectParams = createSelector(
  selectProjectState,
  (state) => state.params
);

export const selectProjectInformation = createSelector(
  selectProjectState,
  (state) => state.project
);

export const selectProjectInformationForm = createSelector(
  selectProjectState,
  (state) => state.projectInformationForm
);

export const selectProjectPhotos = createSelector(
  selectProjectState,
  (state) => state.currentlyOpenProjectPhotos
);

export const selectCurrentProject = createSelector(
  selectProjectState,
  (state) => state.currentProject
);

export const selectCurrentProjectId = createSelector(
  selectProjectInformation,
  (state): number | null => state?.id ?? null
);

export const selectCurrentProjectStatus = createSelector(
  selectProjectInformation,
  (state): ProjectStatus | null => state?.status ?? null
);

export const selectProjectBuildings = createSelector(
  selectProjectState,
  (state) => state.buildings
);

export const selectCurrentlyRevealedBuilding = createSelector(
  selectProjectState,
  (state) => state.currentlyRevealedBuilding
);

export const selectCurrentProjectTeam = createSelector(
  selectCurrentProject,
  (state) => state?.team ?? null
);

export const selectProjectDocuments = createSelector(
  selectProjectState,
  (state)=>state.currentlyOpenProjectDocuments
)
