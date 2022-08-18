import { Injectable } from '@angular/core';
import { act, Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, mergeAll, mergeMap } from 'rxjs/operators';
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
          map((data) =>
            AdministrationActions.loadAdministrationsSuccess({ data })
          ),
          catchError((error) =>
            of(AdministrationActions.loadAdministrationsFailure({ error }))
          )
        )
      )
    );
  });

  $addNewMember = createEffect(() => {
    return this.actions$.pipe(
      ofType(AdministrationActions.addNewMember),
      mergeMap((action) =>
        this.service.postMember(action.data).pipe(
          map((result) =>
            AdministrationActions.addNewMemberSuccess({
              data: {
                ...action.data,
                id: result,
              },
            })
          ),
          catchError((error) =>
            of(AdministrationActions.addNewMemberFailure({ error: error }))
          )
        )
      )
    );
  });

  createCompany$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AdministrationActions.CreateCompany),
      mergeMap((action) =>
        this.service.createCompany(action.date).pipe(
          map((response) => {
            if (response.status == 201)
              return AdministrationActions.CreateCompanySuccess();
            return AdministrationActions.CreateCompanyFailure();
          })
        )
      )
    );
  });
  loadOpenCompany = createEffect(() => {
    return this.actions$.pipe(
      ofType(AdministrationActions.loadDetailedCompany),
      mergeMap((action) =>
        this.service.getDetailedCompany(action.id).pipe(
          map((data) =>
            AdministrationActions.loadDetailedCompanySuccess({ result: data })
          ),
          catchError((error) =>
            of(AdministrationActions.loadDetailedCompanyFailure({ error }))
          )
        )
      )
    );
  });
  uploadImage = createEffect(() => {
    return this.actions$.pipe(
      ofType(AdministrationActions.UploadCompanyImage),
      mergeMap((action) =>
        this.service.postCompanyImage(action.id, action.image).pipe(
          map((path) =>
            AdministrationActions.UploadCompanyImageSuccess({ path: path })
          ),
          catchError((error) =>
            of(AdministrationActions.UploadCompanyImageFailur(error))
          )
        )
      )
    );
  });
  constructor(
    private actions$: Actions,
    private service: AdministrationApiService
  ) {}
}
