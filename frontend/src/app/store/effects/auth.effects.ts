import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as AuthActions from '../actions/auth.actions';
import { login } from "../actions/auth.actions";
import { AuthService } from 'src/app/modules/auth/resources/services/auth.service';
import { AppState } from '..';
import { select, Store } from '@ngrx/store';
import { selectUserId } from '../selectors/auth.selectors';
import ForgotPasswordDTO from 'src/app/modules/auth/resources/models/resetPasswordDTO';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from 'src/app/modules/error/resources/services/error.services';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.login),
      concatMap((action) =>
        // do login
        of(AuthActions.loginSuccess({ user: {id: 1, email: action.email, role: "Admin" }, askToChangePassword: false }))
      )
    );
  });
  resetPassword$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.forgotPassword),
      map((action): ForgotPasswordDTO => ({
        email: action.email
      })),
      mergeMap((resetPasswordDTO) =>
        this.authService.resetPassword(resetPasswordDTO).pipe(
          map(() => AuthActions.forgotPasswordSuccess()),
          catchError((error: HttpErrorResponse) => of(AuthActions.forgotPasswordFailure({ error:  error.error})))
        )
      )
    )
  });

  constructor(private actions$: Actions,
    private store$: Store<AppState>,
    private authService: AuthService
    ) { }
}
