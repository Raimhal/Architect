import { Params } from '@angular/router';
import { Action, createReducer, on } from '@ngrx/store';
import { Order } from '../resources/models/order';
import { IProjectOverview } from '../resources/models/project-overview';
import { IProjectPhotoId } from '../resources/models/project-photo-id-response.model';
import { IProjectPhoto } from '../resources/models/project-photo.model';
import { createFormGroupState, disable, enable, FormGroupState, onNgrxForms, onNgrxFormsAction, SetValueAction } from 'ngrx-forms';
import { ProjectStatus } from '../resources/models/status';
import * as ProjectActions from './project.actions';
import * as fromProjectInformationForm from "../resources/forms/project-information-form"
import { IProjectDetailed } from '../resources/models/project-details';

export const projectFeatureKey = 'project';

export interface State {
  projects: IProjectOverview[],
  params: Params,
  total: number,
  currentlyOpenProjectPhotos: IProjectPhoto[],
  project: IProjectDetailed,
  projectInformationForm: FormGroupState<fromProjectInformationForm.ProjectInformationFormValue>,
  error: string
}
const initialProjectState: State = {
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
  error: "",
  project: {} as IProjectDetailed,
  currentlyOpenProjectPhotos: [],
  projectInformationForm: fromProjectInformationForm.initialFormState,
}

export const reducer = createReducer(
  initialProjectState,
  onNgrxForms(),
  on(ProjectActions.getProjectssWithParamsSuccess, (state, action) => {
    return {...state, projects: action.data.list, total: action.data.total}
  }),
  on(ProjectActions.changeParams, (state, action) => {
    return {...state, params: {...state.params, ...action.params}}
  }),
  on(ProjectActions.getDetailedProjectSuccess, (state, action) => {
    return {...state, project: action.data}
  }),
  on(ProjectActions.getDetailedProjectFailure, (state, action) => {
    return {...state, error: action.error};
    }
  ),
  onNgrxFormsAction(SetValueAction, (state, action) => {
    return {
      ...state,
      projectInformationForm:
        fromProjectInformationForm.validateCompanyInformationForm(
          state.projectInformationForm
        ),
    };
  }),
  on(ProjectActions.editProjectInformationForm, (state) => {
    {
      return {
        ...state,
        companyInformationForm: enable(state.projectInformationForm),
      };
    }
  }),
  on(ProjectActions.cancelEditProjectInformationForm, (state) => {
    return {
      ...state,
      companyInformationForm: disable(state.projectInformationForm),
    };
  }),
  on(
    ProjectActions.submitProjectInformationFormFailure,
    (state, action) => {
      return {
        ...state,
        error: action.error,
      };
    }
  ),
  on(
    ProjectActions.loadDisabledProjectInformationForm,
    (state, action) => ({
      ...state,
      projectInformationForm: 
        createFormGroupState<fromProjectInformationForm.ProjectInformationFormValue>(
          fromProjectInformationForm.FORM_ID,
          {
            address: state.project.address,
            startTime: state.project.startTime,
            endTime: state.project.endTime,
          }
        )
      ,
    })
  ),
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
  }),
  on(ProjectActions.changeProjectStatusSuccess, (state, action) => {
    return {
      ...state,
      currentProject: {
        id: state.project!.id,
        status: action.newStatus
      },
    }
  }),
);
