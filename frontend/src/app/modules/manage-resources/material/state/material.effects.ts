import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import * as MaterialAction from "./material.actions"
import {catchError, map, withLatestFrom} from "rxjs/operators";
import {mergeMap, of} from "rxjs";
import {MaterialApiService} from "../resources/services/material-api.service";
import {AppState} from "../../../../store";
import {select, Store} from "@ngrx/store";
import * as MaterialSelector from "./material.selectors"
import {serializeError} from "serialize-error";

@Injectable()
export class MaterialEffects {
  getMaterials$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MaterialAction.getMaterialWithParams),
      withLatestFrom(this.store.pipe(select(MaterialSelector.selectMaterialParams))),
      mergeMap(([props, params]) =>
        this.services.getMaterialWithParams(params).pipe(
          map((data) =>
            MaterialAction.getMaterialsWithParamsSuccess({
              materials: data.list,
              total: data.total
            })
          ),
          catchError((error) =>
            of(
              MaterialAction.getMaterialWithParamsFailure({
                error: serializeError(error),
              })
            )
          )
        )
      )
    );
  });
  loadMaterialTypes$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MaterialAction.loadMaterialTypes),
      mergeMap(() =>
        this.services.getMaterialType().pipe(
          map((types) =>
            MaterialAction.loadMaterialTypesSuccessfully({materialTypes: types})
          ),
          catchError((error) =>
            of(MaterialAction.loadMaterialTypesFailure(error)))
        )
      )
    )
  });

  loadMeasurement$ = createEffect(()=>{
    return this.actions$.pipe(
      ofType(MaterialAction.loadMeasurement),
      mergeMap((action)=>
        this.services.getMeasurement().pipe(
          map((data)=>
            MaterialAction.loadMeasurementSuccessfully({measurement:data})
          ),
          catchError((error)=>
            of(MaterialAction.loadMeasurementFailure({error: serializeError(error)})))
        ))
    )
  });
  constructor(private actions$: Actions,
              private store: Store<AppState>,
              private services: MaterialApiService) {
  }
}

