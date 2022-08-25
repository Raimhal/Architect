import { Component, OnInit } from '@angular/core';
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";
import {select, Store} from "@ngrx/store";
import {AppState} from "../../store";
import {loadCompany, loadProjects} from "./state/company.actions";
import {selectCompany, selectProjects} from "./state/company.selectors";
import {Observable} from "rxjs";
import {ICompanyProfile} from "./recources/models/company-profile";
import {openMenu, revealMenu} from "../../store/actions/menu.actions";
import {IProjectOverview} from "./recources/models/project-overview";

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {

  company$? : Observable<ICompanyProfile>
  projects$ : Observable<IProjectOverview[]>

  constructor(iconRegistry: MatIconRegistry,
              sanitizer: DomSanitizer,
              private store : Store<AppState>) {
    iconRegistry.addSvgIcon(
      'pencil',
      sanitizer.bypassSecurityTrustResourceUrl("assets/icons/pencil.svg")
    );
    this.store.dispatch(openMenu());
    this.store.dispatch(revealMenu());
    this.projects$ = this.store.pipe(select(selectProjects));
  }

  ngOnInit(): void {
    this.store.dispatch(loadCompany());
    this.store.dispatch(loadProjects());
    this.company$ = this.store.pipe(select(selectCompany));
  }

  getAddress(entity: ICompanyProfile | IProjectOverview) : string {
    return `${entity.country}, ${entity.city}, ${entity.address}`;
  }


}
