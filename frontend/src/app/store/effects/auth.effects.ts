import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as AuthActions from '../actions/auth.actions';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.loginPage),
      concatMap((action) =>
        // do login
        of(AuthActions.loginSuccess({ user: action.username }))
      )
    );
  });

  constructor(private actions$: Actions) {}
}
