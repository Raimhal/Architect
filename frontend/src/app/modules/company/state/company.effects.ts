import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {catchError, concatMap, map} from 'rxjs/operators';
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
      concatMap(() =>
        this.store.pipe(select(selectUser)).pipe(
          concatMap((user) => this.service.getCompanyProfile(user!.id).pipe(
              map(result => CompanyActions.loadCompanySuccess({company: result})),
              catchError(error => of(CompanyActions.loadCompanyFailure({error: serializeError(error)})))
            )
          )
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

  constructor(private actions$: Actions,
              private service: CompanyApiService,
              private store: Store<AppState>) {
  }
}
