import {Params} from "../resources/models/params";
import {IMaterial} from "../resources/models/material-dto";
import {createReducer, on} from "@ngrx/store";
import {onNgrxForms} from "ngrx-forms";
import * as MaterialAction from "./material.actions"
import {ICompanyDetailed} from "../../../administration/resources/models/company-detailed.model";
import {IMaterialType} from "../resources/models/material-type-dto";
import {IMeasurement} from "../resources/models/measurement-dto";

export const manageResourceFeatureKey = "manageResource"

export interface State {
  resourceParams: {
    filter: string,
    sort: string,
  }
  materialParams: Partial<Params>,
  materials: IMaterial[] | null,
  materialsTypes: IMaterialType[],
  measurement: IMeasurement[],
  currentlyOpenCompany: ICompanyDetailed
}

export const initialState: State = {
  materials:null,
  resourceParams: {
    filter: '',
    sort: '',
  },
  materialParams:{
    sort:"companyname"
  },
  materialsTypes: [] as IMaterialType[],
  measurement: [] as IMeasurement[],
  currentlyOpenCompany: {
    materials: [] as IMaterial[],
    materialTotalCount: 0
  } as ICompanyDetailed,
}
export const reducer = createReducer(
  initialState,
  onNgrxForms(),

  on(MaterialAction.getMaterialsWithParamsSuccess, (state, action)=>({
    ...state,
    currentlyOpenCompany: {...state.currentlyOpenCompany, materials: action.materials, materialTotalCount: action.total }
  })),

  on(MaterialAction.getMaterialWithParamsFailure, (state,action)=>({
    ...state,
    error: action.error
  })),
  on(
    MaterialAction.loadMaterialTypesSuccessfully,
    (state, action) => {
      return {
        ...state,
        materialsTypes: action.materialTypes
      }
    }
  ),
  on(
    MaterialAction.loadMeasurementSuccessfully,
    (state, action) => {
      return {
        ...state,
        measurement: action.measurement
      }
    }
  ),

)
