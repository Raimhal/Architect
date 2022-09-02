import { Params } from '@angular/router';
import { createReducer, on } from '@ngrx/store';
import { Order } from '../resources/models/order';
import { IProjectOverview } from '../resources/models/project-overview';
import { IProjectPhoto } from '../resources/models/project-photo.model';
import { createFormGroupState, disable, enable, FormGroupState, onNgrxForms, onNgrxFormsAction, SetValueAction } from 'ngrx-forms';
import { ProjectStatus } from '../resources/models/status';
import * as ProjectActions from './project.actions';
import * as fromProjectInformationForm from "../resources/forms/project-information-form"
import { IProjectDetailed } from '../resources/models/project-details';
import {IBuilding} from "../resources/models/building.model";

export const projectFeatureKey = 'project';

export interface State {
  projects: IProjectOverview[],
  params: Params,
  total: number,
  currentlyOpenProjectPhotos: IProjectPhoto[],
  project: IProjectDetailed,
  projectInformationForm: FormGroupState<fromProjectInformationForm.ProjectInformationFormValue>,
  buildings : IBuilding[],
  currentlyRevealedBuilding : number | null,
  currentProject: {
    id: number,
    status: ProjectStatus,
    team: {
      id: number,
      name: string,
      role: string,
      email: string,
      phoneNumber: string
    }[] | null,
  } | null,
  error: string,
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
  error: "",
  project: {} as IProjectDetailed,
  currentlyOpenProjectPhotos: [],
  projectInformationForm: fromProjectInformationForm.initialFormState,
  buildings: [],
  currentlyRevealedBuilding: null,
  currentProject: {
    id: 1,
    status: ProjectStatus.InProcess,
    team: [],
  },
};

export const reducer = createReducer(
  initialState,
  onNgrxForms(),
  on(ProjectActions.getProjectssWithParamsSuccess, (state, action) => {
    return { ...state, projects: action.data.list, total: action.data.total }
  }),
  on(ProjectActions.changeParams, (state, action) => {
    return { ...state, params: { ...state.params, ...action.params } }
  }),
  on(ProjectActions.getDetailedProjectSuccess, (state, action) => {
    return { ...state, project: action.data }
  }),
  on(ProjectActions.getDetailedProjectFailure, (state, action) => {
      return { ...state, error: action.error };
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
    return { ...state, projects: action.data.list, total: action.data.total }
  }),
  on(ProjectActions.changeParams, (state, action) => {
    return { ...state, params: { ...state.params, ...action.params } }
  }),
  on(ProjectActions.changeProjectStatusSuccess, (state, action) => {
    return {
      ...state,
      currentProject: {
        ...state.currentProject!,
        status: action.newStatus,
      },
    }
  }),
  on(ProjectActions.getProjectTeamSuccess, (state, action) => {
    return {
      ...state,
      currentProject: {
        ...state.currentProject!,
        team: action.response.users.map(u => ({
          id: u.id,
          name: `${u.firstName} ${u.lastName}`,
          role: u.role,
          email: u.email,
          phoneNumber: u.phoneNumber,
        })),
      },
    }
  }),
  on(ProjectActions.getProjectTeamFailure, (state, action) => {
    return {
      ...state,
      currentProject: {
        ...state.currentProject!,
        team: null,
      },
    }
  }),
  on(ProjectActions.loadBuildingWithBuildingBlocksSuccess, (state, action) =>{
    return {
      ...state,
      buildings: action.result
    }
  }),
  on(ProjectActions.loadBuildingWithBuildingBlocksFailure, (state, action) => {
    return {
      ...state,
      error: action.error
    }
  }),
  on(ProjectActions.revealBuildingCard, (state, action) => {
    return {
      ...state,
      currentlyRevealedBuilding: state.currentlyRevealedBuilding == action.id ? null : action.id
    }
  })

);
