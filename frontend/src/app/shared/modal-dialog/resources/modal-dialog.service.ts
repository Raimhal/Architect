import {Injectable} from "@angular/core";
import {MatDialog} from "@angular/material/dialog";
import {ComponentType} from "@angular/cdk/overlay";

@Injectable({
  providedIn: "root"
})

export class ModalDialogService {
  constructor(private _dialog: MatDialog) {
  }

  showDialog(component: ComponentType<any>) {
    this._dialog.open(component, {
      minWidth: "558px",
      minHeight: "409px",
      panelClass: 'custom-modal'
    })
  }

  hideDialog() {
    this._dialog.closeAll();
  }
}
