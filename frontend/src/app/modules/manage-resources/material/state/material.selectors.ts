import {createFeatureSelector, createSelector} from "@ngrx/store";
import * as fromMaterials from './material.reducer'

export const selectMaterialState =
  createFeatureSelector<fromMaterials.State>(
    fromMaterials.manageResourceFeatureKey
  );
export const selectMaterialParams = createSelector(
  selectMaterialState,
  (state) => state.materialParams
)
export const selectMaterialTypes = createSelector(
  selectMaterialState,
  (state) => state.materialsTypes
)
export const selectMeasurement = createSelector(
  selectMaterialState,
  (state) => state.measurement
)


