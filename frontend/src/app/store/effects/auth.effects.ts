import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as AuthActions from '../actions/auth.actions';
import { login } from "../actions/auth.actions";

@Injectable()
export class AuthEffects {
  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.login),
      concatMap((action) =>
        // do login
        of(AuthActions.loginSuccess({ user: {id: 1, email: action.email }, askToChangePassword: true }))
      )
    );
  });

  constructor(private actions$: Actions) {}
}
