import { Injectable, Injector } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from "@angular/router";
import * as fromAuthActions from "../../../../store/actions/auth.actions";
import { Store } from "@ngrx/store";
import { AppState } from "../../../../store";
import { of, take } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { AuthEffects } from "../../../../store/effects/auth.effects";

@Injectable({
  providedIn: 'root',
})
export class TokenService {

  constructor(
    private jwtHelper: JwtHelperService,
    private router: Router,
    private store: Store<AppState>,
    private injector: Injector,
  ) {
  }

  setTokens(access_token: string, refresh_token: string, refresh_token_expires_at: Date) {
    localStorage.setItem('access_token', access_token);
    localStorage.setItem('refresh_token', refresh_token);
    localStorage.setItem('refresh_token_expires_at', refresh_token_expires_at.toDateString());
  }

  setAccessToken(access_token: string) {
    localStorage.setItem('access_token', access_token);
  }

  removeTokens() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('refresh_token_expires_at');
  }

  getAccessToken(): string {
    const token = this.getAccessTokenOrNull();

    if (!token) {
      throw new Error('No access token found');
    }

    return token;
  }

  getAccessTokenOrNull(): string | null {
    return localStorage.getItem('access_token');
  }

  getAccessTokenData(): { id: number, role: string, expires: Date } {
    const token = this.getAccessToken();
    const tokenData = this.jwtHelper.decodeToken(token);

    if (!tokenData.id || !tokenData.role || !tokenData.exp) {
      throw new Error('A value is missing in the access token payload');
    }

    return {
      id: tokenData.id,
      role: tokenData.role,
      expires: new Date(tokenData.exp * 1000),
    };
  }

  getRefreshToken(): { token: string, expires: Date } | null {
    const token = localStorage.getItem('refresh_token');
    const expires = localStorage.getItem('refresh_token_expires_at');

    if (!token || !expires) {
      return null;
    }

    return { token: token, expires: new Date(expires) };
  }

  isAccessTokenExpired(): boolean {
    const token = this.getAccessTokenOrNull();
    return token !== null && this.jwtHelper.isTokenExpired(token);
  }

  isRefreshTokenExpired(): boolean {
    const token = this.getRefreshToken();
    return token === null || token?.expires < new Date();
  }

  refreshIfNeeded(requireLogin: boolean = true): Promise<void> {

    if (!this.getAccessTokenOrNull() || !this.getRefreshToken()) {

      if (requireLogin) {
        this.store.dispatch(fromAuthActions.logout());
        return new Promise<void>((resolve, reject) =>
          this.router.navigate(['/login'])
            .then(() => resolve())
            .catch((error) => reject(error)));
      }

      return Promise.resolve();
    }

    if (!this.isAccessTokenExpired()) {

      const tokenData = this.getAccessTokenData();

      this.store.dispatch(fromAuthActions.refreshAccessTokenSuccess({
          token: this.getRefreshToken()!.token!,
          user: {
            id: tokenData.id,
            role: tokenData.role,
          }
        })
      );

      return Promise.resolve();
    }

    if (this.isRefreshTokenExpired()) {

      this.store.dispatch(fromAuthActions.logout());
      return new Promise<void>((resolve, reject) =>
        this.router.navigate(['/login'])
          .then(() => resolve())
          .catch((error) => reject(error)));
    }

    this.store.dispatch(fromAuthActions.refreshAccessToken());

    return new Promise<void>((resolve, reject) => {
        const authEffects = this.injector.get(AuthEffects); // prevents circular dependency
        return authEffects.refreshAccessToken$.pipe(
          take(2),
          tap((x) => resolve()),
          catchError((error: any) => {
            this.store.dispatch(fromAuthActions.logout());
            return of(reject(error));
          }),
        );
      }
    );
  }
}
