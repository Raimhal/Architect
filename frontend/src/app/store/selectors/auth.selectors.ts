import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserRole } from 'src/app/modules/auth/resources/models/userRole';
import * as fromAuth from '../reducers/auth.reducer';

export const selectAuthState = createFeatureSelector<fromAuth.State>(
  fromAuth.authFeatureKey
);

export const selectUser = createSelector(
  selectAuthState,
  (state: fromAuth.State): fromAuth.User | null => state.user
);
export const selectUserId = createSelector(
  selectAuthState,
  (state: fromAuth.State): number|undefined => state.user?.id
);

export const selectIsLoggedIn = createSelector(
  selectUser,
  (user: fromAuth.User | null): boolean => user != null
);

export const selectAskToChangeDefaultPassword = createSelector(
  selectAuthState,
  (state: fromAuth.State): boolean => state.askToChangeDefaultPassword
);

export const selectUserRole = createSelector(
  selectAuthState,
  selectUser,
  (state: fromAuth.State) => {
    return state.user?.role ?? null;
  }
)

export const selectUserIsAdmin = createSelector(
  selectUserRole,
  (role: UserRole | null) => role == UserRole.Admin
)
