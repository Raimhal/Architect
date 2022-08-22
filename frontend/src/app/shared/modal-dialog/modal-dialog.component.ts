import {Component, Input, OnInit} from '@angular/core';
import {ModalDialogService} from "./resources/modal-dialog.service";
import {Store} from "@ngrx/store";
import {AppState} from "../../store";
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";
import {closeModalDialog} from "../../store/actions/modal-dialog.action";

@Component({
  selector: 'app-modal-dialog',
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.scss']
})
export class ModalDialogComponent implements OnInit {
  @Input() title: string = "";

  constructor(private service: ModalDialogService,
              private store: Store<AppState>,
              private domSanitizer: DomSanitizer,
              private matIconRegistry: MatIconRegistry) {
  }

  ngOnInit(): void {
    this.matIconRegistry.addSvgIcon(
      'Cross',
      this.domSanitizer.bypassSecurityTrustResourceUrl("assets/icons/Cross.svg")
    );
  }

  hideDialog() {
    this.store.dispatch(closeModalDialog())
  }
}
