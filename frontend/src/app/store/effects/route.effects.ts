import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import * as fromAuthActions from '../actions/auth.actions';
import * as RoutActions from '../actions/route.actions';
import { tap } from 'rxjs/operators';
import { Location } from '@angular/common';

@Injectable()
export class RouteEffects {
  gohome$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromAuthActions.logout),
        tap(() => this.route.navigate(['/home']))
      ),
    { dispatch: false }
  );

  askToChangePassword$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromAuthActions.loginSuccess),
        tap((state) => {
          if (state.askToChangePassword) {
            return this.route.navigate(['/login/change-default-password'])
          }
          if (state.user.role == "Admin"){
            return this.route.navigate(['/administration'])
          }
          return this.route.navigate(['/projects'])
        })
      ),
    { dispatch: false }
  );

  goBack$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(RoutActions.goBack),
        tap(() => this.location.back())
      ),
    { dispatch: false }
  );
  constructor(private actions$: Actions, private route: Router, private location: Location) { }
}
