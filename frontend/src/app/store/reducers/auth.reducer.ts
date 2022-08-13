import { createReducer, on } from '@ngrx/store';
import * as fromAuthActions from '../actions/auth.actions';

export const authFeatureKey = 'auth';

export interface State {
  user: any;
  error: any;
}

export const initialState: State = {
  user: {
    id: null,
    username: null,
    email: null,
    isadmin: null,
  },
  error: null,
};

export const reducer = createReducer(
  initialState,

  on(fromAuthActions.loginSuccess, (state, action) => {
    return {
      ...state,
      user: action.user,
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
