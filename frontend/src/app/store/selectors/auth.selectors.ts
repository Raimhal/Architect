import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAuth from '../reducers/auth.reducer';

export const selectAuthState = createFeatureSelector<fromAuth.State>(
  fromAuth.authFeatureKey
);

export interface AuthViewModal {
  isLoggedin: boolean;
}

export const selectIsLoggedIn = createSelector(
  selectAuthState,
  (state: fromAuth.State): boolean => state.user != null
);

export const selectAuthViewModel = createSelector(
  selectIsLoggedIn,
  (isLoggedIn: boolean): AuthViewModal => {
    return {
      isLoggedin: isLoggedIn,
    };
  }
);
