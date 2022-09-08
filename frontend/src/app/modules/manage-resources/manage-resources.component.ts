import { Component, OnInit } from '@angular/core';
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";
import {AppState} from "../../store";
import {Store} from "@ngrx/store";
import {openMenu, revealMenu} from "../../store/actions/menu.actions";

@Component({
  selector: 'app-resources-page',
  templateUrl: './manage-resources.component.html',
  styleUrls: ['./manage-resources.component.scss']
})
export class ManageResourcesComponent implements OnInit {

  constructor(private matIconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer,
              private store: Store<AppState>) {
    this.store.dispatch(openMenu());
    this.store.dispatch(revealMenu());
  }

  ngOnInit(): void {
  }

}
