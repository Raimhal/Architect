import {Component, Input, OnInit} from '@angular/core';
import {ICompanyOverview} from "../resources/models/company-overview.model";
import * as fromAdministrationActions from "../state/administration.actions";
import {Store} from "@ngrx/store";
import {AppState} from "../../../store";
import {Router} from "@angular/router";

@Component({
  selector: 'app-company-overview',
  templateUrl: './company-overview.component.html',
  styleUrls: ['./company-overview.component.scss']
})
export class CompanyOverviewComponent implements OnInit {

  @Input() company? : ICompanyOverview

  constructor(private store : Store<AppState>,
              private route : Router) { }

  ngOnInit(): void {
  }

  onClicked(id : number){
    this.store.dispatch(
      fromAdministrationActions.loadDetailedCompany({ id: id })
    );
    return this.route.navigate(['company-information']);
  }


}
