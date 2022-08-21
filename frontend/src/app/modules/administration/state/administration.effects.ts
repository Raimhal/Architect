import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, EMPTY, of } from 'rxjs';
import * as AdministrationActions from './administration.actions';
import {catchError, map, concatMap, mergeMap, withLatestFrom, switchMap} from 'rxjs/operators';
import {serializeError} from "serialize-error";


import { AdministrationApiService } from '../resources/services/administration-api.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import * as AdministrationSelectors from './administration.selectors';
import { ICompanyUpdate } from '../resources/models/company-update.model';
@Injectable()
export class AdministrationEffects {

  getAllCompaniesWithParams$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AdministrationActions.getAllCompaniesWithParams),
      concatMap((action) =>
        this.service.getAllCompaniesWithParameters(action.filter, action.sort).pipe(
          map(companies => AdministrationActions.getAllCompaniesWithParamsSuccess({data: companies})),
          catchError(error => of(AdministrationActions.getAllCompaniesWithParamsFailure({
            error: serializeError(error)
          })))
        )
      )
    );
  });

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

  $addNewMember = createEffect(()=>{
      return this.actions$.pipe(
        ofType(AdministrationActions.addNewMember),
        mergeMap((action)=>
          this.service.postMember(action.data)
            .pipe(
              map((result)=>
                AdministrationActions.addNewMemberSuccess({data: {
                  ...action.data
                  }})),
              catchError(error=>of(AdministrationActions.addNewMemberFailure({
                error: serializeError(error)
              })))
            )
        )
      )
    }
  );


  createCompany$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AdministrationActions.CreateCompany),
      mergeMap((action) =>
        this.service.createCompany(action.date).pipe(
          map((response) => AdministrationActions.CreateCompanySuccess()
          ),
          catchError(error => of(AdministrationActions.CreateCompanyFailure({
            error: serializeError(error)
          })))
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
            of(AdministrationActions.UploadCompanyImageFailure(error))
          )
        )
      )
    );
  });
  updateCompanyInformationFormState = createEffect(() => {
    return this.actions$.pipe(
      ofType(AdministrationActions.loadDetailedCompanySuccess),
      map(() => AdministrationActions.loadDisabledCompanyInformationForm())
    );
  });
  cancelCompanyInformationFormState = createEffect(() => {
    return this.actions$.pipe(
      ofType(AdministrationActions.cancelEditCompanyInformationForm),
      map(() => AdministrationActions.loadDisabledCompanyInformationForm())
    );
  });
  submitCompanyInformationFormState = createEffect(() => {
    return this.actions$.pipe(
      ofType(AdministrationActions.submitCompanyInformationForm),
      withLatestFrom(
        this.store.select(AdministrationSelectors.selectCurrentlyOpenCompany)
      ),
      switchMap(([action, company]) => {
        return this.service
          .putDetailedCompany({
            id: company.id,
            country: company.country,
            city: company.city,
            companyName: company.companyName,
            email: action.email,
            address: action.address,
          } as ICompanyUpdate)
          .pipe(
            map((resultId) =>
              AdministrationActions.loadDetailedCompany({ id: resultId })
            ),
            catchError((error) =>
              of(
                AdministrationActions.submitCompanyInformationFormFailure(serializeError(error))
              )
            )
          );
      })
    );
  })
  submitCompanyInformationFormFailureEffects = createEffect(() => {
    return this.actions$.pipe(
      ofType(AdministrationActions.submitCompanyInformationFormFailure),
      map(() => AdministrationActions.loadDisabledCompanyInformationForm())
    );
  });
  constructor(private actions$: Actions, private service: AdministrationApiService,  private store: Store<AppState>) {}
}
