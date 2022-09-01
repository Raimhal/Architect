import { createAction, props } from "@ngrx/store";
import { HttError } from "src/app/modules/error/resources/models/httpError";
import { INotification } from "../../modules/notifications/resources/models/notification.model";
import { User } from "../reducers/auth.reducer";

export const loadNotifis = createAction(
  '[Notifi] Load Notifi',
  props<{ userId: number }>()
);

export const loadNotifisSuccess = createAction(
  '[Notifi] Load Notifi Success',
  props<{ notifications: INotification[] }>()
);

export const loadNotifisFailure = createAction(
  '[Notifi] Load Notifi Failure',
  props<{ error: any }>()
);
