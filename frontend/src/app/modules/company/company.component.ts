import {Component, OnInit} from '@angular/core';
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";
import {select, Store} from "@ngrx/store";
import {AppState} from "../../store";
import * as fromCompanyActions from "./state/company.actions";
import {selectCompany, selectCompanyProfileForm, selectProjects} from "./state/company.selectors";
import {Observable} from "rxjs";
import {ICompanyProfile} from "./recources/models/company-profile";
import {openMenu, revealMenu} from "../../store/actions/menu.actions";
import {IProjectOverview} from "./recources/models/project-overview";
import {FormGroupState} from "ngrx-forms";
import {CompanyProfileFormValue} from "./recources/forms/company-profile-form";

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {

  company$: Observable<ICompanyProfile>
  projects$: Observable<IProjectOverview[]>

  companyProfileForm$: Observable<FormGroupState<CompanyProfileFormValue>>

  constructor(iconRegistry: MatIconRegistry,
              sanitizer: DomSanitizer,
              private store: Store<AppState>) {
    iconRegistry.addSvgIcon(
      'pencil',
      sanitizer.bypassSecurityTrustResourceUrl("assets/icons/pencil.svg")
    );
    this.store.dispatch(openMenu());
    this.store.dispatch(revealMenu());
    this.company$ = this.store.pipe(select(selectCompany));
    this.projects$ = this.store.pipe(select(selectProjects));
    this.companyProfileForm$ = this.store.pipe(select(selectCompanyProfileForm));
  }

  ngOnInit(): void {
    this.store.dispatch(fromCompanyActions.loadCompany());
    this.store.dispatch(fromCompanyActions.loadProjects());
  }

  enableEditing() {
    this.store.dispatch(fromCompanyActions.enableEditingCompanyProfileForm());
  }

  disableEditing() {
    this.store.dispatch(fromCompanyActions.cancelEditingCompanyProfileForm());
  }

  onSubmit(address: string, email: string, website: string) {
    this.store.dispatch(fromCompanyActions.submitEditingCompanyProfileForm({
      email: email,
      address: address,
      website: website
    }));
  }

}
