import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as fromAuthActions from '../actions/auth.actions';
import { tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AlertService } from 'src/app/modules/alert/resources/services/alert.service';

@Injectable()
export class AlertEffects {
  login$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromAuthActions.loginPage),
        tap(() => {
            this._alertService.showAlert("login success", "OK", "success")
          }
        )
      ),
    { dispatch: false }
  );
  constructor(private actions$: Actions, private _alertService: AlertService) {}
}
