import { Component, OnInit } from '@angular/core';
import {AdministrationApiService} from "../resources/services/administration-api.service";
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";
import {select, Store} from "@ngrx/store";
import {AppState} from "../../../store";
import * as fromAdministraionActions from '../state/administration.actions';
import {selectCompanies} from "../state/administration.selectors";
import {debounceTime, from, Observable, of, throttle, throttleTime} from "rxjs";
import {ICompanyOverview} from "../resources/models/company-overview.model";
import {FormControl} from "@angular/forms";
import {map, tap} from "rxjs/operators";
import {MatDialog} from "@angular/material/dialog";
import {CreateCompany} from "../create-company/create-company.component";

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit {

  searchInputDisabled : boolean = true;

  companies$? : Observable<ICompanyOverview[] | null>

  sort : string = "name";

  filterInput = new FormControl("");

  filter$? : Observable<string>;

  constructor(private matIconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer,
              private store: Store<AppState>,
              private dialog : MatDialog){
    this.matIconRegistry.addSvgIcon(
      'search',
      this.domSanitizer.bypassSecurityTrustResourceUrl("assets/icons/search.svg")
    );
    this.matIconRegistry.addSvgIcon(
      'sort',
      this.domSanitizer.bypassSecurityTrustResourceUrl("assets/icons/sort.svg")
    );
  }

  ngOnInit(): void {
    this.updateList();
    this.companies$ = this.store.pipe(select(selectCompanies));
    this.filter$ = this.filterInput.valueChanges.pipe(
      debounceTime(500),
      map(v => v as string),
      tap(filter => this.store.dispatch(fromAdministraionActions.getAllCompaniesWithParams({filter: filter, sort: this.sort})))
    );
  }

  toggleSearchInput() {
    this.searchInputDisabled = !this.searchInputDisabled
  }

  toggleSort(value : string) {
    this.sort = value;
    this.updateList();
  }

  updateList(){
    this.store.dispatch(fromAdministraionActions.getAllCompaniesWithParams({filter: this.filterInput.value!, sort: this.sort}));
  }

  openModal() {
    this.dialog.open(CreateCompany);
  }

}
