import { Action, createReducer, on } from '@ngrx/store';
import { Order } from '../resources/models/order';
import { Params } from '../resources/models/params';
import { IProjectOverview } from '../resources/models/project-overview';
import { IProjectPhotoId } from '../resources/models/project-photo-id-response.model';
import { IProjectPhoto } from '../resources/models/project-photo.model';
import { ProjectStatus } from '../resources/models/status';
import * as ProjectActions from './project.actions';

export const projectFeatureKey = 'project';

export interface State {
  projects: IProjectOverview[],
  params: Params,
  total: number,
  currentlyOpenProjectPhotos: IProjectPhoto[];
}
export const initialState: State = {
  projects: [],
  params: {
    page: 1,
    count: 10,
    query: "",
    sort: "Id",
    order: Order.ASC,
    status: ProjectStatus.InProcess
  },
  total: 0,
  currentlyOpenProjectPhotos: []
};

export const reducer = createReducer(
  initialState,

  on(ProjectActions.loadProjects, (state) => state),
  on(ProjectActions.loadProjectsSuccess, (state, action) => state),
  on(ProjectActions.loadProjectsFailure, (state, action) => state),
  on(ProjectActions.loadProjectPhotosSuccess, (state, action) => {
    return {
      ...state,
      currentlyOpenProjectPhotos: action.data,
    };
  }),
  on(ProjectActions.deleteProjectPhotoSuccess, (state, action) => {
    return {
      ...state,
      currentlyOpenProjectPhotos: state.currentlyOpenProjectPhotos.filter(
        (p) => p.id != action.id
      ),
    };
  }),
  on(ProjectActions.getProjectssWithParamsSuccess, (state, action) => {
    return {...state, projects: action.data.list, total: action.data.total}
  }),
  on(ProjectActions.changeParams, (state, action) => {
    return {...state, params: {...state.params, ...action.params}}
  })
);
