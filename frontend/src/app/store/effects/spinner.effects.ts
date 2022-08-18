import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as fromAuthActions from '../actions/auth.actions';
import * as fromAdministrationActions from '../../modules/administration/state/administration.actions';
import { tap } from 'rxjs/operators';
import {NgxSpinnerService} from "ngx-spinner";

@Injectable()
export class SpinnerEffects {
  spinneron$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          fromAuthActions.login,
          fromAdministrationActions.getAllCompaniesWithParams
        ),
        tap(() =>  {
          this.spinner.show();
        })
      ),
    { dispatch: false }
  );

  spinneroff$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          fromAuthActions.loginSuccess,
          fromAuthActions.loginFailure,
          fromAdministrationActions.getAllCompaniesWithParamsSuccess,
          fromAdministrationActions.getAllCompaniesWithParamsFailure
        ),
        tap(() => {
          setTimeout(() => {
            this.spinner.hide();
          }, 1000);
        })
      ),
    { dispatch: false }
  );

  constructor(private actions$: Actions, private spinner : NgxSpinnerService) {}

}
