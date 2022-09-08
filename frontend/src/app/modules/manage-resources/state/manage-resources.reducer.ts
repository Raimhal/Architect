import { Action, createReducer, on } from '@ngrx/store';
import * as ManageResourceActions from './manage-resources.actions';
import {IService} from "../resources/models/service";


export const manageResourcesFeatureKey = 'manageResource';

export interface State {
  services: IService[],
  types: string[],
  error:any,
  selectedService: IService,
  serviceParams: {
    filter: string,
    sort: string,
  },

}

export const initialState: State = {
  services: [],
  types: [],
  error:null,
  selectedService: {} as IService,
  serviceParams: {
    filter: "",
    sort: "",
  },
};

export const reducer = createReducer(
  initialState,
  on(
    ManageResourceActions.loadServicesSuccess,
    (state, action) => {
      return {
        ...state,
        services: action.services,
      };
    }
  ),
  on(
    ManageResourceActions.plusClicked,
    (state)=>{
      return{
        ...state,
        services: [{} as IService,...state.services]
      }
    }
  ),
  on(
    ManageResourceActions.addSubmittedSuccessfully,
    (state, action)=>{
      let arr = [action.service,...state.services.slice(1)]
      return{
        ...state,
        services: arr
      }
    }
  ),
  on(
    ManageResourceActions.editSubmittedSuccessfully,
    (state,action)=>{
      let index = state.services.findIndex(s => s.id == action.service.id);
      let arr = [...state.services];
      arr[index]=action.service;
      return{
        ...state,
        services: arr
      }
    }
  ),
  on(
    ManageResourceActions.cancelAddClicked,
    (state)=>{
      return{
        ...state,
        services: state.services.slice(1)
      }
    }
  ),
  on(
    ManageResourceActions.deleteServiceSubmittedSuccess,
    (state, action)=>{
      let index = state.services.findIndex(s=>s.id==action.service);
      let arr = [...state.services];
      arr.splice(index,1);
      return{
        ...state,
        services:arr
      }
    }
  ),
  on(
    ManageResourceActions.loadTypesSuccessfully,
    (state, action)=>{
      return{
        ...state,
        types: action.types
      }
    }
  ),
  on(
    ManageResourceActions.getAllServicesWithParams,
    (state, action) => {
      return {
        ...state,
        serviceParams: {
          filter: action.filter ?? state.serviceParams.filter,
          sort: action.sort ?? state.serviceParams.sort,
        },
        error: null,
      };
    }
  ),
  on(
    ManageResourceActions.getAllServicesWithParamsSuccess,
    (state, action) => {
      return {
        ...state,
        services: action.services,
        error: null,
      };
    }
  ),
  on(
    ManageResourceActions.getAllServicesWithParamsFailure,
    (state, action) => {
      return{
        ...state,
        error: action.error
      }
    }
  )
);
