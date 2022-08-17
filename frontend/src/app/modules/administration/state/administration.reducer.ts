import { Action, createReducer, on } from '@ngrx/store';
import * as AdministrationActions from './administration.actions';

export const administrationFeatureKey = 'administration';

export interface State {

}

export const initialState: State = {

};

export const reducer = createReducer(
  initialState,

  on(AdministrationActions.loadAdministrations, state => state),
  on(AdministrationActions.loadAdministrationsSuccess, (state, action) => state),
  on(AdministrationActions.loadAdministrationsFailure, (state, action) => state),

);
