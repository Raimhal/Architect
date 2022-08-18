import { createAction, props } from '@ngrx/store';
import {ICompanyOverview} from "../resources/models/company-overview.model";
import {IMember} from "../resources/models/member.model";
import { INewCompanyDto } from '../resources/DTOmodels/new-company-dto.model';
import { ICompanyDetailed } from '../resources/models/company-detailed.model';

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


export const getAllCompaniesWithParams = createAction(
  '[Company List Component] Get All Companies With Parameters',
  props<{ filter: string, sort: string }>()
);

export const getAllCompaniesWithParamsSuccess = createAction(
  '[Company List Component] Get All Companies With Parameters Success',
  props<{data : ICompanyOverview[]}>()
)

export const getAllCompaniesWithParamsFailure = createAction(
  '[Company List Component] Get All Companies With Parameters Failure',
  props<{error : any}>()
)
export const addNewMember = createAction(
  '[Add Company Member Component] Add new member',
  props<{ data: IMember }>()
);
export const addNewMemberSuccess = createAction(
  '[Add Company Member Effect] Add new member success',
  props<{ data: IMember }>()
);
export const addNewMemberFailure = createAction(
  '[Add Company Member Effect] Add new member failure',
  props<{ error: any }>()
);

export const CreateCompany = createAction(
  '[Create Compamy Conponent] Create New Company',
  props<{ date: INewCompanyDto }>()
);

export const CreateCompanySuccess = createAction(
  '[Create Compamy Conponent] Create New Company Success'
);

export const CreateCompanyFailure = createAction(
  '[Create Compamy Conponent] Create New Company Failure',
  props<{error : any}>()
);

export const loadDetailedCompany = createAction(
  '[Company-information Component] Load Detailed Company',
  props<{ id: number }>()
);

export const loadDetailedCompanySuccess = createAction(
  '[Company-information Component] Load Detailed Company Success',
  props<{ result: ICompanyDetailed }>()
);

export const loadDetailedCompanyFailure = createAction(
  '[Company-information Component] Load Detailed Company Failure',
  props<{ error: any }>()
);

export const UploadCompanyImage = createAction(
  '[Company-information Component] Upload Company Image',
  props<{ id: Number; image: File }>()
);

export const UploadCompanyImageSuccess = createAction(
  '[Company-information Component] Upload Company Image Success',
  props<{ path: string }>()
);

export const UploadCompanyImageFailur = createAction(
  '[Company-information Component]  Upload Company Image Failure',
  props<{ error: any }>()
);
