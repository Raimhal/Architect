import { Component, OnInit } from '@angular/core';
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";
import {Store} from "@ngrx/store";
import {AppState} from "../../../store";
import {hideMenu, openMenu} from "../../../store/actions/menu.actions";

@Component({
  selector: 'app-project-dashboard',
  templateUrl: './project-dashboard.component.html',
  styleUrls: ['./project-dashboard.component.scss']
})
export class ProjectDashboardComponent implements OnInit {

  constructor(iconRegistry: MatIconRegistry,
              sanitizer: DomSanitizer,
              private store : Store<AppState>) {
    iconRegistry.addSvgIcon(
      'arrow-left',
      sanitizer.bypassSecurityTrustResourceUrl("assets/icons/arrow_left.svg")
    );
  }

  ngOnInit(): void {
    this.store.dispatch(openMenu());
    this.store.dispatch(hideMenu());
  }

}
