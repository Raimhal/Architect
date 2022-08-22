import { createAction, props } from "@ngrx/store";
import {ComponentType} from "@angular/cdk/overlay";

export const openModalDialog = createAction(
  '[ModalDialogOpened] Modal Dialog opened',
  props<{component: ComponentType<any>}>()
)
export const closeModalDialog = createAction(
  '[ModalDialogClosed] Modal Dialog closed'
);
