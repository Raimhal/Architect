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
