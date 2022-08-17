import { createAction, props } from '@ngrx/store';
import { INewCompanyDto } from '../resources/DTOmodels/new-company-dto.model';

export const loadAdministrations = createAction(
  '[Administration] Load Administrations'
);

export const loadAdministrationsSuccess = createAction(
  '[Administration] Load Administrations Success',
  props<{ data: any }>()
);

export const loadAdministrationsFailure = createAction(
  '[Administration] Load Administrations Failure',
  props<{ error: any }>()
);

export const CreateCompany = createAction( 
  '[Create Compamy Conponent] Create New Company',
  props<{ date: INewCompanyDto }>()
)

export const CreateCompanySuccess = createAction(
  '[Create Compamy Conponent] Create New Company Success'
)

export const CreateCompanyFailure = createAction(
  '[Create Compamy Conponent] Create New Company Failure'
)
