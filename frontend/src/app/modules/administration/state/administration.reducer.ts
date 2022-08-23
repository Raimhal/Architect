import { createReducer, on } from '@ngrx/store';
import * as AdministrationActions from './administration.actions';
import { ICompanyOverview } from '../resources/models/company-overview.model';
import { IMember } from '../resources/models/member.model';
import { state } from '@angular/animations';
import { ICompanyDetailed } from '../resources/models/company-detailed.model';
import * as fromCompanyInformationForm from '../resources/forms/company-information-form';
import {
  createFormGroupState,
  disable,
  enable,
  FormGroupState,
  onNgrxForms,
  onNgrxFormsAction,
  SetValueAction,
} from 'ngrx-forms';
import { IRole } from '../resources/models/role.model';

export const administrationFeatureKey = 'administration';

export interface State {
  companies: ICompanyOverview[] | null;
  currentlyOpenCompany: ICompanyDetailed;
  companyInformationForm: FormGroupState<fromCompanyInformationForm.CompanyInformationFormValue>;
  error: any;
  roles: IRole[] | null;
}

export const initialState: State = {
  companies: null,
  currentlyOpenCompany: {
    members: [] as IMember[],
  } as ICompanyDetailed,
  companyInformationForm: fromCompanyInformationForm.initialFormState,
  error: null,
  roles: null,
};

export const reducer = createReducer(
  initialState,
  onNgrxForms(),
  on(AdministrationActions.loadAdministrations, (state) => state),
  on(
    AdministrationActions.loadAdministrationsSuccess,
    (state, action) => state
  ),
  on(
    AdministrationActions.loadAdministrationsFailure,
    (state, action) => state
  ),
  on(AdministrationActions.addNewMemberSuccess, (state, action) => {
    return {
      ...state,
      currentlyOpenCompany: {
        ...state.currentlyOpenCompany,
        members: [...state.currentlyOpenCompany.members, action.data],
      },
    };
  }),
  on(AdministrationActions.addNewMemberFailure, (state, action) => ({
    ...state,
    error: action.error,
  })),
  on(
    AdministrationActions.getAllCompaniesWithParamsSuccess,
    (state, action) => {
      return {
        ...state,
        companies: action.data,
        error: null,
      };
    }
  ),
  on(AdministrationActions.loadRolesSuccess, (state, action)=>({
    ...state,
    roles: action.roles
  })),
  on(AdministrationActions.loadRolesFailure, (state,action)=>({
    ...state,
    error: action.error
  })),
  on(
    AdministrationActions.getAllCompaniesWithParamsFailure,
    (state, action) => {
      return {
        ...state,
        companies: null,
        error: action.error,
      };
    }
  ),
  on(AdministrationActions.loadDetailedCompanySuccess, (_state, action) => ({
    ..._state,
    currentlyOpenCompany: action.result,
    error: null,
  })),
  on(AdministrationActions.loadDetailedCompanyFailure, (state, action) => ({
    ...state,
    currentlyOpenCompany: {} as ICompanyDetailed,
    error: action.error,
  })),
  on(AdministrationActions.UploadCompanyImageSuccess, (state, action) => ({
    ...state,
    currentlyOpenCompany: {
      ...state.currentlyOpenCompany,
      image: action.path,
    },
  })),
  on(AdministrationActions.UploadCompanyImageFailure, (state, action) => ({
    ...state,
    error: action.error,
  })),
  on(
    AdministrationActions.loadDisabledCompanyInformationForm,
    (state, action) => ({
      ...state,
      companyInformationForm: disable(
        createFormGroupState<fromCompanyInformationForm.CompanyInformationFormValue>(
          fromCompanyInformationForm.FORM_ID,
          {
            email: state.currentlyOpenCompany.email,
            address: state.currentlyOpenCompany.address,
          }
        )
      ),
    })
  ),
  onNgrxFormsAction(SetValueAction, (state, action) => {
    return {
      ...state,
      companyInformationForm:
        fromCompanyInformationForm.validateCompanyInformationForm(
          state.companyInformationForm
        ),
      currentlyOpenCompany: { ...state.currentlyOpenCompany, name: 'sdlfaj;f' },
    };
  }),
  on(AdministrationActions.editCompanyInformationForm, (state) => {
    {
      return {
        ...state,
        companyInformationForm: enable(state.companyInformationForm),
      };
    }
  }),
  on(AdministrationActions.cancelEditCompanyInformationForm, (state) => {
    return {
      ...state,
      companyInformationForm: disable(state.companyInformationForm),
    };
  }),
  on(
    AdministrationActions.submitCompanyInformationFormFailure,
    (state, action) => {
      return {
        ...state,
        error: action.error,
      };
    }
  ),
  on(
    AdministrationActions.loadMembersToOpenCompanySuccess,
    (state, action) => ({
      ...state,
      currentlyOpenCompany: {
        ...state.currentlyOpenCompany,
        members: action.result,
      },
    })
  ),
  on(
    AdministrationActions.loadMembersToOpenCompanySuccessFailure,
    (state, action) => ({
      ...state,
      currentlyOpenCompany: {
        ...state.currentlyOpenCompany,
        members: [],
      },
      error: action.error,
    })
  )
);
