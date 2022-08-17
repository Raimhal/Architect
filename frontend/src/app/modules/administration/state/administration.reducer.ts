import { Action, createReducer, on } from '@ngrx/store';
import * as AdministrationActions from './administration.actions';
import {IMember} from "../resources/models/member.model";
import {state} from "@angular/animations";
import {ICompanyOverview} from "../resources/models/company-overview.model";
import {ICompanyDetailed} from "../resources/models/company-detailed.model";


export const administrationFeatureKey = 'administration';

export interface State {
  companies: ICompanyOverview[]|null,
  currentlyOpenCompany: ICompanyDetailed
  error: any
}

export const initialState: State = {
  companies:null,
  currentlyOpenCompany: {
    members:[] as IMember[]
  } as ICompanyDetailed,
  error:null,
}


export const reducer = createReducer(
  initialState,

  on(AdministrationActions.loadAdministrations, state => state),
  on(AdministrationActions.loadAdministrationsSuccess, (state, action) => state),
  on(AdministrationActions.loadAdministrationsFailure, (state, action) => state),
  on(AdministrationActions.addNewMemberSuccess, (state, action)=>{
    return{
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
  on(AdministrationActions.addNewMemberFailure, (state) => state)
);
