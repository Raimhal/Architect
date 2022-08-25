import {Action, createReducer, on} from '@ngrx/store';
import * as CompanyActions from './company.actions';
import {ICompanyProfile} from "../recources/models/company-profile";
import {IProjectOverview} from "../recources/models/project-overview";

export const companyFeatureKey = 'company';

export interface State {
  company: ICompanyProfile,
  companyProjects : IProjectOverview[]
  error: any
}

export const initialState: State = {
  company: {} as ICompanyProfile,
  companyProjects : [] as IProjectOverview[],
  error: null
};

export const reducer = createReducer(
  initialState,
  on(CompanyActions.loadCompanySuccess, (state, action) => {
    return {
      ...state,
      company: action.company
    }
  }),
  on(CompanyActions.loadCompanyFailure, (state, action) => {
    return {
      ...state,
      error: action.error
    }
  }),
  on(CompanyActions.loadProjectsSuccess, (state, action) => {
    return {
      ...state,
      companyProjects: action.projects
    }
  }),
  on(CompanyActions.loadProjectsFailure, (state, action) => {
    return {
      ...state,
      error: action.error
    }
  })
);
