import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, mergeMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import * as AdministrationActions from './administration.actions';
import { AdministrationApiService } from '../resources/services/administration-api.service';


@Injectable()
export class AdministrationEffects {

  loadAdministrations$ = createEffect(() => {
    return this.actions$.pipe( 

      ofType(AdministrationActions.loadAdministrations),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        EMPTY.pipe(
          map(data => AdministrationActions.loadAdministrationsSuccess({ data })),
          catchError(error => of(AdministrationActions.loadAdministrationsFailure({ error }))))
      )
    );
  });

  createCompany$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AdministrationActions.CreateCompany),
      mergeMap((action) =>
        this.api.createCompany(action.date).pipe(
          map((response) => {
            if (response.status == 201) return AdministrationActions.CreateCompanySuccess();
            return AdministrationActions.CreateCompanyFailure();
          }
          )
        )
      )
    )

  })

  constructor(private actions$: Actions, private api: AdministrationApiService) {}
}
