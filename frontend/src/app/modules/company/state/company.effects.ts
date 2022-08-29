import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {catchError, concatMap, map, switchMap, withLatestFrom} from 'rxjs/operators';
import {Observable, EMPTY, of} from 'rxjs';
import * as CompanyActions from './company.actions';
import {CompanyApiService} from "../recources/services/company-api.service";
import {serializeError} from "serialize-error";
import {select, Store} from "@ngrx/store";
import {AppState} from "../../../store";
import {selectUser} from "../../../store/selectors/auth.selectors";
import {selectCompany} from "./company.selectors";

@Injectable()
export class CompanyEffects {


  loadCompany$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CompanyActions.loadCompany),
      withLatestFrom(this.store.pipe(select(selectUser))),
      concatMap(([_, user]) =>
        this.service.getCompanyProfile(user!.id).pipe(
          map(result => CompanyActions.loadCompanySuccess({company: result})),
          catchError(error => of(CompanyActions.loadCompanyFailure({error: serializeError(error)})))
        )
      )
    )
  });


  loadProjects$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CompanyActions.loadProjects),
      concatMap(() =>
        this.store.pipe(select(selectCompany)).pipe(concatMap((company) =>
            this.service.getProjectsByCompanyId(company.id).pipe(
              map((result) => CompanyActions.loadProjectsSuccess({projects: result})),
              catchError(error => of(CompanyActions.loadProjectsFailure({error: serializeError(error)})))
            )
          )
        )
      )
    )
  });

  updateFormState = createEffect(() =>
    this.actions$.pipe(
      ofType(CompanyActions.loadCompanySuccess),
      map(() => CompanyActions.loadDisabledCompanyProfileForm())
    ));

  submitCompanyProfileForm$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CompanyActions.submitEditingCompanyProfileForm),
      withLatestFrom(
        this.store.select(selectCompany)
      ),
      switchMap(([action, company]) =>
        this.service.putCompanyProfile({
          id: company.id,
          website: action.website,
          email: action.email,
          address: action.address
        }).pipe(
          map((result) =>
            CompanyActions.submitEditingCompanyProfileFormSuccess({result: result})
          ),
          catchError(error =>
            of(CompanyActions.submitEditingCompanyProfileFormFailure({error: serializeError(error)}))
          )
        )
      )
    )
  );

  updateEditedFormToInitialState$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CompanyActions.cancelEditingCompanyProfileForm),
      map(CompanyActions.loadDisabledCompanyProfileForm)
    ))

  constructor(private actions$: Actions,
              private service: CompanyApiService,
              private store: Store<AppState>) {
  }
}
