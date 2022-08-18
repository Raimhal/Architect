import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as fromAuthActions from '../actions/auth.actions';
import * as fromAdministrationActions from '../../modules/administration/state/administration.actions';
import { tap } from 'rxjs/operators';
import {MatDialog} from "@angular/material/dialog";

@Injectable()
export class ModalEffects {
  hideModal$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          fromAuthActions.loginSuccess,
          fromAdministrationActions.CreateCompanySuccess,
          fromAdministrationActions.addNewMemberSuccess
        ),
        tap(() => {
          this.dialogService.closeAll();
        })
      ),
    { dispatch: false }
  );

  constructor(private actions$: Actions, private dialogService : MatDialog) {}
}
