import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as fromAuthActions from '../actions/auth.actions';
import * as fromAdministrationActions from '../../modules/administration/state/administration.actions'
import { tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AlertService } from 'src/app/modules/alert/resources/services/alert.service';
import { ErrorService } from 'src/app/modules/error/resources/services/error.services';


@Injectable()
export class AlertEffects {
  login$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromAuthActions.login),
        tap(() => {
          this._alertService.showAlert("login success", "OK", "success")
        }
        )
      ),
    { dispatch: false }
  );
  addMemberSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromAdministrationActions.addNewMemberSuccess),
        tap(() => {
          this._alertService.showAlert("Member was added successfully", "OK", "success")
        }
        )
      ),
    { dispatch: false }
  );
  addMemberFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromAdministrationActions.addNewMemberFailure),
        tap((action) => {
          this._alertService.showAlert(`Failed to add member. ${action.error.error.detail}`, "OK", "error")
        }
        )
      ),
    { dispatch: false }
  );

  resetPasswordError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromAuthActions.forgotPasswordFailure),
        tap((action) => {
          this._alertService.showAlert(this.errorService.getErrorMessage(action.error,"Forgot Password") , "OK", "error")
        }
        )
      ),
    { dispatch: false }
  );
  resetPasswordSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromAuthActions.forgotPasswordSuccess),
        tap(() => {
          this._alertService.showAlert("Reset password success", "OK", "success")
        }
        )
      ),
    { dispatch: false }
  );


  companiesListLoadingFailed = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromAdministrationActions.getAllCompaniesWithParamsFailure),
      tap(() => {
        this._alertService.showAlert("Failed load companies from server", "OK", "error")
      })
    )
  },
    { dispatch: false });

  constructor(private actions$: Actions, private _alertService: AlertService,private errorService:ErrorService) { }
}
