import { Action, createReducer, on } from '@ngrx/store';
import * as AdministrationActions from './administration.actions';
import {ICompanyOverview} from "../resources/models/company-overview.model";
import {IMember} from "../resources/models/member.model";
import {state} from "@angular/animations";
import {ICompanyDetailed} from "../resources/models/company-detailed.model";
import {IRole} from "../resources/models/role.model";

export const administrationFeatureKey = 'administration';

export interface State {
  companies: ICompanyOverview[] | null;
  currentlyOpenCompany: ICompanyDetailed;
  error: any;
  roles: IRole[]|null;
}

export const initialState: State = {
  companies: null,
  currentlyOpenCompany: {
    members: [] as IMember[],
  } as ICompanyDetailed,
  error: null,
  roles: null
};

export const reducer = createReducer(
  initialState,

  on(AdministrationActions.loadAdministrations, (state) => state),
  on(
    AdministrationActions.loadAdministrationsSuccess,
    (state, action) => state
  ),
  on(
    AdministrationActions.loadAdministrationsFailure,
    (state, action) => state
  ),
  on(AdministrationActions.addNewMemberSuccess, (state, action) => {
    return {
      ...state,
      currentlyOpenCompany: {
        ...state.currentlyOpenCompany,
        members: [
          ...state.currentlyOpenCompany.members,
          action.data
        ]
      }
    }
  }),
  on(AdministrationActions.addNewMemberFailure, (state,action)=>({
    ...state,
    error: action.error
  })),
  on(AdministrationActions.getAllCompaniesWithParamsSuccess, (state, action) => {
    return {
      ...state,
      companies: action.data,
      error: null
    }
  }),
  on(AdministrationActions.getAllCompaniesWithParamsFailure, (state, action) => {
    return {
      ...state,
      companies: null,
      error: action.error
    }
  }),
  on(AdministrationActions.loadDetailedCompanySuccess, (_state, action) => ({
    ..._state,
    currentlyOpenCompany: action.result,
    error: null,
  })),
  on(AdministrationActions.loadDetailedCompanyFailure, (state, action) => ({
    ...state,
    error: action.error,
  })),
  on(AdministrationActions.UploadCompanyImageSuccess, (state, action) => ({
    ...state,
    currentlyOpenCompany: {
      ...state.currentlyOpenCompany,
      image: action.path,
    },
  })),
  on(AdministrationActions.UploadCompanyImageFailur, (state, action) => ({
    ...state,
    error: action.error,
  })),
  on(AdministrationActions.loadRolesSuccess, (state, action)=>({
    ...state,
    roles: action.roles
  })),
  on(AdministrationActions.loadRolesFailure, (state,action)=>({
    ...state,
    error: action.error
  }))
);
