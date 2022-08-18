import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {AdministrationComponent} from "./administration.component";
import {CompanyListComponent} from "./company-list/company-list.component";
import {CreateCompany} from "./createCompany/createCompany.component";
import {CompanyInformationComponent} from "./company-information/company-information.component";

const routes: Routes = [
  { path: 'administration',
    component: AdministrationComponent,
    children: [
      { path: '', redirectTo: 'company-list', pathMatch: "full"},
      { path: 'company-list', component: CompanyListComponent},
      { path: 'company-information', component: CompanyInformationComponent}
    ]
  },
  { path: 'new-company', component: CreateCompany },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule {}

