import {createAction, props} from "@ngrx/store";
import {IMaterial} from "../resources/models/material-dto";
import {IMaterialType} from "../resources/models/material-type-dto";
import {IMeasurement} from "../resources/models/measurement-dto";

export const getMaterialWithParams = createAction(
  '[Material Component] Load Material',
);
export const getMaterialsWithParamsSuccess = createAction(
  '[Material Component] Material loaded successfully',
  props<{ materials: IMaterial[], total: number }>()
);

export const getMaterialWithParamsFailure = createAction(
  '[Material Component] Failed to load materials',
  props<{ error: any }>()
);
export const loadMaterialTypes = createAction(
  '[Material types Component] Load types'
);

export const loadMaterialTypesSuccessfully = createAction(
  '[Material Component] Material Types loaded successfully',
  props<{ materialTypes: IMaterialType[] }>()
);

export const loadMaterialTypesFailure = createAction(
  '[Material Component] Failed to load files',
  props<{ error: any }>()
);
export const loadMeasurement = createAction(
  '[Material Component] Load measurement '
);
export const loadMeasurementSuccessfully = createAction(
  '[Material Component] Load measurement successfully',
  props<{ measurement: IMeasurement[] }>()
);
export const loadMeasurementFailure = createAction(
  '[Material Component] Failed to load measurement',
  props<{ error: any }>()
);
