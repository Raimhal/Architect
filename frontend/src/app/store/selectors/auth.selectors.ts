import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAuth from '../reducers/auth.reducer';

export const selectAuthState = createFeatureSelector<fromAuth.State>(
  fromAuth.authFeatureKey
);

export interface AuthViewModal {
  isLoggedIn: boolean;
}

export const selectUser = createSelector(
  selectAuthState,
  (state: fromAuth.State): fromAuth.User | null => state.user
);

export const selectIsLoggedIn = createSelector(
  selectUser,
  (user: fromAuth.User | null): boolean => user != null
);

export const selectAuthViewModel = createSelector(
  selectIsLoggedIn,
  (isLoggedIn: boolean): AuthViewModal => {
    return {
      isLoggedIn: isLoggedIn,
    };
  }
);

export const selectUserRole = createSelector(
  selectAuthState,
  selectUser,
  (state : fromAuth.State) => {
    if (state.user != null){
      return state.user.role;
    }
    return "";
  }
)
