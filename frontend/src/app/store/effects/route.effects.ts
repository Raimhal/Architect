import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import * as fromAuthSelectors from '../selectors/auth.selectors';
import * as fromAuthActions from '../actions/auth.actions';
import * as RoutActions from '../actions/route.actions';
import { switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { Store } from "@ngrx/store";
import { AppState } from "../index";
import { of } from "rxjs";
import { Location } from "@angular/common";

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

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromAuthActions.loginSuccess),
        tap((state) => {
          if (state.askToChangeDefaultPassword) {
            return this.route.navigate(['/change-default-password'])
          }

          if (state.user.role == "Admin") {
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

  changeDefaultPasswordSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromAuthActions.changeDefaultPasswordSuccess),
        withLatestFrom(this.store.select(fromAuthSelectors.selectUserRole)),
        switchMap(([_, role]) => of(role)),
        tap((role) => this.postLoginNavigate(role))
      ), { dispatch: false }
  );

  keepDefaultPassword$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromAuthActions.keepDefaultPassword),
        withLatestFrom(this.store.select(fromAuthSelectors.selectUserRole)),
        switchMap(([_, role]) => of(role)),
        tap((role) => this.postLoginNavigate(role))
      ), { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private route: Router,
    private store: Store<AppState>,
    private location: Location,
  ) {
  }

  postLoginNavigate(role: string | null) {
    if (role === 'Admin') {
      return this.route.navigate(['/administration'])
    }

    return this.route.navigate(['/projects'])
  }

}
