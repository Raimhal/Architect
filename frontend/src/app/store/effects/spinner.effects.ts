import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as fromAuthActions from '../actions/auth.actions';
import { tap } from 'rxjs/operators';

@Injectable()
export class SpinnerEffects {
  spinneron$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          fromAuthActions.loginPage,
        ),
        tap(() =>  {
          // show spinner
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
        ),
        tap(() => {
          setTimeout(() => {
            // hide spinner
          }, 1000);
        })
      ),
    { dispatch: false }
  );

  constructor(private actions$: Actions) {}
}
