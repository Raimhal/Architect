import { Component, OnInit } from '@angular/core';
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";
import {select, Store} from "@ngrx/store";
import {AppState} from "../../../store";
import {selectUserIsAdmin} from "../../../store/selectors/auth.selectors";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import { logout } from 'src/app/store/actions/auth.actions';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  opened : boolean = true;
  isAdmin$? : Observable<boolean>

  selectedRoute? : string

  adminRoutes = [
    { name: "Companies", path: "/company-list"},
    { name: "Notifications", path: ""}
  ]

  otherRoutes = [
    { name: "Projects", path: "/projects" },
    { name: "Team", path: "" },
    { name: "Resources", path: "" },
    { name: "Budgets", path: "" },
    { name: "Documents", path: "" }
  ]

  constructor(private matIconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer,
              private store : Store<AppState>,
              private router : Router) {
    this.matIconRegistry.addSvgIcon(
      'caret-left-grey',
      this.domSanitizer.bypassSecurityTrustResourceUrl("assets/icons/caret-left-grey.svg")
    );
  }

  ngOnInit(): void {
    this.isAdmin$ = this.store.pipe(select(selectUserIsAdmin));
    this.selectedRoute = this.router.url;
  }

  toggleOpened(){
    this.opened = !this.opened;
  }

  onSelect(route: string){
    this.selectedRoute = route;
  }
  logout(){
    this.store.dispatch(logout())
  }
}
