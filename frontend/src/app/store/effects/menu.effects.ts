import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {setMenuLinks} from "../actions/menu.actions";
import {loginSuccess, refreshAccessTokenSuccess} from "../actions/auth.actions";
import {Store} from "@ngrx/store";
import {AppState} from "../index";
import {of, tap} from "rxjs";
import {UserRole} from "../../modules/auth/resources/models/userRole";
import {concatMap} from "rxjs/operators";


@Injectable()
export class MenuEffects {

  setMenuLinks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(refreshAccessTokenSuccess, loginSuccess),
      concatMap(result => {
        if (result.user.role == UserRole.Admin) {
          return of(setMenuLinks({
            links: [
              {displayName: "Companies", path: "/company-list"},
              {displayName: "Notifications", path: "/notifications"}
            ]
          }));
        }

        if (result.user.role == UserRole.OperationalManager) {
          return of(setMenuLinks({
            links: [
              {displayName: "Projects", path: "/projects"},
              {displayName: "Resources", path: "/manage-resources"},
              {displayName: "Notifications", path: "/notifications"},
              {displayName: "Profile", path: "/company-profile"}
            ]
          }));
        }

        return of(setMenuLinks({links: []}));
      })
    )
  });


  private setDefaultMenuLinks(role: UserRole) {


  }

  constructor(private actions$: Actions,
              private store: Store<AppState>) {
  }
}
