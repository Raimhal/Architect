import { createReducer, on } from '@ngrx/store';
import * as fromAuthActions from '../actions/auth.actions';

export const authFeatureKey = 'auth';

export interface User {
  id: number,
  email: string,
  role : string
  //isAdmin: boolean,
}

export interface State {
  user: User | null;
  askToChangePassword: boolean;
  error: any;
}

export const initialState: State = {
  user: null,
  askToChangePassword: false,
  error: null,
};

export const reducer = createReducer(
  initialState,

  on(fromAuthActions.loginSuccess, (state, action) => {
    return {
      ...state,
      user: action.user,
      askToChangePassword: action.askToChangePassword,
      error: null,
    };
  }),
  on(fromAuthActions.loginFailure, (state, action) => {
    return {
      ...state,
      user: null,
      error: action.error,
    };
  }),
  on(fromAuthActions.logout, (state) => {
    return {
      ...state,
      user: null,
      error: null,
    };
  })
);
