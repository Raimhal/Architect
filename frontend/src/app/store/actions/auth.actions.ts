import { createAction, props } from "@ngrx/store";

export const loginPage = createAction(
  '[Login Component] Login User',
  props<{ username: string; password: string }>()
);

export const loginSuccess = createAction(
  '[Auth Effect] Login User Success',
  props<{ user: any }>()
);

export const loginFailure = createAction(
  '[Auth Effect] Login User Failure',
  props<{ error: any }>()
);

export const logout = createAction('[Header Component] Logout User');
