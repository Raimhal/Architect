import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAdministration from './administration.reducer';

export const selectAdministrationState =
  createFeatureSelector<fromAdministration.State>(
    fromAdministration.administrationFeatureKey
  );

export const selectOpenCompany = createSelector(
  selectAdministrationState,
  (state) => state.currentlyOpenCompany
);

export const selectCompanies = createSelector(
  selectAdministrationState,
  (state) => state.companies
);

export const selectRoles = createSelector(
  selectAdministrationState,
  (state) => state.roles
);
