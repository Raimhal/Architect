import { createAction, props } from '@ngrx/store';
import {IService} from "../resources/models/service";
import {IType} from "../resources/models/type";
import {number} from "ngrx-forms/validation";

export const loadServices = createAction(
  '[Service Component] Load Services'
);

export const loadServicesSuccess = createAction(
  '[Service Component] Services loaded successfully',
  props<{services: IService[]}>()
);

export const loadServicesFailure = createAction(
  '[Service Component] Failed to load services',
  props<{error:any}>()
);

export const loadTypes = createAction(
  '[Service Component] Load types'
);

export const loadTypesSuccessfully = createAction(
  '[Service Component] Types loaded successfully',
  props<{types:string[]}>()
);

export const loadTypesFailure = createAction(
  '[Service Component] Failed to load files',
  props<{error:any}>()
);

export const plusClicked = createAction(
  "[Service Component] Plus was clicked"
);
export const cancelAddClicked = createAction(
  "[Service Component] Cancel of adding was clicked"
);
export const addSubmitted = createAction(
  "[Service Component] Trying to add service",
  props<{service: IService}>()
)
export const addSubmittedSuccessfully = createAction(
  "[Service Component] Add service success",
  props<{service: IService}>()
);
export const addSubmittedFailure = createAction(
  "[Service Component] Add service failure",
  props<{error: any}>()
);
export const editSubmitted = createAction(
  "[Service Component] Trying to edit service",
  props<{service: IService}>()
);
export const editSubmittedSuccessfully = createAction(
  "[Service Component] Edit service success",
  props<{service: IService}>()
);
export const editSubmittedFailure = createAction(
  "[Service Component] Edit service failure",
  props<{error: any}>()
);
export const deleteServiceSubmitted = createAction(
  '[Service Component] Trying to delete service',
  props<{id: number}>()
);
export const deleteServiceSubmittedSuccess = createAction(
  '[Service Component] Delete service success',
  props<{service:number}>()
);
export const deleteServiceSubmittedFailure = createAction(
  '[Service Component] Delete service failure',
  props<{error: any}>()
);
export const serviceInvalid = createAction(
  '[Service Component] Cannot add invalid service'
);
export const getAllServicesWithParams = createAction(
  '[Service Component] Get All Services With Parameters',
  props<Partial<{ filter: string; sort: string }>>()
);
export const getAllServicesWithParamsSuccess = createAction(
  '[Service Component] Services With Parameters got successfully',
  props<{services: IService[]}>()
);
export const getAllServicesWithParamsFailure = createAction(
  '[Service Component] Services With Parameters was not got',
  props<{error: any}>()
);
export const addClickFailure = createAction(
  '[Service Component] Plus click failed',
  props<{message: string}>()
);
