import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as fromAuthActions from '../actions/auth.actions';
import { tap } from 'rxjs/operators';

@Injectable()
export class ModalEffects {
  hideModal$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromAuthActions.loginSuccess),
        tap(() => {
          // hide modal
        })
      ),
    { dispatch: false }
  );

  constructor(private actions$: Actions) {}
}
