import { createAction, props } from "@ngrx/store";
import { HttError } from "src/app/modules/error/resources/models/httpError";

export const login = createAction(
  '[Auth] Login User',
  props<{ email: string; password: string }>()
);

export const loginSuccess = createAction(
  '[Auth] Login User Success',
  props<{ user: any, askToChangePassword: boolean }>()
);

export const loginFailure = createAction(
  '[Auth] Login User Failure',
  props<{ error: any }>()
);

export const logout = createAction('[Auth Component] Logout User');

export const changePassword = createAction(
  '[Auth] Change Password',
  props<{ password: string; confirmPassword: string }>()
);

export const changePasswordSuccess = createAction(
  '[Auth] Change Password Success',
  props<{ user: any }>()
);

export const changePasswordFailure = createAction(
  '[Auth] Change Password Failure',
  props<{ error: any }>()
);

export const forgotPassword = createAction(
  '[Auth] Forgot Password',
  props<{ email: string}>()
);
export const forgotPasswordSuccess = createAction(
  '[Auth] Forgot Password Success'
);
export const forgotPasswordFailure = createAction(
  '[Auth] Forgot Password Failure',
  props<{ error: HttError}>()
);
