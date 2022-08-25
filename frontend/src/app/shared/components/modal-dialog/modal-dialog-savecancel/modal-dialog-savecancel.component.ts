import {Component, Input, OnInit} from '@angular/core';
import {ModalDialogService} from "../resources/modal-dialog.service";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../store";
import {DomSanitizer} from "@angular/platform-browser";
import {MatIconRegistry} from "@angular/material/icon";
import {closeModalDialog} from "../../../../store/actions/modal-dialog.action";

@Component({
  selector: 'app-modal-dialog-savecancel',
  templateUrl: './modal-dialog-savecancel.component.html',
  styleUrls: ['./modal-dialog-savecancel.component.scss']
})
export class ModalDialogSavecancelComponent implements OnInit {

  @Input() title: string = "";

  constructor(private service: ModalDialogService,
              private store: Store<AppState>,
              private domSanitizer: DomSanitizer,
              private matIconRegistry: MatIconRegistry) {
  }

  ngOnInit(): void {
    this.matIconRegistry.addSvgIcon(
      'cross',
      this.domSanitizer.bypassSecurityTrustResourceUrl("assets/icons/Cross.svg")
    );
  }

  hideDialog() {
    this.store.dispatch(closeModalDialog())
  }
}

