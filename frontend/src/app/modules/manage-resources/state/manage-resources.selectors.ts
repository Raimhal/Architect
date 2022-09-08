import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromService from './manage-resources.reducer';
import {selectCompaniesParams} from "../../administration/state/administration.selectors";

export const selectServiceState = createFeatureSelector<fromService.State>(
  fromService.manageResourcesFeatureKey
);

export const selectService=createSelector(
  selectServiceState,
  (state)=>state.selectedService
);

export const selectServices = createSelector(
  selectServiceState,
  (state)=>state.services
);

export const selectTypes = createSelector(
  selectServiceState,
  (state)=>state.types
);
export const selectServicesParams = createSelector(
  selectServiceState,
  (state)=>state.serviceParams
)
