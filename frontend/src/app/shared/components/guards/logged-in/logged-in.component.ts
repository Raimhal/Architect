import { Component } from '@angular/core';
import { select, Store } from "@ngrx/store";
import * as authSelectors from "../../../../store/selectors/auth.selectors";
import { AppState } from "../../../../store";
import { TokenService } from "../../../../modules/auth/resources/services/token.service";

@Component({
  selector: 'is-logged-in',
  template: `
    <div *ngIf="isLoggedIn$ | async">
      <router-outlet></router-outlet>
    </div>`,
})
export class LoggedInComponent {

  isLoggedIn$ = this.store.pipe(select(authSelectors.selectIsLoggedIn));

  constructor(private store: Store<AppState>, private tokenService: TokenService) {
    tokenService.refreshIfNeeded()
      .catch(error => console.error(error));
  }

}