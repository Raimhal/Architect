import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {catchError, concatMap, map, mergeMap, switchMap, withLatestFrom} from 'rxjs/operators';
import {Observable, EMPTY, of} from 'rxjs';
import {select, Store} from "@ngrx/store";
import {AppState} from "../../../store";
import {ManageResourcesApiService} from "../resources/services/manage-resources-api.service";
import {serializeError} from "serialize-error";
import {selectUserId} from "../../../store/selectors/auth.selectors";
import * as AdministrationActions from "../../administration/state/administration.actions";
import * as AdministrationSelectors from "../../administration/state/administration.selectors";
import {selectServicesParams} from "./manage-resources.selectors";
import * as ManageResourceActions from "./manage-resources.actions";

@Injectable()
export class ManageResourcesEffects {


  getAllServicesWithParams$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ManageResourceActions.getAllServicesWithParams),
      withLatestFrom(this.store.pipe(select(selectServicesParams))),
      switchMap(([_, params]) =>
        this.service
          .getAllServicesWithParameters(params.filter, params.sort)
          .pipe(
            map((services) =>
              ManageResourceActions.getAllServicesWithParamsSuccess({
                services: services,
              })
            ),
            catchError((error) =>
              of(
                ManageResourceActions.getAllServicesWithParamsFailure({
                  error: serializeError(error),
                })
              )
            )
          )
      )
    );
  });
  loadServices$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ManageResourceActions.loadServices),
      withLatestFrom(this.store.pipe(select(selectUserId))),
      mergeMap(([_,userId]) =>
        this.service.loadServices(userId!).pipe(
          map((data) => {
              return ManageResourceActions.loadServicesSuccess({services: data});
            }
          ),
          catchError((error) =>
            of(ManageResourceActions.loadServicesFailure({error: serializeError(error)}))
          )
        )
      )
    );
  });

  addService$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ManageResourceActions.addSubmitted),
      mergeMap((action) =>
        this.service.addService(action.service).pipe(
          map((service) =>
            ManageResourceActions.addSubmittedSuccessfully({service: service})
          ),
          catchError(
            (error) =>
              of(
                ManageResourceActions.addSubmittedFailure({
                  error: serializeError(error),
                })
              )
          )
        )
      )
    )
  });

  editService$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ManageResourceActions.editSubmitted),
      mergeMap((action) =>
        this.service.editService(action.service).pipe(
          map((service) =>
            ManageResourceActions.editSubmittedSuccessfully({service: service})
          ),
          catchError(
            (error) =>
              of(
                ManageResourceActions.editSubmittedFailure({
                  error: serializeError(error),
                })
              )
          )
        )
      )
    )
  });

  deleteService$ = createEffect(()=>{
    return this.actions$.pipe(
      ofType(ManageResourceActions.deleteServiceSubmitted),
      mergeMap((action)=>
        this.service.deleteService(action.id).pipe(
          map((id)=>
            ManageResourceActions.deleteServiceSubmittedSuccess({service:id})
          ),
          catchError((error) =>
            of(
              ManageResourceActions.editSubmittedFailure({
                error: serializeError(error),
              })
            )
          )
        )
      )
    )
  });

  loadTypes$ = createEffect(()=>{
    return this.actions$.pipe(
      ofType(ManageResourceActions.loadTypes),
      mergeMap((action)=>
        this.service.loadTypes().pipe(
          map((types)=>
            ManageResourceActions.loadTypesSuccessfully({types:types})
          ),
          catchError((error)=>
            of(
              ManageResourceActions.editSubmittedFailure({
                error: serializeError(error),
              })
            )
          )
        )
      )
    )
  });


  constructor(private actions$: Actions,
              private store: Store<AppState>,
              private service: ManageResourcesApiService) {
  }
}
