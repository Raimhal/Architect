import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as fromAuthActions from '../actions/auth.actions';
import * as fromAdministrationActions from '../../modules/administration/state/administration.actions';
import * as fromCompanyActions from '../../modules/company/state/company.actions';
import { tap } from 'rxjs/operators';
import {NgxSpinnerService} from "ngx-spinner";

@Injectable()
export class SpinnerEffects {
  spinneron$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          fromAuthActions.login,
          fromAdministrationActions.getAllCompaniesWithParams,
          fromAdministrationActions.loadDetailedCompany,
          fromAdministrationActions.submitCompanyInformationForm,
          fromCompanyActions.submitEditingCompanyProfileForm,
          fromCompanyActions.loadCompany,
          fromCompanyActions.loadCropImageStart
        ),
        tap(() =>  {
          this.spinner.show();
        })
      ),
    { dispatch: false }
  );

  spinneroff$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          fromAuthActions.loginSuccess,
          fromAuthActions.loginFailure,
          fromAdministrationActions.getAllCompaniesWithParamsSuccess,
          fromAdministrationActions.getAllCompaniesWithParamsFailure,
          fromAdministrationActions.loadDetailedCompanySuccess,
          fromAdministrationActions.loadDetailedCompanyFailure,
          fromAdministrationActions.submitCompanyInformationFormSuccess,
          fromAdministrationActions.submitCompanyInformationFormFailure,
          fromCompanyActions.submitEditingCompanyProfileFormSuccess,
          fromCompanyActions.submitEditingCompanyProfileFormFailure,
          fromCompanyActions.loadCompanySuccess,
          fromCompanyActions.loadCompanyFailure,
          fromCompanyActions.loadCropImageFinish,
          fromCompanyActions.loadCropImageFailed,
        ),
        tap(() => {
          setTimeout(() => {
            this.spinner.hide();
          }, 1000);
        })
      ),
    { dispatch: false }
  );

  constructor(private actions$: Actions, private spinner : NgxSpinnerService) {}

}
